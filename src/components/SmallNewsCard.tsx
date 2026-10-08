import Image from "next/image";
import Link from "next/link";
import type { ArticleType } from "@/types/news";
import SaveButton from "./SaveButton";

interface SmallNewsCardProps {
  article: ArticleType;
}

export default function SmallNewsCard({ article }: SmallNewsCardProps) {
  return (
    <div className="has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-gray-800 group transition-shadow duration-300 hover:shadow-md hover:border-gray-300 relative flex flex-col gap-2 border text-gray-800 text-xs border-gray-100 p-[3px]">
      <SaveButton
        article={article}
        className="absolute top-0 right-0 z-10 border border-gray-700 text-gray-700 text-center px-2 py-1 rounded bg-white/70 hover:bg-white/90 hover:text-black cursor-pointer"
        iconClassName="size-5"
      />
      <div className="overflow-hidden">
        <Image
          src={article.image || "/mainIMG_2.jpg"}
          alt="FlashNews"
          width={500}
          height={300}
          sizes="176px"
          // Some previews are 5:4, keep one frame for all cards.
          className="w-full aspect-[5/3] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
      {/* 4lh: every title box is four lines high, so all cards are equal. */}
      <div className="h-[4lh] flex items-center justify-center">
        {/* Stretched link: ::after covers the whole card (relative), so a click anywhere
            opens the article. The Save button has z-10 and stays above it. */}
        <h2 className="text-center text-blue-800 line-clamp-4 group-hover:underline">
          <Link href={`/news/${article.id}`} className="after:absolute after:inset-0 focus-visible:outline-none">
            {article.title}
          </Link>
        </h2>
      </div>
    </div>
  );
}
