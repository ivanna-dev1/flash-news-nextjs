import Image from "next/image";
import Link from "next/link";
import type { ArticleType } from "@/types/news";
import { truncateHtml } from "@/lib/truncateHtml";
import SaveButton from "./SaveButton";
import ShareButton from "./ShareButton";

interface BigNewsCardProps {
  article: ArticleType;
}

export default function BigNewsCard({ article }: BigNewsCardProps) {
  // Fallback only; the visible cut is line-clamp.
  const displayDescription = truncateHtml(article.description, 90);

  return (
    <div className="flex flex-col items-center border border-gray-100 text-gray-800 gap-4 w-full p-5">
      <div className="flex sm:flex-row flex-col justify-between items-center gap-5 w-full">
        <div className="flex-1 w-full">
          <Image
            src={article.image || "/mainIMG_2.jpg"}
            alt="FlashNews"
            width={500}
            height={300}
            sizes="(min-width: 640px) 33vw, 100vw"
            className="w-full h-auto"
          />
        </div>
        <div
          className="flex-2 line-clamp-6 sm:line-clamp-4"
          dangerouslySetInnerHTML={{ __html: displayDescription }}
        />
      </div>
      <h2 className="text-center text-2xl font-medium text-red-800 line-clamp-4 hover:text-red-700 cursor-pointer hover:underline">
        <Link href={`/news/${article.id}`}>{article.title}</Link>
      </h2>
      <div className="flex flex-row justify-between items-stretch gap-2 text-gray-700 text-md">
        <ShareButton
          path={`/news/${article.id}`}
          title={article.title}
          className="border border-gray-500 hover:bg-gray-100 cursor-pointer px-4 py-2 rounded font-medium"
        />
        <SaveButton
          article={article}
          className="border border-gray-500 hover:bg-gray-100 cursor-pointer flex items-center px-4 rounded"
          iconClassName="size-6"
        />
      </div>
    </div>
  );
}
