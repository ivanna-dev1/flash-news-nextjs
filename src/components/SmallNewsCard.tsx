import Image from "next/image";
import Link from "next/link";
import type { ArticleType } from "@/types/news";
import BookmarkIcon from "./BookmarkIcon";

interface SmallNewsCardProps {
  article: ArticleType;
}

export default function SmallNewsCard({ article }: SmallNewsCardProps) {
  return (
    // The card height comes from its parts, and every part has a set
    // height (photo frame + 4-line title box), so all cards are equal.
    // A small inner padding (3px) on all sides. The card is exactly as
    // wide as its grid column; the space between cards is the grid gap
    // and the min column width is set in Sidebar.
    <div className="relative flex flex-col gap-2 border text-gray-800 text-xs border-gray-100 p-[3px]">
      {/* top-0 right-0: the button sits in the corner of the grey frame. */}
      <button aria-label="Save" className="absolute top-0 right-0 z-10 border border-gray-700 text-gray-700 text-center px-2 py-1 rounded bg-white/70 hover:bg-white/90 hover:text-black cursor-pointer">
        <BookmarkIcon className="size-5" />
      </button>
      <Image
        src={article.image || "/mainIMG_2.jpg"}
        alt="FlashNews"
        // 500x300 is the usual shape of a Guardian preview, not the size
        // on screen. The size on screen comes from CSS below.
        width={500}
        height={300}
        // The sidebar card is never wider than about 176px.
        sizes="176px"
        // Some Guardian photos have another shape (for example 5:4).
        // aspect-[5/3] gives every photo the same frame, and object-cover
        // fills it without stretching: the extra edges are cut off.
        className="w-full aspect-[5/3] object-cover"
      />
      {/* The title box is always 4 lines high (4lh = 4 line heights), so
          all cards have the same height and the grid stays even.
          A shorter title is centred in this box: the free space is
          shared equally above and below it. */}
      <div className="h-[4lh] flex items-center justify-center">
        {/* line-clamp cuts the title after 4 lines and adds "..." itself. */}
        <h2 className="text-center text-blue-800 line-clamp-4 hover:text-blue-800 cursor-pointer hover:underline">
          <Link href={`/news/${article.id}`}>{article.title}</Link>
        </h2>
      </div>
    </div>
  );
}
