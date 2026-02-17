# rianino.github.io

Personal website and blog built with [Astro](https://astro.build). Static output, zero client-side JavaScript, earth-tone design.

## Setup

```sh
npm install
npm run dev       # http://localhost:4321
```

## Commands

| Command           | Action                              |
| :---------------- | :---------------------------------- |
| `npm run dev`     | Start dev server                    |
| `npm run build`   | Build to `dist/`                    |
| `npm run preview` | Preview production build            |

## Adding a Blog Post

Create `src/content/blog/<slug>.md`:

```yaml
---
title: "Post Title"
description: "Brief summary."
publishedAt: 2026-02-17
tags: ["topic"]
---

Your content here.
```

The post appears on the homepage and at `/blog/<slug>`.

## Architecture

- **Astro v5** with TypeScript — file-based routing, content collections
- **Pure CSS** — custom properties for design tokens, no preprocessors
- **Fonts** — Inter (UI), Lora (prose), JetBrains Mono (code) via Google Fonts
- **Deployment** — GitHub Actions builds and deploys to GitHub Pages on push to `main`

## Notion Integration (Planned)

A build-time sync stub exists at `src/lib/notion.ts`. When implemented, it will:

1. Fetch posts from a Notion database at build time
2. Write `.md` files to `src/content/blog/`
3. Keep the site fully static — no runtime API calls

Set `NOTION_TOKEN` and `NOTION_DATABASE_ID` environment variables to enable.
