import React from "react";
import { news } from "../../../../arrayFakeNews.js";
import CategoryNewsCard from "@/components/CategoryNewsCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
export default async function CategoryPage({ params, searchParams }) {
  const { category, subcategory } = await params;
  const filteredNews = news.filter(
    (item) => item.category === category && item.subcategory === subcategory,
  );
  const sp = await searchParams;
  const currentPage = Number(sp.page) || 1;
  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = filteredNews.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredNews.length / itemsPerPage);
  return (
    <div>
      <Breadcrumbs category={category} subcategory={subcategory} />
      <h3 className=" text-3xl font-semibold text-center text-gray-700 p-1 mb-5 ">
        {subcategory} News
      </h3>
      <div className="md:grid grid-cols-5  flex-1  gap-3 items-start content-start ">
        {currentNews.map((article, index) => (
          <CategoryNewsCard
            article={article}
            key={article.id}
            isBig={index % 4 === 0 || index % 4 === 3}
          />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          basePath={`/${category}/${subcategory}`}
        />
      )}
    </div>
  );
}
