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
    <div className="has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-gray-800 group relative transition-shadow duration-300 hover:shadow-md hover:border-gray-300 flex flex-col items-center border border-gray-100 text-gray-800 gap-4 w-full p-5">
      <div className="flex sm:flex-row flex-col justify-between items-center gap-5 w-full">
        {/* overflow-hidden here, not on the card: it would cut the Share menu. */}
        <div className="flex-1 w-full overflow-hidden">
          <Image
            src={article.image || "/mainIMG_2.jpg"}
            alt="FlashNews"
            width={500}
            height={300}
            sizes="(min-width: 640px) 33vw, 100vw"
            className="w-full h-auto transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>
        <div
          className="flex-2 line-clamp-6 sm:line-clamp-4"
          dangerouslySetInnerHTML={{ __html: displayDescription }}
        />
      </div>
      {/* Stretched link: ::after covers the whole card (relative), so a click anywhere
          opens the article. A wrapping <a> would hold buttons, which HTML forbids. */}
      <h2 className="text-center text-2xl font-medium text-red-800 line-clamp-4 group-hover:text-red-700 group-hover:underline">
        <Link href={`/news/${article.id}`} className="after:absolute after:inset-0 focus-visible:outline-none">
          {article.title}
        </Link>
      </h2>
      {/* relative z-10: the buttons stay above the stretched link. */}
      <div className="relative z-10 flex flex-row justify-between items-stretch gap-2 text-gray-700 text-md">
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
