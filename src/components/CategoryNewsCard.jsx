import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryNewsCard({ article }) {
  return (
    <div className="flex flex-col justify-between  items-center border  border-red-800 text-gray-800 gap-5 h-full w-full p-5">
      <div className="flex  flex-col justify-between items-center gap-5 h-full  ">
        <div className="flex  ">
          <Image src={article.image} alt="FlashNews" width={200} height={200} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <p>{article.description}</p>
        </div>
        <h2 className="text-center text-2xl font-medium text-red-800 p-1 hover:text-red-700 cursor-pointer hover:underline">
          <Link href={`/news/${article.id}`}>{article.title}</Link>
        </h2>
      </div>

      <div className="flex flex-row justify-between items-center gap-2 text-gray-700 text-md">
        {/* <button className="border border-gray-500 hover:bg-gray-100 cursor-pointer px-4 py-2 rounded ">
          Читати далі
        </button> */}
        <button className="border border-gray-500 hover:bg-gray-100 cursor-pointer px-4 py-2 rounded">
          Поширити
        </button>
        <button className="border border-gray-500 hover:bg-gray-100 cursor-pointer  px-4 py-2 rounded">
          ➕
        </button>
      </div>
    </div>
  );
}
