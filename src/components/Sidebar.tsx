"use client";
import { usePathname } from "next/navigation";
import SmallNewsCard from "./SmallNewsCard";
import WeatherCard from "./WeatherCard";
import useNews from "../hooks/useNews";

export default function Sidebar() {
  const { data, isLoading, isError } = useNews();
  const news = data?.articles ?? [];

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  if (isLoading) return <div>Loading news...</div>;
  if (isError) return <div className="text-red-500">Error fetching news</div>;

  return (
    // gap-2 is the same space as between the big cards on the home page.
    // On the home page a column is never narrower than 8rem (128px):
    // then the sidebar itself can't get narrower than two such columns,
    // and the main column gives it the room.
    // Category pages: the sidebar takes 18% of the row (176px on a full
    // width page), so it grows and shrinks with the page. The column is
    // never narrower than its content (min-content) - in fact, than the
    // weather card, the widest thing that can't get narrower.
    <aside
      className={`hidden md:grid gap-2 items-start content-start shrink-0 ${isHomePage ? "grid-cols-[repeat(2,minmax(8rem,1fr))] flex-1" : "grid-cols-[minmax(min-content,1fr)] basis-[18%] mt-22"}`}
    >
      <WeatherCard image="/weatherIMG.webp" />
      {isHomePage
        ? news
            .slice(0, 20)
            .map((article) => (
              <SmallNewsCard article={article} key={article.id} />
            ))
        : news
            .slice(0, 6)
            .map((article) => (
              <SmallNewsCard article={article} key={article.id} />
            ))}
    </aside>
  );
}
