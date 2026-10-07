"use client";
import { useRouter } from "next/navigation";
import useBookmarks from "@/hooks/useBookmarks";
import type { ArticleType } from "@/types/news";
import BookmarkIcon from "./BookmarkIcon";

interface SaveButtonProps {
  article: ArticleType;
  // Each card has its own button look.
  className?: string;
  iconClassName?: string;
}

export default function SaveButton({ article, className, iconClassName }: SaveButtonProps) {
  const router = useRouter();
  const { isSignedIn, isSaved, toggle } = useBookmarks();
  const saved = isSaved(article.id);

  const onClick = () => {
    if (isSignedIn) return toggle(article);
    // scroll: false — by default Next scrolls the page to the dialog (end of body).
    router.push("/sign-in", { scroll: false });
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={saved ? "Remove from saved" : "Save"}
      aria-pressed={saved}
      className={className}
    >
      <BookmarkIcon className={iconClassName} filled={saved} />
    </button>
  );
}
