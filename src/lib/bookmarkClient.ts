import type { SavedArticleType } from "@/types/news";

// Browser side of POST /api/bookmarks. Used by useBookmarks and GuestBookmarksSync.
export function postBookmark(b: Omit<SavedArticleType, "id" | "createdAt">): Promise<Response> {
  return fetch("/api/bookmarks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      articleId: b.articleId,
      title: b.title,
      description: b.description,
      image: b.image,
      sectionId: b.sectionId,
    }),
  });
}
