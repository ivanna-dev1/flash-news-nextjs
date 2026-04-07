import React from "react";
import { newsCategories } from "../../arrayMainCategory";
import Link from "next/link";

const CategoryBar = () => {
  return (
    <div className="flex flex-row justify-between overflow-x-auto gap-4 bg-gray-400 text-white p-4 border-gray-700">
      {newsCategories.map((category) => (
        <Link
          className="hover:text-blue-900 text-lg transition-colors duration-300"
          key={category.id}
          href={category.href}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default CategoryBar;
