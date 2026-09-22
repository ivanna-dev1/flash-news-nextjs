import { cache } from "react";
import type { ArticleType, NewsListType, QueryParamsType } from "@/types/news";

const GUARDIAN_URL = "https://content.guardianapis.com";

// How many articles one page of the list shows.
export const PAGE_SIZE = 10;
// Guardian refuses to give very deep pages. A news site does not need them,
// so we never show more than this number of pages.
const MAX_PAGES = 100;
// Keep Guardian answers for 5 minutes. This saves the daily limit of the key.
const CACHE_SECONDS = 300;

interface GuardianItem {
  id: string;
  sectionId: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  fields?: { trailText?: string; thumbnail?: string; body?: string };
}

// Sends a request to Guardian. If the first key does not work
// (wrong key or the limit is over), it tries the second key.
async function fetchGuardian(path: string, params: Record<string, string>) {
  const keys = [process.env.GUARDIAN_API_KEY, process.env.GUARDIAN_API_KEY_2].filter(
    (key): key is string => Boolean(key),
  );
  if (keys.length === 0) {
    throw new Error("GUARDIAN_API_KEY is missing in .env.local");
  }

  for (const key of keys) {
    const search = new URLSearchParams({ ...params, "api-key": key });
    const response = await fetch(`${GUARDIAN_URL}/${path}?${search}`, {
      next: { revalidate: CACHE_SECONDS },
    });
    // 401/403 = bad key, 429 = limit is over. Only in these cases
    // another key can help. Other answers go back to the caller.
    const isKeyProblem = [401, 403, 429].includes(response.status);
    if (!isKeyProblem) return response;
  }
  throw new Error("Guardian API did not accept any of the keys");
}

function toArticle(item: GuardianItem): ArticleType {
  return {
    id: encodeURIComponent(item.id),
    title: item.webTitle,
    description: item.fields?.trailText ?? "",
    image: item.fields?.thumbnail || "/mainIMG_2.jpg",
    sectionId: item.sectionId,
    article: item.fields?.body,
    source: { name: "The Guardian", url: "https://www.theguardian.com" },
    url: item.webUrl,
    publishedAt: item.webPublicationDate,
  };
}

// One page of news. No query = all latest news (like General).
export async function getNewsList(
  query: QueryParamsType | undefined,
  page: number,
  pageSize: number = PAGE_SIZE,
): Promise<NewsListType> {
  const params: Record<string, string> = {
    page: String(page),
    "page-size": String(pageSize),
    // A list needs only a short text and a picture, not the full body.
    "show-fields": "trailText,thumbnail",
  };
  if (query) params[query.type] = query.values.join("|");

  const response = await fetchGuardian("search", params);
  const data = await response.json();

  // Guardian puts some errors inside the body with status "error".
  // Code 400 means a bad request, for example a page that is too far.
  // It is not a crash: we show an empty page.
  if (response.status === 400) {
    return { articles: [], currentPage: page, totalPages: 0 };
  }
  if (!response.ok || data.response?.status !== "ok") {
    throw new Error(`Guardian API error: ${data.response?.message ?? response.status}`);
  }

  return {
    articles: data.response.results.map(toArticle),
    currentPage: data.response.currentPage,
    totalPages: Math.min(data.response.pages, MAX_PAGES),
  };
}

// One article by its Guardian id.
// `cache` lets generateMetadata and the page share one request.
const getArticleById = cache(async (id: string): Promise<ArticleType | null> => {
  const response = await fetchGuardian(id, { "show-fields": "trailText,thumbnail,body" });
  if (response.status === 404) return null;

  const data = await response.json();
  if (!response.ok || data.response?.status !== "ok") {
    throw new Error(`Guardian API error: ${data.response?.message ?? response.status}`);
  }
  // The id comes from the address bar, so it can be anything, for example "search".
  // Then Guardian answers without "content" - we treat it as "not found".
  if (!data.response.content) return null;
  return toArticle(data.response.content);
});

// Next.js gives the id in different forms: a page gets it encoded
// ("film%2F2026%2F..."), a route handler gets it decoded ("film/2026/...").
// Guardian ids never have "%" inside, so decoding is always safe.
export function getArticle(id: string): Promise<ArticleType | null> {
  return getArticleById(decodeURIComponent(id));
}
