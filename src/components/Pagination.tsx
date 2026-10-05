import Link from "next/link";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  basePath: string;
  // Extra query params to keep, e.g. the search text.
  searchParams?: Record<string, string>;
}

// Page 1 has no ?page param.
export function pageHref(
  basePath: string,
  page: number,
  searchParams: Record<string, string> = {},
): string {
  const params = new URLSearchParams(searchParams);
  if (page === 1) params.delete("page");
  else params.set("page", String(page));
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

// Pages shown on each side of the current one (2 does not fit on 375px).
const SIDE_PAGES = 2;
const SIDE_PAGES_PHONE = 1;

// e.g. [1, "...", 4, 5, 6, 7, 8, "...", 100]
function getVisiblePages(
  currentPage: number,
  totalPages: number,
  sidePages: number,
): (number | "...")[] {
  const start = Math.max(2, currentPage - sidePages);
  const end = Math.min(totalPages - 1, currentPage + sidePages);
  const pages: (number | "...")[] = [1];
  if (start > 2) pages.push("...");
  for (let page = start; page <= end; page++) pages.push(page);
  if (end < totalPages - 1) pages.push("...");
  if (totalPages > 1) pages.push(totalPages);
  return pages;
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 10 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="h-3.5 w-auto"
    >
      <path d={direction === "left" ? "M8 1L2 8l6 7" : "M2 1l6 7-6 7"} />
    </svg>
  );
}

// Without flex a Link is inline and its padding takes no room.
const BOX = "flex items-center justify-center h-8 text-sm";
const NUMBER = `${BOX} min-w-7 px-1 sm:min-w-8 sm:px-1.5 rounded-md`;
const NUMBER_LINK = `${NUMBER} text-gray-700 hover:bg-gray-200 transition-colors`;
const NUMBER_OPEN = `${NUMBER} bg-slate-500 text-white`;
const ARROW = `${BOX} w-8 sm:w-9 rounded-full`;
const ARROW_LINK = `${ARROW} text-gray-600 hover:bg-gray-200 transition-colors`;
// Disabled arrow keeps the pill shape on the first/last page.
const ARROW_OFF = `${ARROW} text-gray-300`;
const DOTS = `${BOX} w-4 sm:w-6 text-gray-500`;

export default function Pagination({
  totalPages,
  currentPage,
  basePath,
  searchParams = {},
}: PaginationProps) {
  const hrefOf = (page: number) => pageHref(basePath, page, searchParams);

  const renderItems = (sidePages: number) => (
    <>
      <li className="pr-1 mr-1 border-r border-gray-300">
        {currentPage > 1 ? (
          <Link href={hrefOf(currentPage - 1)} aria-label="Previous page" className={ARROW_LINK}>
            <ChevronIcon direction="left" />
          </Link>
        ) : (
          <span className={ARROW_OFF}>
            <ChevronIcon direction="left" />
          </span>
        )}
      </li>
      {getVisiblePages(currentPage, totalPages, sidePages).map((page, index) =>
        page === "..." ? (
          <li key={`dots-${index}`} className={DOTS}>
            …
          </li>
        ) : (
          <li key={page}>
            <Link
              href={hrefOf(page)}
              aria-current={currentPage === page ? "page" : undefined}
              className={currentPage === page ? NUMBER_OPEN : NUMBER_LINK}
            >
              {page}
            </Link>
          </li>
        ),
      )}
      <li className="pl-1 ml-1 border-l border-gray-300">
        {currentPage < totalPages ? (
          <Link href={hrefOf(currentPage + 1)} aria-label="Next page" className={ARROW_LINK}>
            <ChevronIcon direction="right" />
          </Link>
        ) : (
          <span className={ARROW_OFF}>
            <ChevronIcon direction="right" />
          </span>
        )}
      </li>
    </>
  );

  // Two pills: a compact one for phones, a wider one from sm.
  // From md the pill is centered on the whole row (main + sidebar), not on main;
  // the row is `relative` in layout.tsx. h-16 reserves the space the absolute box doesn't take.
  const PILL =
    "items-center p-[3px] rounded-full bg-gray-100 border border-gray-300 shadow-sm";
  return (
    <nav aria-label="Pages" className="mt-5 h-16">
      <div className="py-3 text-center md:absolute md:left-0 md:right-0">
        <ul className={`inline-flex sm:hidden ${PILL}`}>{renderItems(SIDE_PAGES_PHONE)}</ul>
        <ul className={`hidden sm:inline-flex ${PILL}`}>{renderItems(SIDE_PAGES)}</ul>
      </div>
    </nav>
  );
}
