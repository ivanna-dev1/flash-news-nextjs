"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import SmallNewsCard from "./SmallNewsCard";
import WeatherCard from "./WeatherCard";
import useNews from "../hooks/useNews";

// Max sidebar height relative to the main column.
const SIDEBAR_SHARE = 2 / 3;

export default function Sidebar() {
  const { data, isLoading, isError } = useNews();
  const news = data?.articles ?? [];

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isArticlePage = pathname.startsWith("/news/");
  const columns = isHomePage ? 2 : 1;

  const asideRef = useRef<HTMLElement>(null);
  // Start with all cards: we need one rendered card to measure.
  const [visibleCount, setVisibleCount] = useState(news.length);

  // Layout effect: extra cards are never painted.
  useLayoutEffect(() => {
    const aside = asideRef.current;
    const main = aside?.previousElementSibling as HTMLElement | null;
    if (!aside || !main) return;

    const countCards = () => {
      const weather = aside.children[0] as HTMLElement | undefined;
      const card = aside.children[1] as HTMLElement | undefined;
      if (!weather || !card || aside.offsetHeight === 0) return;

      const style = getComputedStyle(aside);
      const gap = parseFloat(style.rowGap) || 0;
      const top = parseFloat(style.marginTop) || 0;
      const room = main.offsetHeight * SIDEBAR_SHARE - top - weather.offsetHeight;
      // Whole rows only, never cut a card.
      const rows = Math.max(1, Math.floor(room / (card.offsetHeight + gap)));
      setVisibleCount(Math.min(rows * columns, news.length));
    };

    const observer = new ResizeObserver(countCards);
    observer.observe(main);
    observer.observe(aside);
    countCards();
    return () => observer.disconnect();
  }, [columns, news.length, pathname]);

  return (
    // Top margins align "Local Weather" with the first cards (categories)
    // or with the title baseline (article page).
    <aside
      ref={asideRef}
      className={`hidden md:grid gap-2 items-start content-start shrink-0 ${isHomePage ? "grid-cols-[repeat(2,minmax(8rem,1fr))] flex-1" : `grid-cols-[minmax(min-content,1fr)] basis-[18%] ${isArticlePage ? "mt-10" : "mt-[86px]"}`}`}
    >
      <WeatherCard image="/weatherIMG.webp" />
      {isLoading && <div>Loading news...</div>}
      {isError && <div className="text-red-500">Error fetching news</div>}
      {news.slice(0, Math.max(visibleCount, 1)).map((article) => (
        <SmallNewsCard article={article} key={article.id} />
      ))}
    </aside>
  );
}
