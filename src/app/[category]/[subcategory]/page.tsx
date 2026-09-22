import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryNewsCard from "@/components/CategoryNewsCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination from "@/components/Pagination";
import { findCategory, findSubcategory, getMenuQuery } from "@/lib/categories";
import { getNewsList } from "@/lib/getNews";

interface SubcategoryPageProps {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: SubcategoryPageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const currentCategory = findCategory(category);
  if (!currentCategory) return { title: "Page not found" };
  const currentSubcategory = findSubcategory(currentCategory, subcategory);
  const name = currentSubcategory?.name ?? currentCategory.name;
  return {
    title: `${name} news`,
    description: `Latest ${name.toLowerCase()} news from The Guardian.`,
  };
}

export default async function SubcategoryPage({ params, searchParams }: SubcategoryPageProps) {
  const { category, subcategory } = await params;

  // The category is not in our menu -> 404: there is nothing to show.
  const currentCategory = findCategory(category);
  if (!currentCategory) notFound();

  // The subcategory is not in our menu -> we do not show 404.
  // We show all news of the category and a short note about it.
  const currentSubcategory = findSubcategory(currentCategory, subcategory);

  const sp = await searchParams;
  const currentPage = Math.max(1, Number(sp.page) || 1);
  const { articles, totalPages } = await getNewsList(
    getMenuQuery(currentCategory, currentSubcategory),
    currentPage,
  );

  return (
    <div>
      <Breadcrumbs category={currentCategory} subcategory={currentSubcategory} />
      {!currentSubcategory && (
        <p className="text-center text-gray-500 mt-3">
          There is no &quot;{subcategory}&quot; section in {currentCategory.name}. Here are
          all {currentCategory.name} news.
        </p>
      )}
      <h3 className="text-3xl font-semibold text-center text-gray-700 p-1 mb-5">
        {(currentSubcategory ?? currentCategory).name} news
      </h3>
      <div className="md:grid grid-cols-5  flex-1  gap-3 items-start content-start ">
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
          basePath={`/${category}/${subcategory}`}
        />
      )}
    </div>
  );
}
