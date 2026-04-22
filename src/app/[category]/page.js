import React from "react";
import { news } from "../../../arrayFakeNews.js";
import CategoryNewsCard from "@/components/CategoryNewsCard";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const categoryNews = news.filter((item) => item.category === category);
  const filteredNews = categoryNews.filter(
    (item) => item.category === category,
  );

  return (
    <div>
      <Breadcrumbs category={category} />
      <h3 className=" text-3xl font-semibold text-center text-gray-700 p-1 mb-5 ">
        {category} News
      </h3>
      <div className="md:grid grid-cols-2 flex-1  gap-2 items-start content-start ">
        {filteredNews.map((article) => (
          <CategoryNewsCard article={article} key={article.id} />
        ))}
      </div>
    </div>
  );
}
