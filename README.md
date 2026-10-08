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
- **Sign up and sign in** with email and password, in a dialog over the current page.
- **Bookmarks**: save an article from a card or from the end of the article; the icon changes at once and rolls back if the server says no. Saved articles are on the **`/saved`** page.
- **Guest bookmarks** without an account: kept in the browser (up to 50, for 30 days) and moved to the account after sign-in.

## Tech stack

- **Next.js 16** (App Router, Server Components, Route Handlers)
- **React 19**, **TypeScript** (strict)
- **Tailwind CSS v4**
- **TanStack Query** — client data: the sidebar, bookmarks with optimistic updates
- **The Guardian API** — all news data
- **PostgreSQL** on **Neon** + **Prisma 7** — users, sessions, bookmarks
- **Better Auth** — sign-up, sign-in, sessions in the database (cookie)
- **Zod** — checks the request body in the bookmarks API
- **Vercel** — hosting

## Getting started

You need **Node.js 20.9 or newer**, a free Guardian API key ([register here](https://open-platform.theguardian.com/access/))
and a PostgreSQL database (a free [Neon](https://neon.tech) project works). Without the database the news pages work, but sign-in and bookmarks do not.

1. Install the packages (this also generates the Prisma client):

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and fill it in: the Guardian key, both Neon connection strings
   (pooled and direct), a Better Auth secret and `BETTER_AUTH_URL=http://localhost:3000`.
   Every variable has a comment in `.env.example`.

   ```bash
   cp .env.example .env.local
   ```

3. Create the tables in the database:

   ```bash
   npx prisma migrate deploy
   ```

4. Start the dev server and open http://localhost:3000:

   ```bash
   npm run dev
   ```

Other commands: `npm run build` (production build), `npm run start` (run the build), `npm run lint`.

The Prisma config is `prisma7.config.ts`. It reads `.env.local` and uses the direct connection (`DATABASE_URL_UNPOOLED`) for migrations; the app uses the pooled one (`DATABASE_URL`).
On Vercel, the `vercel-build` script runs `prisma migrate deploy` before `next build`, but only for production builds.

## API

| Method | Path | What it does |
| --- | --- | --- |
| `GET` | `/api/bookmarks` | Bookmarks of the signed-in user. |
| `POST` | `/api/bookmarks` | Save an article. Body: `articleId`, `title`, `description`, `image`, `sectionId`. `201` = new bookmark, `200` = already saved. |
| `DELETE` | `/api/bookmarks/[id]` | Remove a bookmark by the bookmark id (Guardian ids contain slashes). `404` for a wrong id or another user's bookmark. |
| `*` | `/api/auth/...` | Better Auth: sign-up, sign-in, sign-out, session. |
| `GET` | `/api/news` | Latest news for the client-side sidebar. |

Every bookmarks endpoint checks the session itself: no session → `401`. `POST` checks the body with Zod: a wrong body → `400`.

## Project structure

```
src/
  app/            pages and routes (App Router)
    [category]/   category and subcategory pages
    news/[id]/    article page
    search/       search results
    saved/        saved articles
    sign-in/, sign-up/, @auth/   sign-in dialog (parallel and intercepting routes)
    api/auth/     Better Auth endpoints
    api/bookmarks/  bookmarks REST API
    api/news/     Route Handlers for the client-side sidebar
    robots.ts     robots.txt
  components/     UI: header, cards, sidebar, pagination, breadcrumbs, sign-in dialog...
  data/           menu config (categories -> Guardian sections or tags), popular searches
  lib/            Guardian requests (getNews.ts), Prisma client, Better Auth, bookmarks, guest bookmarks
  hooks/          useNews, useBookmarks (TanStack Query)
  types/          shared TypeScript types
prisma/
  schema.prisma   tables: user, session, account, verification, bookmark
  migrations/     SQL migrations
```

## Notes on the Guardian API

- The Guardian has **sections and tags**, not simple categories. Some categories we need do not exist as sections (`general`, `health`, `entertainment`), so every menu item in `src/data/arrayCategory.ts` points to a section **or** a tag.
- A wrong section or tag gives no error, only **zero results** — every tag in the menu was checked with a real request.
- Article ids contain slashes (`world/2026/oct/02/...`), so they are encoded in our URLs.
- Search looks only in the title and the short text: with "newest first", a search in the whole article text returned articles where the word was only mentioned once.
- Answers are cached for 5 minutes to save the daily limit of the key.

## Roadmap

- Sign-in with Google, email check and password reset
- Sort options for search
- Article tags, author and date
- Dark theme

News data: © The Guardian. This is a non-commercial study project.
