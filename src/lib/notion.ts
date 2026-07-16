/**
 * Notion sync script.
 *
 * Fetches posts from a Notion database and writes them as .md files
 * to src/content/blog/. Only posts with Status = "Done" are synced.
 *
 * Usage:
 *   npm run sync
 *
 * Requires NOTION_TOKEN and NOTION_DATABASE_ID in .env
 */

import 'dotenv/config';
import { Client } from '@notionhq/client';
import * as fs from 'node:fs';
import * as path from 'node:path';
import type {
  BlockObjectResponse,
  RichTextItemResponse,
} from '@notionhq/client/build/src/api-endpoints.js';

const NOTION_TOKEN = process.env.NOTION_TOKEN ?? '';
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID ?? '';
const BLOG_DIR = path.resolve(import.meta.dirname ?? '.', '../content/blog');
const IMAGES_DIR = path.resolve(import.meta.dirname ?? '.', '../../public/images/blog');

if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
  console.error('Missing NOTION_TOKEN or NOTION_DATABASE_ID in .env');
  process.exit(1);
}

const notion = new Client({ auth: NOTION_TOKEN });

// --- Rich text helpers ---

function richTextToPlain(richText: RichTextItemResponse[]): string {
  return richText.map((t) => t.plain_text).join('');
}

function richTextToMarkdown(richText: RichTextItemResponse[]): string {
  return richText
    .map((t) => {
      let text = t.plain_text;
      if (t.annotations.bold) text = `**${text}**`;
      if (t.annotations.italic) text = `*${text}*`;
      if (t.annotations.strikethrough) text = `~~${text}~~`;
      if (t.annotations.code) text = `\`${text}\``;
      if (t.href) text = `[${text}](${t.href})`;
      return text;
    })
    .join('');
}

// Aspect ratio (w/h) per image block, filled in during download. Used to
// size side-by-side images so they render at equal heights, like Notion.
const imageAspects = new Map<string, number>();

// Notion-hosted images use signed S3 URLs that expire after 1 hour, so
// download them to public/ and reference the permanent local path instead.
async function downloadImage(url: string, blockId: string): Promise<string> {
  const ext = path.extname(new URL(url).pathname) || '.png';
  const filename = `${blockId}${ext}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Image download failed (${res.status}): ${url}`);
  fs.mkdirSync(IMAGES_DIR, { recursive: true });
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(path.join(IMAGES_DIR, filename), buf);
  // ponytail: dimensions parsed for PNG only; other formats fall back to
  // Notion's column ratios. Add JPEG SOF parsing if needed.
  if (ext === '.png' && buf.length > 24 && buf.toString('ascii', 1, 4) === 'PNG') {
    imageAspects.set(blockId, buf.readUInt32BE(16) / buf.readUInt32BE(20));
  }
  return `/images/blog/${filename}`;
}

// --- Block-to-Markdown conversion ---

async function blockToMarkdown(block: BlockObjectResponse): Promise<string> {
  switch (block.type) {
    case 'paragraph':
      return richTextToMarkdown(block.paragraph.rich_text);

    case 'heading_1':
      return `# ${richTextToMarkdown(block.heading_1.rich_text)}`;

    case 'heading_2':
      return `## ${richTextToMarkdown(block.heading_2.rich_text)}`;

    case 'heading_3':
      return `### ${richTextToMarkdown(block.heading_3.rich_text)}`;

    case 'bulleted_list_item':
      return `- ${richTextToMarkdown(block.bulleted_list_item.rich_text)}`;

    case 'numbered_list_item':
      return `1. ${richTextToMarkdown(block.numbered_list_item.rich_text)}`;

    case 'to_do':
      const checked = block.to_do.checked ? 'x' : ' ';
      return `- [${checked}] ${richTextToMarkdown(block.to_do.rich_text)}`;

    case 'toggle':
      return richTextToMarkdown(block.toggle.rich_text);

    case 'quote':
      return `> ${richTextToMarkdown(block.quote.rich_text)}`;

    case 'callout':
      return `> ${richTextToMarkdown(block.callout.rich_text)}`;

    case 'code':
      const lang = block.code.language === 'plain text' ? '' : block.code.language;
      return `\`\`\`${lang}\n${richTextToPlain(block.code.rich_text)}\n\`\`\``;

    case 'divider':
      return '---';

    case 'image':
      return imageToHtml(block);

    // Side-by-side layouts: emit a flex row preserving Notion's column width
    // ratios. Markdown can't express columns, so this is raw HTML.
    case 'column_list': {
      const columns = (await listChildren(block.id)).filter(
        (c) => c.type === 'column',
      );
      const childrenPerColumn = await Promise.all(
        columns.map((c) => listChildren(c.id)),
      );
      const htmlPerColumn = await Promise.all(
        childrenPerColumn.map(async (children) =>
          (await Promise.all(children.map(blockToHtml))).join(''),
        ),
      );
      const ratios = columns.map((col) =>
        col.type === 'column' ? (col.column?.width_ratio ?? 1) : 1,
      );
      // When every column is a single image of known size, weight widths by
      // aspect ratio too, so the images come out equal-height like in Notion.
      const aspects = childrenPerColumn.map((children) => {
        const images = children.filter((c) => c.type === 'image');
        return images.length === 1 ? imageAspects.get(images[0].id) : undefined;
      });
      const flexes = aspects.every((a) => a !== undefined)
        ? ratios.map((r, i) => r * (aspects[i] as number))
        : ratios;
      const divs = htmlPerColumn.map(
        (html, i) =>
          `<div style="flex:${flexes[i].toFixed(3)};min-width:0">${html}</div>`,
      );
      return `<div class="image-row">${divs.join('')}</div>`;
    }

    case 'column':
      return fetchPageContent(block.id);

    case 'bookmark':
      return block.bookmark.url;

    case 'equation':
      return `$$${block.equation.expression}$$`;

    default:
      return '';
  }
}

