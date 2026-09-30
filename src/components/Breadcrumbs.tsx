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
    // and never get narrower (shrink-0 + whitespace-nowrap), even with two
    // words like "Global development". Only the article title gets
    // narrower: min-w-0 lets it shrink, truncate cuts it with "...".
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
            className="shrink-0 whitespace-nowrap hover:underline cursor-pointer hover:text-blue-900"
            href={`/${category.slug}/${subcategory.slug}`}
          >
            {subcategory.name}
          </Link>
        </>
      )}
      {/* Phone (under sm): no title here - the links take the whole line,
          and the title is right below anyway, in big letters. */}
      {title && (
        <>
          <p className="hidden sm:block shrink-0"> / </p>
          <p className="hidden sm:block min-w-0 italic text-gray-500 truncate capitalize">{title}</p>
        </>
      )}
    </div>
  );
}
