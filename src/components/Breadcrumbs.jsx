import React from "react";
import Link from "next/link";

export default function Breadcrumbs({ category, subCategory }) {
  return (
    <div className="flex flex-row gap-2 text-gray-700 text-md mb-5">
      <Link
        className="hover:underline cursor-pointer hover:text-blue-900"
        href="/"
      >
        Home
      </Link>
      <p> / </p>
      <Link
        className="hover:underline cursor-pointer hover:text-blue-900"
        href={`/news/${category}`}
      >
        {category}
      </Link>
      <p> / </p>
      <Link
        className="hover:underline cursor-pointer hover:text-blue-900"
        href={`/news/${category}/${subCategory}`}
      >
        {subCategory}
      </Link>
    </div>
  );
}
