import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryNewsCard from "@/components/CategoryNewsCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import { findCategory } from "@/lib/categories";
import { getNewsList } from "@/lib/getNews";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  const currentCategory = findCategory(category);
  if (!currentCategory) return { title: "Page not found" };
  return {
    title: `${currentCategory.name} news`,
    description: `Latest ${currentCategory.name.toLowerCase()} news from The Guardian.`,
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { category } = await params;
  const currentCategory = findCategory(category);
  // The category is not in our menu (arrayCategory.ts) -> 404.
  if (!currentCategory) notFound();

  const sp = await searchParams;
  const currentPage = Math.max(1, Number(sp.page) || 1);
  const { articles, totalPages } = await getNewsList(currentCategory.query, currentPage);

  return (
    <div>
      <Breadcrumbs category={currentCategory} />
      <h3 className="text-3xl font-semibold text-center text-gray-700 p-1 mb-5">
        {currentCategory.name} news
      </h3>

      <div className="md:grid grid-cols-5 flex-1  gap-3 items-start content-start ">
        {articles.map((article, index) => (
          <CategoryNewsCard
            article={article}
            key={article.id}
            isBig={index % 4 === 0 || index % 4 === 3}
          />
        ))}
      </div>
      {articles.length === 0 && (
        <p className="text-center text-gray-500 my-10">No news on this page.</p>
      )}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          basePath={`/${currentCategory.slug}`}
        />
      )}
    </div>
  );
}
