import React from "react";
import { news } from "./arrayFakeNews";

export default function BigNewsCard() {
  return (
    <div className="flex flex-col border border-gray-700 text-blue-500 gap-2 h-100 w-100">
      <div className="flex flex-row justify-between items-center">
        <div className="flex-1">
          <img src={news[0].image} alt="FlashNews" />
        </div>
        <div className="flex-1 flex flex-col">
          <p>{news[0].description}</p>
        </div>
      </div>
      <h2>{news[0].title}</h2>
      <button className="text-black px-4 py-2 rounded ">Читати далі</button>
      <button className="text-black px-4 py-2 rounded">Додати</button>
    </div>
  );
}
