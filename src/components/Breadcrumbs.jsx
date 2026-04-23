import React from "react";
import Link from "next/link";

export default function Breadcrumbs({ category, subCategory }) {
  return (
    <div className="flex flex-row gap-2 text-gray-700 text-md ">
      <Link
        className="hover:underline cursor-pointer hover:text-blue-900"
        href="/"
      >
        Home
      </Link>
      <p> / </p>
      {category && (
        <>
          <Link
            className="hover:underline cursor-pointer hover:text-blue-900"
            href={category}
          >
            {category}
          </Link>
          <p> / </p>
        </>
      )}
      {subCategory && (
        <>
          <Link
            className="hover:underline cursor-pointer hover:text-blue-900"
            href={`${category}/${subCategory}`}
          >
            {subCategory}
          </Link>
        </>
      )}
    </div>
  );
}
