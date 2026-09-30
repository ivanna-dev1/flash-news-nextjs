"use client";
import { useEffect, useState } from "react";

// A thin line on the top edge of the page: how much of the article is read.
// 0% at the top of the page, 100% at the bottom.
export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      // How far we can scroll at all: page height minus window height.
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };
    update();
    // passive: true tells the browser we never stop the scroll,
    // so the scroll stays smooth.
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    // Over the header (z-60 > z-50), as wide as the white page (1000px).
    <div
      className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-1 z-60"
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div className="h-full bg-red-700" style={{ width: `${progress}%` }} />
    </div>
  );
}
