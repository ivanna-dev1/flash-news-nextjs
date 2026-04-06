import React from "react";
import Image from "next/image";

export default function SmallNewsCard({ article }) {
  return (
    <div className="flex flex-col justify-around items-center border  text-green-500 text-xs border-gray-500  h-50 w-full md:w-35">
      <div className="w-fit h-fit ">
        <Image src={article.image} alt="FlashNews" width={100} height={100} />
      </div>
      <h2 className="text-center text-green-500 p-1">{article.title}</h2>
      <div className="flex flex-row justify-between items-center">
        <button className="border border-gray-700 text-black px-2 py-1 rounded ">
          Читати далі
        </button>
        <button className="border border-gray-700 text-black px-2 py-1 rounded">
          {" "}
          +{" "}
        </button>
      </div>
    </div>
  );
}
