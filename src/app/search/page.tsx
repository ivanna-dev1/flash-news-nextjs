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
  // Two "q" or "page" in the address (?q=a&q=b) give an array.
  searchParams: Promise<{ q?: string | string[]; page?: string | string[] }>;
}

// Longer text is cut. Nobody searches with 200 letters, and a very long
// "q" is only a way to send junk to Guardian.
const MAX_SEARCH_LENGTH = 200;

// "?q=  ukraine " -> "ukraine". No text -> "".
function toSearchText(raw: string | string[] | undefined): string {
  const text = Array.isArray(raw) ? raw[0] : raw;
  return (text ?? "").trim().slice(0, MAX_SEARCH_LENGTH);
}

// The search page is in the "search" folder, not in [category]: a folder
// with a fixed name wins over [category], so /search never becomes a
// category (and never a 404).
const searchCrumb = { name: "Search", slug: "search" };

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const searchText = toSearchText((await searchParams).q);
  return {
    title: searchText ? `Search: ${searchText}` : "Search",
    // Search results are not pages for Google: there are endless of them,
    // and each one is a request to Guardian. See also robots.ts.
    robots: { index: false },
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const sp = await searchParams;
  const searchText = toSearchText(sp.q);

  // No text: no request to Guardian. Only the popular searches.
  if (!searchText) {
    return (
      <div>
        <Breadcrumbs category={searchCrumb} />
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
  // A wrong page number in the address: go to the page we really show.
  // The search text stays in the address.
  if (needsRedirect) redirect(pageHref("/search", currentPage, { q: searchText }));

  return (
    <div>
      {/* Home / Search / ukraine - the text is cut with "..." if it is long. */}
      <Breadcrumbs category={searchCrumb} title={searchText} />
      {/* break-words: one very long word must not go out of the page. */}
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
        // The same grid as on a category page (Ivanna's choice).
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

// The popular searches as a list, one under another - the same as under
// the search box in the header, only in light colours for the white page.
function PopularSearches({ title }: { title?: string }) {
  return (
    // max-w-sm mx-auto: a narrow list in the middle of the page, like the
    // list under the header input (not as wide as the whole page).
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
