"use client";
import { usePathname } from "next/navigation";
import SmallNewsCard from "./SmallNewsCard";
import { news } from "../../arrayFakeNews.js";
import WeatherCard from "./WeatherCard";

export default function Sidebar() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  return (
    <aside
      className={`hidden md:grid gap-2 items-start content-start ${isHomePage ? "grid-cols-2 flex-1" : "grid-cols-1 w-44 mt-22  "}`}
    >
      <WeatherCard image="/weatherIMG.webp" />
      {isHomePage
        ? news
            .slice(0, 28)
            .map((article) => (
              <SmallNewsCard article={article} key={article.id} />
            ))
        : news
            .slice(0, 5)
            .map((article) => (
              <SmallNewsCard article={article} key={article.id} />
            ))}
    </aside>
  );
}
