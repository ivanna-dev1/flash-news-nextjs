"use client";
import { useEffect, useState } from "react";

export default function ScrollButtons() {
  const [isPageLong, setIsPageLong] = useState(false);

  useEffect(() => {
    const check = () =>
      setIsPageLong(document.documentElement.scrollHeight > window.innerHeight + 200);
    // The buttons live in the layout, so re-check on every height change.
    const observer = new ResizeObserver(check);
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  if (!isPageLong) return null;

  const scrollTo = (top: number) => window.scrollTo({ top, behavior: "smooth" });

  return (
    // Just outside the 1000px page. In a fixed box 100% excludes the scrollbar, 100vw doesn't.
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
