import Link from "next/link";
import type { SubCategoryType } from "@/types/news";

interface BreadcrumbsProps {
  category?: SubCategoryType;
  subcategory?: SubCategoryType;
  title?: string;
}

export default function Breadcrumbs({ category, subcategory, title }: BreadcrumbsProps) {
  return (
    // One line. The title shrinks first (shrink-[100]) down to 3em,
    // then the subcategory gets truncated.
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
      {title && (
        <>
          <p className="shrink-0"> / </p>
          <p className="min-w-[3em] shrink-[100] italic text-gray-500 truncate capitalize">{title}</p>
        </>
      )}
    </div>
  );
}
