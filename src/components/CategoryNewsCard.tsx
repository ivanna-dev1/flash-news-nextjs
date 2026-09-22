import Image from "next/image";
import Link from "next/link";
import type { ArticleType } from "@/types/news";
import { truncateHtml } from "@/lib/truncateHtml";

interface CategoryNewsCardProps {
  article: ArticleType;
  isBig: boolean;
}

export default function CategoryNewsCard({ article, isBig }: CategoryNewsCardProps) {
  // Guardian text can have tags like <strong>, so we cut it with care.
  const displayDescription = truncateHtml(article.description, isBig ? 30 : 10);

  return (
    <div
      className={`flex flex-col justify-between  items-center border  border-gray-100 text-gray-800 gap-4 h-[300px] w-full py-4 px-3  ${isBig ? "md:col-span-3" : "md:col-span-2"
        }`}
    >
      <div className="flex   flex-col justify-between   gap-2 h-full">
        <div className="  gap-3 text-md ">
          <div
            className={`float-left mr-3 mb-1 ${isBig ? "w-[170px] max-h-[170px] " : "w-[120px] max-h-[120px]"} `}
          >
            <Image
              src={article.image || "/mainIMG_2.jpg"}
              alt="FlashNews"
              width={isBig ? 170 : 120}
              height={isBig ? 170 : 120}
              style={{ height: "auto" }}
            />
          </div>
          {/* Guardian is a trusted source, so we can show its HTML. */}
          <div
            className="text-wrap w-full "
            dangerouslySetInnerHTML={{ __html: displayDescription }}
          />
        </div>
        <h2 className="text-center text-xl font-medium text-red-800 p-1 hover:text-red-700 cursor-pointer hover:underline">
          <Link href={`/news/${article.id}`}>{article.title}</Link>
        </h2>
      </div>

      <div className="flex flex-row justify-between items-center gap-1 text-gray-700 text-md">
        <button className="border border-gray-500 hover:bg-gray-100 cursor-pointer px-2 py-1 rounded">
          Share
        </button>
        <button className="border border-gray-500 hover:bg-gray-100 cursor-pointer  px-2 py-1 rounded">
          ⭐️
        </button>
      </div>
    </div>
  );
}
