"use client";
import { useEffect, useState } from "react";

// Two small buttons on the right side: jump to the top or to the bottom.
// They float over the page, because there is no free space in the layout.
export default function ScrollButtons() {
  // The page can be shorter than the window. Then we do not need the buttons.
  const [isPageLong, setIsPageLong] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsPageLong(document.documentElement.scrollHeight > window.innerHeight + 200);
    // The buttons live in the layout, so they are not created again when the
    // reader goes to another page. ResizeObserver calls check every time the
    // body changes its height: news or pictures load, another page opens,
    // the window gets smaller or bigger.
    const observer = new ResizeObserver(check);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  if (!isPageLong) return null;

  const scrollTo = (top: number) => window.scrollTo({ top, behavior: "smooth" });

  return (
    // z-40: under the header (z-50), so the open menu covers the buttons.
    // right: just outside the white page (1000px wide, in the centre):
    // (window width - 1000px) / 2 is the free space on the right, minus the
    // button width (2.5rem) and a small gap (0.5rem) = 3rem. For a "fixed"
    // box 100% is the window width without the scrollbar (100vw would count
    // the scrollbar too). When there is no free space (a narrow screen),
    // max() keeps them 0.5rem from the edge.
    <div className="fixed right-[max(0.5rem,calc((100%_-_1000px)/2_-_3rem))] bottom-10 z-40 flex flex-col gap-2">
      <button
        aria-label="Scroll to top"
        title="To the top"
        onClick={() => scrollTo(0)}
        className="w-10 h-10 rounded-full bg-gray-800/80 text-white text-lg hover:bg-gray-800 cursor-pointer shadow"
      >
        ↑
      </button>
      <button
        aria-label="Scroll to bottom"
        title="To the bottom"
        onClick={() => scrollTo(document.documentElement.scrollHeight)}
        className="w-10 h-10 rounded-full bg-gray-800/80 text-white text-lg hover:bg-gray-800 cursor-pointer shadow"
      >
        ↓
      </button>
    </div>
  );
}
