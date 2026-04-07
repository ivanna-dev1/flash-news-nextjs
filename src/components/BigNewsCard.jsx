import React from "react";
import Image from "next/image";

export default function BigNewsCard({ article }) {
  return (
    <div className="flex flex-col justify-around  items-center border  border-gray-300 text-gray-800 gap-3 h-full w-full p-5">
      <div className="flex sm:flex-row flex-col justify-between items-center gap-5">
        <div className="flex-1 flex  ">
          <Image src={article.image} alt="FlashNews" width={200} height={200} />
        </div>
        <div className="flex-2 flex flex-col items-center justify-center ">
          <p>{article.description}</p>
        </div>
      </div>
      <h2 className="text-center text-2xl font-medium text-red-800 p-1 hover:text-red-700 cursor-pointer hover:underline">
        {article.title}
      </h2>
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
