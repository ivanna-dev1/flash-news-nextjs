"use client";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface WeatherCardProps {
  image: string;
}
export default function WeatherCard({ image }: WeatherCardProps) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <div
      // Breakpoint by window width: a container query on the sidebar would break its min-content width.
      className={`border border-gray-100 flex flex-col items-center gap-2 ${isHomePage
        ? // pt-[10px]: baseline-aligned with the home page heading.
          "justify-center min-h-48 col-span-2 p-[3px] pt-[10px] min-[860px]:p-2 min-[860px]:pt-[10px]"
        : "pt-[14px] px-[3px] pb-0"
        }`}
    >
      <h1 className="text-center text-xl font-medium leading-none">Local Weather</h1>
      <div
        className={`flex flex-col items-center ${isHomePage ? "text-md" : "text-sm"}`}
      >
        <p>City: Lviv</p>
        <p>
          {new Date().toLocaleDateString("en-US", { weekday: "short" })}{" "}
          {new Date().toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
      </div>

      <div
        className={`flex flex-row ${isHomePage ? "mt-1.5 w-full justify-center items-center gap-4" : "w-full justify-between items-center gap-1"}`}
      >
        {/* Fixed width: min-content ignores images (max-width: 100%). */}
        <div className={`h-fit shrink-0 ${isHomePage ? "w-[100px]" : "w-[70px]"}`}>
          <Image
            src={image}
            alt="Weather"
            width={isHomePage ? 100 : 70}
            height={isHomePage ? 100 : 70}
          />
        </div>
        {/* translate="no": browser translators mangle the short labels. */}
        <div
          className="flex flex-col text-gray-800 text-sm justify-start items-start whitespace-nowrap"
          translate={isHomePage ? undefined : "no"}
        >
          <p>{isHomePage ? `Temperature: 25°C` : `Temp: 25°C`}</p>
          <p>{isHomePage ? `Feels like: 25°C` : `Feels: 25°C`}</p>
          <p>{isHomePage ? `Humidity: 50%` : `Hum: 50%`}</p>
          <p>Wind: 5m/s</p>
        </div>
      </div>
    </div>
  );
}
