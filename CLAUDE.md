# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website and blog at rianino.github.io, built with Astro. Static output, zero client-side JS by default. Earth-tone design system with Inter/Lora/JetBrains Mono typography.

## Architecture

- **Framework:** Astro v5 with TypeScript (strict)
- **Styling:** Pure CSS with custom properties (no Tailwind/Sass)
- **Content:** Astro content collections with Markdown blog posts
- **Deployment:** GitHub Actions → GitHub Pages

### Key Directories

```
src/
  components/    — Astro components (Nav, Bio, Footer, BlogPostCard, etc.)
  content/
    blog/        — Markdown blog posts with frontmatter
    config.ts    — Zod schema for content collections
  layouts/       — BaseLayout.astro, PostLayout.astro
  lib/           — Utility modules (readingTime.ts, notion.ts stub)
  pages/         — File-based routing (index.astro, blog/[slug].astro)
  styles/        — tokens.css, global.css, prose.css
public/          — Static assets (favicon, images)
.github/workflows/deploy.yml — CI/CD pipeline
```

## Adding a New Blog Post

1. Create `src/content/blog/<slug>.md` with frontmatter:
   ```yaml
   ---
   title: "Post Title"
   description: "Brief description."
   publishedAt: YYYY-MM-DD
   tags: ["tag1", "tag2"]
   draft: false
   ---
   ```
2. The post appears automatically on the homepage and gets a page at `/blog/<slug>`

## Commands

- `npm run dev` — Start dev server (localhost:4321)
- `npm run build` — Build static site to `dist/`
- `npm run preview` — Preview production build locally

## Conventions

- All styling uses CSS custom properties defined in `src/styles/tokens.css`
- Blog post body uses `.prose` class with Lora serif font
- UI elements use Inter sans-serif
- Color palette: cream background, charcoal text, olive links, tobacco hover
- Content width: 680px max with `clamp(1.5rem, 6vw, 5rem)` side padding
- Notion integration is stubbed in `src/lib/notion.ts` — not yet active
