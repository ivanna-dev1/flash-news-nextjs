"use client";
import Link from "next/link";
import useBookmarks from "@/hooks/useBookmarks";
import type { ArticleType, SavedArticleType } from "@/types/news";
import CategoryNewsCard from "./CategoryNewsCard";

// The description of a bookmark came from the browser, so it may hold any HTML.
// The card renders HTML, so we pass plain text with < > & escaped.
// DOMParser builds an inert document: no scripts run, no images load.
function toSafeText(html: string): string {
  const text = new DOMParser().parseFromString(html, "text/html").body.textContent ?? "";
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

// Cards expect the URL-encoded id, the bookmark keeps the original Guardian id.
const toArticle = (b: SavedArticleType): ArticleType => ({
  id: encodeURIComponent(b.articleId),
  title: b.title,
  description: toSafeText(b.description),
  image: b.image ?? "",
  sectionId: b.sectionId,
});

export default function SavedList() {
  const { isSessionPending, isGuest, isLoading, isError, refetch, bookmarks } = useBookmarks();

  if (isSessionPending || isLoading) {
    return <p className="text-center text-gray-500 my-10">Loading saved articles…</p>;
  }

  // Without this an error would look like "No saved articles yet".
  // If an older list is in the cache, show it instead of the error.
  if (isError && bookmarks.length === 0) {
    return (
      <p className="text-center text-gray-500 my-10">
        Could not load saved articles.{" "}
        <button onClick={() => refetch()} className="underline font-medium text-gray-800 cursor-pointer">
          Try again
        </button>
      </p>
    );
  }

  return (
    <>
      {isGuest && (
        <p className="text-center text-gray-600 mb-5">
          These articles are saved on this device only.{" "}
          {/* scroll={false}: by default Next scrolls the page to the dialog (end of body). */}
          <Link href="/sign-in" scroll={false} className="underline font-medium text-gray-800">
            Sign in
          </Link>{" "}
          to keep them everywhere.
        </p>
      )}
      {bookmarks.length === 0 ? (
        <p className="text-center text-gray-500 my-10">
          No saved articles yet. Tap the bookmark on any article to save it.
        </p>
      ) : (
        <div className="flex flex-col md:grid grid-cols-5 flex-1 gap-2 items-start content-start">
          {bookmarks.map((b, index) => (
            <CategoryNewsCard
              article={toArticle(b)}
              key={b.articleId}
              isBig={index % 4 === 0 || index % 4 === 3}
            />
          ))}
        </div>
      )}
    </>
  );
}
