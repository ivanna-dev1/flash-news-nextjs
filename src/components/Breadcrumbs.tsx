import Link from "next/link";

interface BreadcrumbsProps {
  category?: string;
  subCategory?: string;
  title?: string;
}
export default function Breadcrumbs({ category, subCategory, title }: BreadcrumbsProps) {
  return (
    <div className="flex flex-row gap-2 text-gray-700 text-md ">
      <Link
        className="hover:underline cursor-pointer hover:text-blue-900"
        href="/"
      >
        Home
      </Link>
      {/* <p> / </p> */}
      {category && (
        <>
          <p> / </p>
          <Link
            className="hover:underline cursor-pointer hover:text-blue-900 capitalize"
            href={`/${category.toLowerCase()}`}
          >
            {category}
          </Link>
          {/* <p> / </p> */}
        </>
      )}
      {subCategory && subCategory !== "Latest" && (
        <>
          <p> / </p>
          <Link
            className="hover:underline cursor-pointer hover:text-blue-900 capitalize"
            href={`/${category.toLowerCase()}/${subCategory.toLowerCase()}`}
          >
            {subCategory}
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
