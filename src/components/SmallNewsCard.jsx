import React from "react";
import Image from "next/image";

export default function SmallNewsCard({ article }) {
  return (
    <div className="relative flex flex-col justify-around items-center border  text-gray-800 text-xs border-gray-300 p-2 h-44 min-w-32">
      <button className="absolute top-1  right-1  z-10 border border-gray-700 text-black text-lg font-bold  text-center px-2 rounded bg-white/70 hover:bg-white/90 hover:text-black cursor-pointer">
        +
      </button>
      <div className="w-fit h-fit ">
        <Image src={article.image} alt="FlashNews" width={100} height={100} />
      </div>
      <h2 className="text-center text-blue-800 p-1 hover:text-blue-800 cursor-pointer hover:underline">
        {article.title}
      </h2>

      {/* <div className="flex flex-row justify-between items-center">
        <button className="border border-gray-700 text-black px-2 py-1 rounded ">
          Читати далі
        </button>
        <button className="border border-gray-700 text-black px-2 py-1 rounded">
          +
        </button>
      </div> */}
    </div>
  );
}
