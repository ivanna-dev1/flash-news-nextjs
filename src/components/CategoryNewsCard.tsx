import Image from "next/image";
import Link from "next/link";
import type { ArticleType } from "@/types/news";
import { truncateHtml } from "@/lib/truncateHtml";
import SaveButton from "./SaveButton";
import ShareButton from "./ShareButton";

interface CategoryNewsCardProps {
  article: ArticleType;
  isBig: boolean;
  // Menu path of the current page ("science/medical-research") for the article breadcrumbs.
  from?: string;
}

export default function CategoryNewsCard({ article, isBig, from }: CategoryNewsCardProps) {
  // Fallback only; the visible cut is line-clamp.
  const displayDescription = truncateHtml(article.description, 40);

  return (
    <div
      className={`flex flex-col items-center border border-gray-100 text-gray-800 gap-2 md:h-[300px] w-full pt-4 pb-2 px-3 ${isBig ? "md:col-span-3" : "md:col-span-2"
        }`}
    >
      <div className="@container w-full">
        {/* md: fixed card height leaves room for 7 lines under the photo. */}
        <div
          className={`sm:flex sm:items-center sm:gap-3 ${isBig
              ? // Photo is inside the clamped box so the text wraps around it.
              "md:line-clamp-7"
              : // Narrow small card: text under the photo; wide: wraps around it.
              "md:line-clamp-3 md:@min-[265px]:line-clamp-7"
            }`}
        >
          <div
            // Small card photo: 153x92 + 4px margin = 4 lines of text.
            className={`w-full mb-1 sm:w-1/3 sm:shrink-0 sm:mb-0 md:mb-1 ${isBig ? "md:float-left md:mr-3 md:w-1/2 md:min-w-[153px]" :"md:w-[153px] md:@min-[265px]:float-left md:@min-[265px]:mr-3"}`}
          >
            <Image
              src={article.image || "/mainIMG_2.jpg"}
              alt="FlashNews"
              width={500}
              height={300}
              sizes="(min-width: 640px) 240px, 100vw"
              // Some previews are 5:4, keep one frame for all cards.
              className="w-full aspect-[5/3] object-cover"
            />
          </div>
          <div
            className="min-w-0 flex-1"
            dangerouslySetInnerHTML={{ __html: displayDescription }}
          />
        </div>
      </div>

      <div className="mt-auto flex flex-col items-center gap-2 w-full">
        {/* 2lh: the title box is always two lines high. */}
        <div className="h-[2lh] text-xl flex items-center justify-center">
          <h2 className="text-center font-medium text-red-800 line-clamp-2 hover:text-red-700 cursor-pointer hover:underline">
            <Link href={from ? `/news/${article.id}?from=${from}` : `/news/${article.id}`}>{article.title}</Link>
          </h2>
        </div>
        <div className="flex flex-row justify-between items-stretch gap-1 text-gray-700 text-md">
          <ShareButton
            path={`/news/${article.id}`}
            title={article.title}
            className="border border-gray-500 hover:bg-gray-100 cursor-pointer px-2 py-1 rounded font-medium"
          />
          <SaveButton
            article={article}
            className="border border-gray-500 hover:bg-gray-100 cursor-pointer flex items-center px-2 rounded"
            iconClassName="size-5"
          />
        </div>
      </div>
    </div>
  );
}
