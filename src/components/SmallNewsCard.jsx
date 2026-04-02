import React from "react";
import { news } from "./arrayFakeNews";

export default function SmallNewsCard() {
  return (
    <div className="flex flex-col justify-between items-center border text-green-500 border-gray-700 gap-2 h-50 w-50">
      <div className="w-fit h-fit ">
        <img src={news[0].image} alt="FlashNews" />
      </div>
      <h2 className="text-center text-green-500">{news[0].title}</h2>
      <button className="text-black px-4 py-2 rounded ">Читати далі</button>
      <button className="text-black px-4 py-2 rounded">Додати</button>
    </div>
  );
}
