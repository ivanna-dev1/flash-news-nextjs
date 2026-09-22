import Link from "next/link";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  basePath: string;
  // Other params of the address (for example a search text later).
  // We keep them, so a page change does not lose them.
  searchParams?: Record<string, string>;
}

// How many page numbers we show on each side of the current page.
const SIDE_PAGES = 2;

// Page numbers to show, for example [1, "...", 4, 5, 6, 7, 8, "...", 100].
// Guardian has thousands of pages, so we cannot show all of them.
function getVisiblePages(currentPage: number, totalPages: number): (number | "...")[] {
  const start = Math.max(2, currentPage - SIDE_PAGES);
  const end = Math.min(totalPages - 1, currentPage + SIDE_PAGES);
  const pages: (number | "...")[] = [1];
  if (start > 2) pages.push("...");
  for (let page = start; page <= end; page++) pages.push(page);
  if (end < totalPages - 1) pages.push("...");
  if (totalPages > 1) pages.push(totalPages);
  return pages;
}

export default function Pagination({
  totalPages,
  currentPage,
  basePath,
  searchParams = {},
}: PaginationProps) {
  const pageHref = (page: number) => {
    const params = new URLSearchParams(searchParams);
    // Page 1 is the normal address without "?page=1".
    if (page === 1) params.delete("page");
    else params.set("page", String(page));
    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  return (
    <nav className="py-3 text-center mt-5">
      <ul className="flex flex-wrap justify-center gap-1">
        {currentPage > 1 && (
          <li>
            <Link
              href={pageHref(currentPage - 1)}
              className="px-4 py-2 rounded  bg-gray-200 text-black"
            >
              &lt;prev
            </Link>
          </li>
        )}
        {getVisiblePages(currentPage, totalPages).map((page, index) =>
          page === "..." ? (
            <li key={`dots-${index}`} className="px-2 py-2 text-gray-500">
              ...
            </li>
          ) : (
            <li key={page}>
              <Link
                href={pageHref(page)}
                className={`px-4 py-2 rounded  ${currentPage === page
                    ? "bg-blue-900/90 text-white"
                    : "bg-gray-200 text-black"
                  }`}
              >
                {page}
              </Link>
            </li>
          ),
        )}
        {currentPage < totalPages && (
          <li>
            <Link
              href={pageHref(currentPage + 1)}
              className="px-4 py-2 rounded  bg-gray-200 text-black"
            >
              next&gt;
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
