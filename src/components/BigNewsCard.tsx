import Image from "next/image";
import Link from "next/link";
import type { ArticleType } from "@/types/news";
import { truncateHtml } from "@/lib/truncateHtml";

interface BigNewsCardProps {
  article: ArticleType;
}

export default function BigNewsCard({ article }: BigNewsCardProps) {
  // A safety cut. The real cut is made by CSS, by lines (line-clamp below).
  const displayDescription = truncateHtml(article.description, 90);

  return (
    <div className="flex flex-col items-center border border-gray-100 text-gray-800 gap-4 w-full p-5">
      <div className="flex sm:flex-row flex-col justify-between items-center gap-5 w-full">
        <div className="flex-1 w-full">
          <Image
            src={article.image || "/mainIMG_2.jpg"}
            alt="FlashNews"
            // 500x300 is the real shape of a Guardian preview. These numbers
            // are NOT the size on screen: the browser uses them to keep the
            // proportions and to save the place while the picture loads.
            width={500}
            height={300}
            // The size on screen comes from CSS: one third of the row
            // on wide screens, the full width on a phone.
            sizes="(min-width: 640px) 33vw, 100vw"
            className="w-full h-auto"
          />
        </div>
        {/* Guardian is a trusted source, so we can show its HTML.
            line-clamp cuts the text by LINES and adds "..." itself.
            Next to the photo we allow 4 lines: the photo is one third of
            the row and its shape is 5:3, so its height is close to four
            lines of this text. On a phone the text goes under the photo,
            there is more room, so 6 lines. */}
        <div
          // 4 lines next to the photo, 6 when the text goes under it.
          // The text is centred against the photo (items-center above).
          className="flex-2 line-clamp-6 sm:line-clamp-4"
          dangerouslySetInnerHTML={{ __html: displayDescription }}
        />
      </div>
      <h2 className="text-center text-2xl font-medium text-red-800 line-clamp-4 hover:text-red-700 cursor-pointer hover:underline">
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
