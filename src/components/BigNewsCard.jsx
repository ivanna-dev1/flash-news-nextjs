import React from "react";
import Image from "next/image";

export default function BigNewsCard({ article }) {
  return (
    <div className="flex flex-col border border-gray-700 text-blue-500 gap-2 h-100 w-100">
      <div className="flex flex-row justify-between items-center">
        <div className="flex-1">
          <Image src={article.image} alt="FlashNews" width={500} height={500} />
        </div>
        <div className="flex-1 flex flex-col">
          <p>{article.description}</p>
        </div>
      </div>
      <h2>{article.title}</h2>
      <button className="text-black px-4 py-2 rounded ">Читати далі</button>
      <button className="text-black px-4 py-2 rounded">Додати</button>
    </div>
  );
}
