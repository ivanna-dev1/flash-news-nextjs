# FlashNews

A news portal built with Next.js on top of [The Guardian Open Platform API](https://open-platform.theguardian.com/).
It is a study project: the goal is a real, deployed app with real data, not a tutorial copy.

**Live:** https://flash-news-lake.vercel.app/

## Features

- **Latest news** on the home page and **10 categories** with subcategories (World, Business, Science, Politics, Technology, Sports, Entertainment, Lifestyle, Health, General).
- **Article page** with the full Guardian text, styled for reading: quotes, related links, videos, **live blogs** (updates with times, key events), a reading progress line.
- **Search** in the header with popular searches; results page with pagination, newest first.
- **Pagination** through the Guardian API; a wrong page number in the address (`?page=abc`, `?page=99999`) redirects to the right page.
- **Breadcrumbs** that follow the reader's path: an article opened from a category page shows that category.
- **Responsive layout** from 320 px phones to wide monitors.
- **Sidebar** with the latest news and a weather card (the weather data is a placeholder for now).

## Tech stack

- **Next.js 16** (App Router, Server Components, Route Handlers)
- **React 19**, **TypeScript**
- **Tailwind CSS v4**
- **TanStack Query** — data for the client-side sidebar
- **The Guardian API** — all news data
- **Vercel** — hosting

## Getting started

You need **Node.js 20.9 or newer** and a free Guardian API key ([register here](https://open-platform.theguardian.com/access/)).

1. Install the packages:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and put your Guardian key there
   (`GUARDIAN_API_KEY`; the second key is optional):

   ```bash
   cp .env.example .env.local
   ```

3. Start the dev server and open http://localhost:3000:

   ```bash
   npm run dev
   ```

Other commands: `npm run build` (production build), `npm run start` (run the build), `npm run lint`.

## Project structure

```
src/
  app/            pages and routes (App Router)
    [category]/   category and subcategory pages
    news/[id]/    article page
    search/       search results
    api/news/     Route Handlers for the client-side sidebar
    robots.ts     robots.txt
  components/     UI: header, cards, sidebar, pagination, breadcrumbs...
  data/           menu config (categories -> Guardian sections or tags), popular searches
  lib/            Guardian requests (getNews.ts), menu helpers
  hooks/          useNews (TanStack Query)
  types/          shared TypeScript types
```

## Notes on the Guardian API

- The Guardian has **sections and tags**, not simple categories. Some categories we need do not exist as sections (`general`, `health`, `entertainment`), so every menu item in `src/data/arrayCategory.ts` points to a section **or** a tag.
- A wrong section or tag gives no error, only **zero results** — every tag in the menu was checked with a real request.
- Article ids contain slashes (`world/2026/oct/02/...`), so they are encoded in our URLs.
- Search looks only in the title and the short text: with "newest first", a search in the whole article text returned articles where the word was only mentioned once.
- Answers are cached for 5 minutes to save the daily limit of the key.

## Roadmap

- Database (PostgreSQL + Prisma), sign-in (Auth.js) and bookmarks
- Sort options for search
- Article tags, author and date
- Dark theme

News data: © The Guardian. This is a non-commercial study project.
