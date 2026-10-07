import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import CategoryNewsCard from "@/components/CategoryNewsCard";
import { SearchIcon } from "@/components/HeaderIcons";
import Pagination, { pageHref } from "@/components/Pagination";
import { popularSearches } from "@/data/popularSearches";
import { CATEGORY_PAGE_SIZE, getNewsPage } from "@/lib/getNews";

interface SearchPageProps {
  searchParams: Promise<{ q?: string | string[]; page?: string | string[] }>;
}

const MAX_SEARCH_LENGTH = 200;

function toSearchText(raw: string | string[] | undefined): string {
  const text = Array.isArray(raw) ? raw[0] : raw;
  return (text ?? "").trim().slice(0, MAX_SEARCH_LENGTH);
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const searchText = toSearchText((await searchParams).q);
  return {
    title: searchText ? `Search: ${searchText}` : "Search",
    // Endless result pages, each one costs a Guardian request.
    robots: { index: false },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const sp = await searchParams;
  const searchText = toSearchText(sp.q);

  if (!searchText) {
    return (
      <div>
        <Breadcrumbs title="Search" />
        <h3 className="text-3xl font-semibold text-center text-gray-700 p-1 mb-5">Search</h3>
        <PopularSearches title="Popular searches" />
      </div>
    );
  }

  const { articles, totalPages, currentPage, needsRedirect } = await getNewsPage(
    undefined,
    sp.page,
    CATEGORY_PAGE_SIZE,
    searchText,
  );
  if (needsRedirect) redirect(pageHref("/search", currentPage, { q: searchText }));

  return (
    <div>
      <Breadcrumbs title={searchText} />
      <h3 className="text-3xl font-semibold text-center text-gray-700 p-1 mb-5 break-words">
        Search: {searchText}
      </h3>

      {articles.length === 0 ? (
        <>
          <p className="text-center text-gray-500 mt-10 mb-6">
            Nothing found. Try other words or one of these:
          </p>
          <PopularSearches title="Popular searches" />
        </>
      ) : (
        <div className="flex flex-col md:grid grid-cols-5 flex-1 gap-2 items-start content-start">
          {articles.map((article, index) => (
            <CategoryNewsCard
              article={article}
              key={article.id}
              isBig={index % 4 === 0 || index % 4 === 3}
            />
          ))}
        </div>
      )}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          basePath="/search"
          searchParams={{ q: searchText }}
        />
      )}
    </div>
  );
}

function PopularSearches({ title }: { title?: string }) {
  return (
    <ul className="max-w-sm mx-auto py-1 border border-gray-300 rounded bg-white">
      {title && <li className="px-3 pt-1 pb-1 text-sm text-gray-500">{title}</li>}
      {popularSearches.map((text) => (
        <li key={text}>
          <Link
            href={`/search?q=${encodeURIComponent(text)}`}
            className="flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
          >
            <SearchIcon className="h-4 shrink-0 text-gray-400" />
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
}
