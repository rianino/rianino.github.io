/**
 * Notion API integration stub.
 *
 * This module provides the interface for syncing content from Notion
 * at build time. When NOTION_TOKEN and NOTION_DATABASE_ID are set,
 * it fetches posts from a Notion database and converts them to
 * content collection entries.
 *
 * Usage:
 *   1. Create a Notion integration at https://www.notion.so/my-integrations
 *   2. Share your database with the integration
 *   3. Set NOTION_TOKEN and NOTION_DATABASE_ID env vars
 *   4. Run the sync script: `npx tsx src/lib/notion.ts`
 *
 * The sync script writes .md files to src/content/blog/, so the site
 * remains fully static — no runtime API calls.
 */

interface NotionPost {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  tags: string[];
  content: string;
}

const NOTION_TOKEN = import.meta.env.NOTION_TOKEN ?? '';
const NOTION_DATABASE_ID = import.meta.env.NOTION_DATABASE_ID ?? '';

export function isNotionConfigured(): boolean {
  return NOTION_TOKEN.length > 0 && NOTION_DATABASE_ID.length > 0;
}

/**
 * Fetch all published posts from the Notion database.
 * Returns an empty array if Notion is not configured.
 */
export async function getNotionPosts(): Promise<NotionPost[]> {
  if (!isNotionConfigured()) {
    return [];
  }

  // TODO: Implement Notion API calls
  // 1. Query database with filter for published posts
  // 2. Map database properties to NotionPost interface
  // 3. Fetch page content for each post
  console.warn('Notion sync not yet implemented — returning empty list');
  return [];
}

/**
 * Fetch the content of a single Notion page as Markdown.
 * Returns null if the page cannot be fetched.
 */
export async function getNotionPageContent(pageId: string): Promise<string | null> {
  if (!isNotionConfigured()) {
    return null;
  }

  // TODO: Implement block-to-markdown conversion
  console.warn(`Notion page fetch not yet implemented for ${pageId}`);
  return null;
}
