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
    <div className="flex flex-row gap-2 text-gray-700 text-md ">
      <Link
        className="hover:underline cursor-pointer hover:text-blue-900"
        href="/"
      >
        Home
      </Link>
      {category && (
        <>
          <p> / </p>
          <Link
            className="hover:underline cursor-pointer hover:text-blue-900"
            href={`/${category.slug}`}
          >
            {category.name}
          </Link>
        </>
      )}
      {category && subcategory && (
        <>
          <p> / </p>
          <Link
            className="hover:underline cursor-pointer hover:text-blue-900"
            href={`/${category.slug}/${subcategory.slug}`}
          >
            {subcategory.name}
          </Link>
        </>
      )}
      {title && (
        <>
          <p> / </p>
          <p className="italic text-gray-500 truncate capitalize">{title}</p>
        </>
      )}
    </div>
  );
}
