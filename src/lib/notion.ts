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

    case 'image': {
      const url =
        block.image.type === 'external'
          ? block.image.external.url
          : block.image.file.url;
      const caption = block.image.caption.length
        ? richTextToPlain(block.image.caption)
        : '';
      return `![${caption}](${url})`;
    }

    case 'bookmark':
      return block.bookmark.url;

    case 'equation':
      return `$$${block.equation.expression}$$`;

    default:
      return '';
  }
}

async function fetchPageContent(pageId: string): Promise<string> {
  const blocks: string[] = [];
  let cursor: string | undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      start_cursor: cursor,
      page_size: 100,
    });

    for (const block of response.results) {
      if ('type' in block) {
        const md = await blockToMarkdown(block as BlockObjectResponse);
        blocks.push(md);
      }
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return blocks.join('\n\n');
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

      // Slug
      const slugProp = props['Slug'];
      const slug =
        slugProp?.type === 'rich_text'
          ? richTextToPlain(slugProp.rich_text)
          : title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

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
