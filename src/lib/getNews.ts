import { cache } from "react";
import type { ArticleType, NewsListType, QueryParamsType } from "@/types/news";

const GUARDIAN_URL = "https://content.guardianapis.com";

export const PAGE_SIZE = 10;
export const CATEGORY_PAGE_SIZE = 20;
// Guardian rejects very deep pages.
const MAX_PAGES = 100;
// Saves the daily request limit of the key.
const CACHE_SECONDS = 300;

interface GuardianItem {
  id: string;
  sectionId: string;
  webTitle: string;
  webUrl: string;
  webPublicationDate: string;
  fields?: { trailText?: string; thumbnail?: string; body?: string };
}

// Falls back to the second key if the first one is invalid or over its limit.
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

// No query = all latest news.
export async function getNewsList(
  query: QueryParamsType | undefined,
  page: number,
  pageSize: number = PAGE_SIZE,
  searchText?: string,
): Promise<NewsListType> {
  const params: Record<string, string> = {
    page: String(page),
    "page-size": String(pageSize),
    "show-fields": "trailText,thumbnail",
  };
  if (query) params[query.type] = query.values.join("|");
  if (searchText) {
    params.q = searchText;
    params["order-by"] = "newest";
    // Full-text search sorted by date returns articles that only mention the
    // word once, so search titles and standfirsts only.
    params["query-fields"] = "headline,trailText";
  }

  const response = await fetchGuardian("search", params);
  const data = await response.json();

  // 400 = page out of range.
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

interface NewsPageType extends NewsListType {
  // ?page= in the URL is invalid, redirect to currentPage.
  needsRedirect: boolean;
}

function toPageNumber(raw: string | undefined): number {
  const page = Number(raw);
  return Number.isInteger(page) && page >= 1 ? page : 1;
}

// Normalizes ?page=: invalid -> 1, too deep -> MAX_PAGES, past the end -> last page.
export async function getNewsPage(
  query: QueryParamsType | undefined,
  rawPage: string | string[] | undefined,
  pageSize: number = PAGE_SIZE,
  searchText?: string,
): Promise<NewsPageType> {
  const raw = Array.isArray(rawPage) ? rawPage[0] : rawPage;
  let page = Math.min(toPageNumber(raw), MAX_PAGES);
  let news = await getNewsList(query, page, pageSize, searchText);

  // Past the last page: fetch page 1 to get the page count.
  if (news.totalPages === 0 && page > 1) {
    const firstPage = await getNewsList(query, 1, pageSize, searchText);
    page = Math.max(1, firstPage.totalPages);
    news = page === 1 ? firstPage : await getNewsList(query, page, pageSize, searchText);
  }

  // Canonical URL: no ?page for page 1, exact number otherwise.
  const isRightAddress = page === 1 ? raw === undefined : raw === String(page);
  return { ...news, currentPage: page, needsRedirect: !isRightAddress };
}

// cache: generateMetadata and the page share one request.
const getArticleById = cache(async (id: string): Promise<ArticleType | null> => {
  const response = await fetchGuardian(id, { "show-fields": "trailText,thumbnail,body" });
  if (response.status === 404) return null;

  const data = await response.json();
  if (!response.ok || data.response?.status !== "ok") {
    throw new Error(`Guardian API error: ${data.response?.message ?? response.status}`);
  }
  // Non-article ids (e.g. "search") come back without content.
  if (!data.response.content) return null;
  return toArticle(data.response.content);
});

// Pages get the id encoded, route handlers decoded. Guardian ids never contain "%".
export function getArticle(id: string): Promise<ArticleType | null> {
  return getArticleById(decodeURIComponent(id));
}
