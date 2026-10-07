import { Fragment } from "react";
import { navCategories } from "@/data/arrayCategory";
import Link from "next/link";

const CategoryBar = () => {
  return (
    // One row from 460px: gaps shrink first, then the font (18px -> 14px).
    // 27 = width of the 7 labels / font size, measured in the browser.
    // Below 460px: two rows (4 + 3).
    <div className="@container flex flex-row flex-wrap justify-around gap-x-4 min-[460px]:gap-x-2 md:gap-x-4 gap-y-1 bg-gray-400 text-white p-4 border-gray-700">
      {navCategories.slice(1, 8).map((category, index) => (
        <Fragment key={category.slug}>
          <Link
            className="hover:text-blue-900 hover:underline underline-offset-4 text-lg min-[460px]:text-[length:clamp(14px,calc((100cqw_-_48px)/27),18px)] transition-colors duration-300"
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
