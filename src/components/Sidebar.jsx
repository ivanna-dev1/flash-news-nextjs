"use client";
import { usePathname } from "next/navigation";
import SmallNewsCard from "./SmallNewsCard";
import WeatherCard from "./WeatherCard";
import useNews from "../hooks/useNews";

export default function Sidebar() {
  const { data: news, isLoading, isError } = useNews();
  if (isLoading) return <div>Loading news...</div>;
  if (isError) return <div className="text-red-500">Error fetching news</div>;
  if (!news) return <div>Please try again later. </div>;

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
