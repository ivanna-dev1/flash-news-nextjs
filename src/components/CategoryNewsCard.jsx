import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryNewsCard({ article, isBig }) {
  const words = article.description.split(" ");
  const maxLength = isBig ? 33 : 10;
  const isLong = words.length > maxLength;
  const displayDescription = isLong
    ? words.slice(0, maxLength).join(" ") + "..."
    : article.description;

  return (
    <div
      className={`flex flex-col justify-between  items-center border  border-blue-100 text-gray-800 gap-4 h-[300px] w-full py-4 px-3  ${
        isBig ? "md:col-span-3" : "md:col-span-2"
      }`}
    >
      <div className="flex   flex-col justify-between   gap-2 h-full   ">
        <div className="  gap-3 text-md ">
          <div
            className={`float-left mr-3 mb-1 ${isBig ? "w-[170px] max-h-[170px] " : "w-[120px] max-h-[120px]"} `}
          >
            <Image
              src={article.image}
              alt="FlashNews"
              width={isBig ? 170 : 120}
              height={isBig ? 170 : 120}
              style={{ height: "auto" }}
            />
          </div>
          <p className="text-wrap w-full ">{displayDescription}</p>
        </div>
        <h2 className="text-center text-xl font-medium text-red-800 p-1 hover:text-red-700 cursor-pointer hover:underline">
          <Link href={`/news/${article.id}`}>{article.title}</Link>
        </h2>
      </div>

      <div className="flex flex-row justify-between items-center gap-1 text-gray-700 text-md">
        <button className="border border-gray-500 hover:bg-gray-100 cursor-pointer px-2 py-1 rounded">
          Поширити
        </button>
        <button className="border border-gray-500 hover:bg-gray-100 cursor-pointer  px-2 py-1 rounded">
          ➕
        </button>
      </div>
    </div>
  );
}
