import { Fragment } from "react";
import { navCategories } from "@/data/arrayCategory";
import Link from "next/link";

const CategoryBar = () => {
  return (
    // No horizontal scroll. When the window gets narrower (Ivanna's order):
    // 1) the free space between the links gets smaller (justify-around
    //    spreads the links evenly; the min gap is 8px, from md 16px);
    // 2) then the text gets smaller - from 18px down to 14px, smoothly;
    // 3) only under 460px: two rows (4 + 3) - an empty full-width element
    //    after the 4th link starts a new row.
    // Text size: the 7 names take about 26.8 x the font size (483px at
    // 18px), plus 6 gaps of 8px. So the biggest font that fits is
    // (bar width - 48px) / 27 (27, not 26.8: a small reserve for a wider
    // font on another computer). clamp() keeps it from 14px to 18px.
    // 100cqw = the width of the bar (it is a container, @container): the
    // bar is always as wide as the page, not as its content, so this is
    // safe. 18px from ~565px, 14px at 460px (the 7 names take 376px).
    <div className="@container flex flex-row flex-wrap justify-around gap-x-4 min-[460px]:gap-x-2 md:gap-x-4 gap-y-1 bg-gray-400 text-white p-4 border-gray-700">
      {navCategories.slice(1, 8).map((category, index) => (
        <Fragment key={category.slug}>
          <Link
            className="hover:text-blue-900 text-lg min-[460px]:text-[length:clamp(14px,calc((100cqw_-_48px)/27),18px)] transition-colors duration-300"
            href={`/${category.slug}`}
          >
            {category.name}
          </Link>
          {index === 3 && <span className="w-full h-0 min-[460px]:hidden" aria-hidden="true" />}
        </Fragment>
      ))}
    </div>
  );
};

export default CategoryBar;
