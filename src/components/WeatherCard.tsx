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
      className={`border border-gray-100 p-2 flex flex-col justify-around items-center ${isHomePage ? "min-h-48 col-span-2" : "min-w-44 min-h-48 gap-1"}`}
    >
      <div>
        <h1 className="text-center text-xl font-medium">Local Weather</h1>
        <div
          className={`flex flex-row flex-wrap items-center  ${isHomePage
            ? "text-md gap-3 justify-around"
            : "text-sm gap-1 justify-center"
            }`}
        >
          <p>City: Lviv</p>
          <p>{new Date().toLocaleDateString("en-US", { weekday: "long" })}</p>
          {/* Month as short text ("22 Sep 2026"): clear for everyone, not only in one country. */}
          <p>
            {new Date().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      <div
        className={`flex flex-row ${isHomePage ? "w-full justify-center items-center gap-4" : "justify-between items-center gap-1"}`}
      >
        <div className="  w-fit h-fit">
          <Image
            src={image}
            alt="Weather"
            width={isHomePage ? 100 : 70}
            height={isHomePage ? 100 : 70}
          />
        </div>
        {/* Short labels and "whitespace-nowrap": a long label pushed
            the number to the next line, which looked broken. */}
        <div className="flex flex-col text-gray-800 text-sm justify-start items-start whitespace-nowrap">
          <p>Temp: 25°C</p>
          <p>Feels: 25°C</p>
          <p>{isHomePage ? `Humidity: 50%` : `Hum: 50%`}</p>
          <p>Wind: 5 m/s</p>
        </div>
      </div>
    </div>
  );
}
