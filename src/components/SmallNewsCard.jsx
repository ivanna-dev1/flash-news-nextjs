import React from "react";
import Image from "next/image";

export default function SmallNewsCard({ article }) {
  return (
    <div className="flex flex-col justify-between items-center border text-green-500 border-gray-700 gap-2 h-50 w-50">
      <div className="w-fit h-fit ">
        <Image src={article.image} alt="FlashNews" width={100} height={100} />
      </div>
      <h2 className="text-center text-green-500">{article.title}</h2>
      <button className="text-black px-4 py-2 rounded ">Читати далі</button>
      <button className="text-black px-4 py-2 rounded">Додати</button>
    </div>
  );
}
