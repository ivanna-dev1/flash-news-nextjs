import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function WeatherCard(props) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <div
      className={`border border-gray-300 p-2 flex flex-col justify-around items-center ${isHomePage ? "h-48 col-span-2" : "min-w-44 h-48 gap-1"}`}
    >
      <div>
        <h1 className="text-center text-xl font-medium">Local Weather</h1>
        <div
          className={`flex flex-row flex-wrap items-center  ${
            isHomePage
              ? "text-md gap-3 justify-around"
              : "text-sm gap-1 justify-center"
          }`}
        >
          <p>City: Lviv</p>
          <p>Tuesday</p>
          <p>07.04.2026</p>
        </div>
      </div>

      <div
        className={`flex flex-row ${isHomePage ? "w-full justify-center items-center gap-4" : "justify-between items-center gap-1"}`}
      >
        <div className="  w-fit h-fit">
          <Image
            src={props.image}
            alt="Weather"
            width={isHomePage ? 100 : 70}
            height={isHomePage ? 100 : 70}
          />
        </div>
        <div className="  flex flex-col text-gray-800 text-sm justify-start items-start">
          <p>{isHomePage ? `Temperature: 25°C` : `Temp: 25°C`}</p>
          <p>{isHomePage ? `Feels like: 25°C` : `Feel: 25°C`}</p>
          <p>{isHomePage ? `Humidity: 50%` : `Hum: 50%`}</p>
          <p>{isHomePage ? `Wind: 5 m/s` : `Wind: 5 m/s`}</p>
        </div>
      </div>
    </div>
  );
}
