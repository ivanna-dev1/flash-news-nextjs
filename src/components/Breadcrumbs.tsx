import Link from "next/link";
import type { SubCategoryType } from "@/types/news";

// Menu items from arrayCategory.ts: `name` is for the text, `slug` is for the link.
interface BreadcrumbsProps {
  category?: SubCategoryType;
  subcategory?: SubCategoryType;
  title?: string;
}

export default function Breadcrumbs({ category, subcategory, title }: BreadcrumbsProps) {
  return (
    // One line always. The links (Home / category / subcategory) never wrap
    // (whitespace-nowrap), even with two words like "Global development".
    // Home and the category never get narrower (shrink-0). The article
    // title gets narrower first and is cut with "..." (truncate), but it
    // always keeps at least 3em - about one short word (Ivanna's choice).
    // Only when the title is already that small (a long subcategory on a
    // very narrow phone), the subcategory is cut with "..." too: the title
    // has shrink-[100], 100 times more than the subcategory (shrink 1), so
    // the title gets narrower first. (Not shrink-[0.01] on the subcategory:
    // when the sum of flex-shrink numbers is less than 1, the browser
    // shrinks only that part of the needed width, and the line overflows.)
    <div className="flex flex-row gap-2 text-gray-700 text-md ">
      <Link
        className="shrink-0 whitespace-nowrap hover:underline cursor-pointer hover:text-blue-900"
        href="/"
      >
        Home
      </Link>
      {category && (
        <>
          <p className="shrink-0"> / </p>
          <Link
            className="shrink-0 whitespace-nowrap hover:underline cursor-pointer hover:text-blue-900"
            href={`/${category.slug}`}
          >
            {category.name}
          </Link>
        </>
      )}
      {category && subcategory && (
        <>
          <p className="shrink-0"> / </p>
          <Link
            className={`whitespace-nowrap hover:underline cursor-pointer hover:text-blue-900 ${title ? "min-w-0 truncate" : "shrink-0"}`}
            href={`/${category.slug}/${subcategory.slug}`}
          >
            {subcategory.name}
          </Link>
        </>
      )}
      {/* The title is shown on every screen, also on a phone (Ivanna's
          choice: without it the breadcrumbs look unfinished). It takes the
          room that is left on the line - even if only one word fits. */}
      {title && (
        <>
          <p className="shrink-0"> / </p>
          <p className="min-w-[3em] shrink-[100] italic text-gray-500 truncate capitalize">{title}</p>
        </>
      )}
    </div>
  );
}