function richTextToHtml(richText: RichTextItemResponse[]): string {
  return richText
    .map((t) => {
      let text = t.plain_text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      if (t.annotations.code) text = `<code>${text}</code>`;
      if (t.annotations.bold) text = `<strong>${text}</strong>`;
      if (t.annotations.italic) text = `<em>${text}</em>`;
      if (t.annotations.strikethrough) text = `<s>${text}</s>`;
      if (t.href) text = `<a href="${t.href}">${text}</a>`;
      return text;
    })
    .join('');
}

// ponytail: columns support only paragraphs and images; extend if other
// block types ever show up inside Notion columns.
async function blockToHtml(block: BlockObjectResponse): Promise<string> {
  switch (block.type) {
    case 'image':
      return imageToHtml(block);
    case 'paragraph': {
      const html = richTextToHtml(block.paragraph.rich_text);
      return html.trim() ? `<p>${html}</p>` : '';
    }
    default:
      console.warn(`  skipping unsupported block in column: ${block.type}`);
      return '';
  }
}

async function imageToHtml(block: BlockObjectResponse): Promise<string> {
  if (block.type !== 'image') return '';
  const url =
    block.image.type === 'external'
      ? block.image.external.url
      : await downloadImage(block.image.file.url, block.id);
  const caption = richTextToPlain(block.image.caption);
  const alt = caption.replace(/"/g, '&quot;');
  const figcaption = caption ? `<figcaption>${caption}</figcaption>` : '';
  return `<figure><img src="${url}" alt="${alt}" />${figcaption}</figure>`;
}

async function listChildren(blockId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });

    for (const block of response.results) {
      if ('type' in block) blocks.push(block as BlockObjectResponse);
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return blocks;
}

async function fetchPageContent(pageId: string): Promise<string> {
  const blocks = await listChildren(pageId);
  const md = await Promise.all(blocks.map(blockToMarkdown));
  return md.join('\n\n');
}

// --- Database query ---

interface NotionPost {
  slug: string;
  title: string;
  publishedAt: string;
  content: string;
}

async function fetchDonePosts(): Promise<NotionPost[]> {
  const posts: NotionPost[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.databases.query({
      database_id: NOTION_DATABASE_ID,
      filter: {
        property: 'Status',
        status: { equals: 'Done' },
      },
      sorts: [{ property: 'Published Date', direction: 'descending' }],
      start_cursor: cursor,
      page_size: 100,
    });

    for (const page of response.results) {
      if (!('properties' in page)) continue;

      const props = page.properties;

      // Title
      const titleProp = props['Title'];
      const title =
        titleProp?.type === 'title'
          ? richTextToPlain(titleProp.title)
          : 'Untitled';

      // Slug — fall back to slugified title when the Slug property is empty
      const slugProp = props['Slug'];
      const slugFromProp =
        slugProp?.type === 'rich_text' ? richTextToPlain(slugProp.rich_text).trim() : '';
      const slug =
        slugFromProp ||
        title
          .normalize('NFKD')
          .replace(/[\u0300-\u036f]/g, '')
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '') ||
        page.id;

      // Published Date
      const dateProp = props['Published Date'];
      const publishedAt =
        dateProp?.type === 'date' && dateProp.date?.start
          ? dateProp.date.start
          : new Date().toISOString().split('T')[0];

      // Fetch page content
      const content = await fetchPageContent(page.id);

      posts.push({ slug, title, publishedAt, content });
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return posts;
}

// --- Write markdown files ---

function writePost(post: NotionPost): void {
  const frontmatter = [
    '---',
    `title: "${post.title.replace(/"/g, '\\"')}"`,
    `description: ""`,
    `publishedAt: ${post.publishedAt}`,
    `tags: []`,
    '---',
  ].join('\n');

  const filePath = path.join(BLOG_DIR, `${post.slug}.md`);
  fs.writeFileSync(filePath, `${frontmatter}\n\n${post.content}\n`, 'utf-8');
  console.log(`  wrote ${filePath}`);
}

// --- Main ---

async function main() {
  console.log('Fetching posts from Notion...');
  const posts = await fetchDonePosts();
  console.log(`Found ${posts.length} post(s) with status "Done"`);

  // Ensure blog directory exists
  fs.mkdirSync(BLOG_DIR, { recursive: true });

  for (const post of posts) {
    writePost(post);
  }

  console.log('Sync complete.');
}

main().catch((err) => {
  console.error('Notion sync failed:', err);
  process.exit(1);
});
