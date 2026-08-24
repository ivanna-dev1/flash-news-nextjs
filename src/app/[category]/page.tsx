import React from "react";

import CategoryNewsCard from "@/components/CategoryNewsCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import useNews from "@/hooks/useNews";
export default async function CategoryPage({ params, searchParams }) {
  const { category } = await params;
  const response = await fetch(
    `http://localhost:3000/api/news?category=${category}`,
  );
  const newsData = await response.json();
  const news = Array.isArray(newsData) ? newsData : [];

  const sp = await searchParams;
  const currentPage = Number(sp.page) || 1;
  const itemsPerPage = 4;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentNews = news.slice(startIndex, endIndex);
  const totalPages = Math.ceil(news.length / itemsPerPage);

  return (
    <div>
      <Breadcrumbs category={category} />
      <h3 className="text-3xl font-semibold text-center text-gray-700 p-1 mb-5 capitalize">
        {category} news
      </h3>

      <div className="md:grid grid-cols-5 flex-1  gap-3 items-start content-start ">
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
          basePath={`/${category}`}
        />
      )}
    </div>
  );
}
