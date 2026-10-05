import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import CategoryNewsCard from "@/components/CategoryNewsCard";
import Breadcrumbs from "@/components/Breadcrumbs";
import Pagination, { pageHref } from "@/components/Pagination";
import { findCategory, findSubcategory, getMenuQuery } from "@/lib/categories";
import { CATEGORY_PAGE_SIZE, getNewsPage } from "@/lib/getNews";

interface SubcategoryPageProps {
  params: Promise<{ category: string; subcategory: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
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

  const currentCategory = findCategory(category);
  if (!currentCategory) notFound();

  // Unknown subcategory: show the category news with a note instead of a 404.
  const currentSubcategory = findSubcategory(currentCategory, subcategory);

  const sp = await searchParams;
  const { articles, totalPages, currentPage, needsRedirect } = await getNewsPage(
    getMenuQuery(currentCategory, currentSubcategory),
    sp.page,
    CATEGORY_PAGE_SIZE,
  );

  // Built from the config, not the URL, so links are always lowercase.
  const placePath = currentSubcategory
    ? `${currentCategory.slug}/${currentSubcategory.slug}`
    : currentCategory.slug;
  if (needsRedirect) redirect(pageHref(`/${placePath}`, currentPage));

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
      <div className="flex flex-col md:grid grid-cols-5 flex-1 gap-2 items-start content-start">
        {articles.map((article, index) => (
          <CategoryNewsCard
            article={article}
            key={article.id}
            isBig={index % 4 === 0 || index % 4 === 3}
            from={placePath}
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
          basePath={`/${placePath}`}
        />
      )}
    </div>
  );
}
