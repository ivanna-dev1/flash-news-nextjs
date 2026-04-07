import React from "react";
import Image from "next/image";

export default function WeatherCard(props) {
  return (
    <div className="border border-gray-300 p-2 h-48 flex flex-col justify-around items-center col-span-2">
      <div>
        <h1 className="text-center text-xl font-medium">Local Weather</h1>
        <div className="flex flex-row flex-wrap justify-start items-center gap-2">
          <p>City: Lviv</p>
          <p>07.04.2026</p>
          <p>Tuesday</p>
        </div>
      </div>

      <div className="flex flex-row justify-between items-center gap-2">
        <div className="w-fit h-fit ">
          <Image src={props.image} alt="Weather" width={70} height={70} />
        </div>
        <div className="flex flex-col text-gray-800 text-sm justify-start items-start ">
          <p>Temperature: 25°C</p>
          <p>Feels like: 25°C</p>
          <p>Humidity: 50%</p>
          <p>Wind: 5 m/s</p>
        </div>
      </div>
    </div>
  );
}
