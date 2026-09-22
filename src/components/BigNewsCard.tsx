import Image from "next/image";
import Link from "next/link";
import type { ArticleType } from "@/types/news";
import { truncateHtml } from "@/lib/truncateHtml";

interface BigNewsCardProps {
  article: ArticleType;

}

export default function BigNewsCard({ article }: BigNewsCardProps) {
  // Guardian text can have tags like <strong>, so we cut it with care.
  const displayDescription = truncateHtml(article.description, 50);

  return (
    <div className="flex flex-col justify-around  items-center border  border-gray-100 text-gray-800 gap-3 h-full w-full p-5">
      <div className="flex sm:flex-row   flex-col justify-between items-center gap-5">
        <div className="flex-1 flex  ">
          <Image
            src={article.image || "/mainIMG_2.jpg"}
            alt="FlashNews"
            width={200}
            height={200}
          />
        </div>
        <div className="flex-2 flex flex-col items-center justify-center ">
          {/* Guardian is a trusted source, so we can show its HTML. */}
          <div dangerouslySetInnerHTML={{ __html: displayDescription }} />
        </div>
      </div>
      <h2 className="text-center text-2xl font-medium text-red-800 p-1 hover:text-red-700 cursor-pointer hover:underline">
        <Link href={`/news/${article.id}`}>{article.title}</Link>
      </h2>
      <div className="flex flex-row justify-between items-center gap-2 text-gray-700 text-md">
        <button className="border border-gray-500 hover:bg-gray-100 cursor-pointer px-4 py-2 rounded">
          Share
        </button>
        <button className="border border-gray-500 hover:bg-gray-100 cursor-pointer  px-4 py-2 rounded">
          ⭐️
        </button>
      </div>
    </div>
  );
}
