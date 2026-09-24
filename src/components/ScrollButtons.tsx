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
    check();
    window.addEventListener("resize", check);
    // The page grows while news are loading, so we check again after that.
    const timer = setTimeout(check, 1000);
    return () => {
      window.removeEventListener("resize", check);
      clearTimeout(timer);
    };
  }, []);

  if (!isPageLong) return null;

  const scrollTo = (top: number) => window.scrollTo({ top, behavior: "smooth" });

  return (
    <div className="fixed right-2 bottom-20 z-100 flex flex-col gap-2">
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
