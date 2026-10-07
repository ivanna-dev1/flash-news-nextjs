import type { SavedArticleType } from "@/types/news";

// Bookmarks of a reader who is not signed in. They live only in this browser
// (localStorage); after sign-in GuestBookmarksSync moves them to the account.

const KEY = "flashnews:guest-bookmarks";
const MAX_AGE_DAYS = 30;
const MAX_COUNT = 50;
export const GUEST_PREFIX = "guest:";

// localStorage can hold anything (old format, manual edits): keep only valid rows.
const isBookmark = (b: unknown): b is SavedArticleType => {
  const r = b as Record<string, unknown>;
  return (
    typeof r === "object" &&
    r !== null &&
    ["id", "articleId", "title", "description", "sectionId", "createdAt"].every(
      (k) => typeof r[k] === "string",
    ) &&
    (r.image === null || typeof r.image === "string")
  );
};

// localStorage can throw (private mode, blocked site data). Then guest bookmarks
// simply do not persist; the site keeps working.
export function readGuestBookmarks(): SavedArticleType[] {
  try {
    const list: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (!Array.isArray(list)) return [];
    const oldest = Date.now() - MAX_AGE_DAYS * 24 * 60 * 60 * 1000;
    return list.filter(isBookmark).filter((b) => Date.parse(b.createdAt) > oldest);
  } catch {
    return [];
  }
}

export function writeGuestBookmarks(list: SavedArticleType[]) {
  try {
    if (list.length === 0) localStorage.removeItem(KEY);
    // The list is newest first, so slice keeps the newest MAX_COUNT.
    else localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX_COUNT)));
  } catch {
    // Storage is full or blocked: nothing to do.
  }
}
