"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import SmallNewsCard from "./SmallNewsCard";
import WeatherCard from "./WeatherCard";
import useNews from "../hooks/useNews";

// The sidebar is not taller than this part of the main column height.
// 2/3 is Ivanna's choice; to try 1/2, change only this number.
const SIDEBAR_SHARE = 2 / 3;

export default function Sidebar() {
  const { data, isLoading, isError } = useNews();
  const news = data?.articles ?? [];

  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isArticlePage = pathname.startsWith("/news/");
  // Home page: cards stand in 2 columns, so we always show whole rows.
  const columns = isHomePage ? 2 : 1;

  const asideRef = useRef<HTMLElement>(null);
  // How many news cards fit. Before the first count we show all of them:
  // we need at least one card on the page to measure its height.
  const [visibleCount, setVisibleCount] = useState(news.length);

  // useLayoutEffect runs before the browser paints, so the extra cards
  // are never seen on the screen for a moment.
  useLayoutEffect(() => {
    const aside = asideRef.current;
    // In layout.tsx the sidebar stands right after <main>.
    const main = aside?.previousElementSibling as HTMLElement | null;
    if (!aside || !main) return;

    const countCards = () => {
      const weather = aside.children[0] as HTMLElement | undefined;
      const card = aside.children[1] as HTMLElement | undefined;
      // Hidden sidebar (phone) or nothing to measure yet.
      if (!weather || !card || aside.offsetHeight === 0) return;

      const style = getComputedStyle(aside);
      const gap = parseFloat(style.rowGap) || 0;
      const top = parseFloat(style.marginTop) || 0;
      // The room for the cards: our part of the main column, minus the
      // top margin and the weather card. Every row of cards takes its own
      // height plus the gap above it.
      const room = main.offsetHeight * SIDEBAR_SHARE - top - weather.offsetHeight;
      // Math.floor: only whole rows, a card is never cut. At least one row.
      const rows = Math.max(1, Math.floor(room / (card.offsetHeight + gap)));
      setVisibleCount(Math.min(rows * columns, news.length));
    };

    // ResizeObserver calls countCards every time the main column or the
    // sidebar changes its size: pictures load, the window gets narrower.
    const observer = new ResizeObserver(countCards);
    observer.observe(main);
    observer.observe(aside);
    countCards();
    return () => observer.disconnect();
  }, [columns, news.length, pathname]);

  return (
    // gap-2 is the same space as between the big cards on the home page.
    // On the home page a column is never narrower than 8rem (128px):
    // then the sidebar itself can't get narrower than two such columns,
    // and the main column gives it the room.
    // Category pages: the sidebar takes 18% of the row (176px on a full
    // width page), so it grows and shrinks with the page. The column is
    // never narrower than its content (min-content) - in fact, than the
    // weather card, the widest thing that can't get narrower.
    // Top margin: category pages (86px) - the top of the "Local Weather"
    // letters is on one line with the top of the photos in the first cards.
    // Article page (mt-10, 40px) - "Local Weather" stands on one line
    // (baseline, the line the letters stand on) with the first line of the
    // article title.
    // (On the home page the sidebar has no margin, see WeatherCard.)
    <aside
      ref={asideRef}
      className={`hidden md:grid gap-2 items-start content-start shrink-0 ${isHomePage ? "grid-cols-[repeat(2,minmax(8rem,1fr))] flex-1" : `grid-cols-[minmax(min-content,1fr)] basis-[18%] ${isArticlePage ? "mt-10" : "mt-[86px]"}`}`}
    >
      <WeatherCard image="/weatherIMG.webp" />
      {/* Loading and error text is inside the <aside>: then it is hidden on
          a phone like the whole sidebar, and the weather card stays. */}
      {isLoading && <div>Loading news...</div>}
      {isError && <div className="text-red-500">Error fetching news</div>}
      {news.slice(0, Math.max(visibleCount, 1)).map((article) => (
        <SmallNewsCard article={article} key={article.id} />
      ))}
    </aside>
  );
}
