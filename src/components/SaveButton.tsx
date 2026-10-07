"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import useBookmarks from "@/hooks/useBookmarks";
import type { ArticleType } from "@/types/news";
import BookmarkIcon from "./BookmarkIcon";

interface SaveButtonProps {
  article: ArticleType;
  // Each card has its own button look.
  className?: string;
  iconClassName?: string;
}

const HINT_MS = 5000;

export default function SaveButton({ article, className, iconClassName }: SaveButtonProps) {
  const { isSessionPending, isGuest, bookmarks, isSaved, toggle } = useBookmarks();
  const saved = isSaved(article.id);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!showHint) return;
    const timer = setTimeout(() => setShowHint(false), HINT_MS);
    return () => clearTimeout(timer);
  }, [showHint]);

  const onClick = () => {
    // We do not know yet where to save (account or this browser).
    if (isSessionPending) return;
    // A guest's first bookmark: tell that it is only on this device.
    if (isGuest && !saved && bookmarks.length === 0) setShowHint(true);
    toggle(article);
  };

  return (
    <>
      <button
        type="button"
        onClick={onClick}
        aria-label={saved ? "Remove from saved" : "Save"}
        aria-pressed={saved}
        className={className}
      >
        <BookmarkIcon className={iconClassName} filled={saved} />
      </button>
      {showHint && (
        <p
          role="status"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-max max-w-[calc(100vw-2rem)] px-4 py-2 rounded bg-gray-800 text-white text-sm shadow-lg"
        >
          Saved on this device.{" "}
          {/* scroll={false}: by default Next scrolls the page to the dialog (end of body). */}
          <Link href="/sign-in" scroll={false} className="underline font-medium">
            Sign in
          </Link>{" "}
          to keep it everywhere.
        </p>
      )}
    </>
  );
}
