import Image from "next/image";
import Link from "next/link";
import type { ArticleType } from "@/types/news";
import { truncateHtml } from "@/lib/truncateHtml";
import BookmarkIcon from "./BookmarkIcon";

interface CategoryNewsCardProps {
  article: ArticleType;
  isBig: boolean;
  // The menu place of the page with this card: "science" or
  // "science/medical-research". The article page shows it in breadcrumbs.
  from: string;
}

export default function CategoryNewsCard({ article, isBig, from }: CategoryNewsCardProps) {
  // A safety cut. In the grid the real cut is made by CSS, by lines.
  // 40 words: enough to fill 7 lines around the photo.
  const displayDescription = truncateHtml(article.description, 40);

  return (
    <div
      // The fixed height is only for the grid (md). On a narrow screen the
      // cards go one under another, and each card is as tall as its content.
      // gap-2 and pb-2: the title+buttons block below has the same 8px
      // above it (at least), inside it and under it.
      className={`flex flex-col items-center border border-gray-100 text-gray-800 gap-2 md:h-[300px] w-full pt-4 pb-2 px-3 ${isBig ? "md:col-span-3" : "md:col-span-2"
        }`}
    >
      {/* @container: the parts below can check the width of this box
          (see the md:@min-[265px] classes). */}
      <div className="@container w-full">
        {/* From sm to md (one card under another) it is a flex row, like on
            the home page: the photo on the left, the text next to it,
            centred by height (items-center).
            In the grid (md) the card has a fixed height (300px). Under the
            photo and above the title block there is room for 7 lines of
            text (168px), so line-clamp cuts the text to fit this room and
            adds "..." itself. */}
        <div
          className={`sm:flex sm:items-center sm:gap-3 ${isBig
              ? // Big card: the photo is inside the clamped box, so the text
              // flows around it. 7 lines = the lines next to the photo plus
              // the lines under it. The photo gets taller when the card gets
              // wider, so on a wide card fewer lines go under the photo.
              "md:line-clamp-7"
              : // Small card, narrow (box under 265px): there is no room next
              // to the photo, so the text goes under it - 3 lines.
              // Wide: the text flows around the photo - 4 lines next to it
              // plus 3 under it = 7 lines.
              "md:line-clamp-3 md:@min-[265px]:line-clamp-7"
            }`}
        >
          <div
            // Phone: the photo takes the full width, the text goes under it.
            // From sm: 1/3 of the width, like on the home page.
            // In the grid (md): big card - 1/2, the text flows around it.
            // Small card - a fixed size on the left: 92px high (153px wide,
            // 5:3). 92px + 4px margin = 4 lines of text, so under it there
            // is room for exactly 3 lines. The photo does not change with
            // the card width. On a wide card the text flows around it.
            // Big card: min-w-[153px] - the photo is never smaller than the
            // photo of the small card (153x92), even on the narrowest grid.
            className={`w-full mb-1 sm:w-1/3 sm:shrink-0 sm:mb-0 md:mb-1 ${isBig ? "md:float-left md:mr-3 md:w-1/2 md:min-w-[153px]" :"md:w-[153px] md:@min-[265px]:float-left md:@min-[265px]:mr-3"}`}
          >
            <Image
              src={article.image || "/mainIMG_2.jpg"}
              alt="FlashNews"
              // 500x300 is the usual shape of a Guardian preview, not the
              // size on screen. The size on screen comes from CSS below.
              width={500}
              height={300}
              sizes="(min-width: 640px) 240px, 100vw"
              // Some Guardian photos have another shape (for example 5:4).
              // aspect-[5/3] gives every photo the same frame, and
              // object-cover fills it without stretching.
              className="w-full aspect-[5/3] object-cover"
            />
          </div>
          {/* Guardian is a trusted source, so we can show its HTML.
              min-w-0 + flex-1: in the flex row the text takes the rest of
              the width and can get narrower than its longest word. */}
          <div
            className="min-w-0 flex-1"
            dangerouslySetInnerHTML={{ __html: displayDescription }}
          />
        </div>
      </div>

      {/* Title and buttons are one block. mt-auto pushes the whole block to
          the bottom of the card, so title and buttons stay together and
          stand on one level in cards of the same height. */}
      <div className="mt-auto flex flex-col items-center gap-2 w-full">
        {/* The title box is always 2 lines high (2lh = 2 line heights),
            the same in the big and the small card. A shorter title is
            centred in this box. text-xl is set here, so "lh" uses its
            line height. */}
        <div className="h-[2lh] text-xl flex items-center justify-center">
          {/* line-clamp cuts the title after 2 lines and adds "..." itself. */}
          <h2 className="text-center font-medium text-red-800 line-clamp-2 hover:text-red-700 cursor-pointer hover:underline">
            <Link href={`/news/${article.id}?from=${from}`}>{article.title}</Link>
          </h2>
        </div>
        <div className="flex flex-row justify-between items-stretch gap-1 text-gray-700 text-md">
          <button className="border border-gray-500 hover:bg-gray-100 cursor-pointer px-2 py-1 rounded">
            Share
          </button>
          <button aria-label="Save" className="border border-gray-500 hover:bg-gray-100 cursor-pointer flex items-center px-2 rounded">
            <BookmarkIcon className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
