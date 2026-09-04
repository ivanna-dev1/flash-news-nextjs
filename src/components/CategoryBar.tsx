import { navCategories } from "../../arrayCategory";
import Link from "next/link";

const CategoryBar = () => {
  return (
    <div className="flex flex-row justify-around  overflow-x-auto gap-4 bg-gray-400 text-white p-4 border-gray-700">
      {navCategories.map((category) => (
        <Link
          className="hover:text-blue-900 text-lg transition-colors duration-300"
          key={category.slug}
          href={`/${category.slug}`}
        >
          {category.name}
        </Link>
      )).slice(1, 8)
      }
    </div >
  );
};

export default CategoryBar;
