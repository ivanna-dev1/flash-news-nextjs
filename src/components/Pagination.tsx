import Link from "next/link";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  basePath: string;
  // Other params of the address (for example a search text later).
  // We keep them, so a page change does not lose them.
  searchParams?: Record<string, string>;
}

// The address of one page of a list. Page 1 is the normal address
// without "?page=1". Pages also use it to redirect from a wrong page number.
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

// How many page numbers we show on each side of the current page.
// A phone has room for fewer buttons: with 2 the row did not fit on 375px.
const SIDE_PAGES = 2;
const SIDE_PAGES_PHONE = 1;

// Page numbers to show, for example [1, "...", 4, 5, 6, 7, 8, "...", 100].
// Guardian has thousands of pages, so we cannot show all of them.
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

// Chevron icons for the "previous" and "next" buttons. SVG, not the text
// "<" and ">": a text symbol looks different in every font.
// Only this file uses them, so they live here.
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

// The look (Ivanna's choice): one light grey "pill" with all the pages
// inside. The numbers have no own background; the open page is a grey
// square with white text. The arrows stand at the two ends of the pill,
// with a thin line between them and the numbers.
// Sizes: the whole pill is 40px high, like the scroll buttons (Ivanna's
// choice). On a phone the boxes are narrower, so the pill fits even on
// 320px (a number like "100" makes its box wider). flex + items-center puts the number or the icon in the centre.
// A Link is an inline element: without flex its padding would take no room.
const BOX = "flex items-center justify-center h-8 text-sm";
const NUMBER = `${BOX} min-w-7 px-1 sm:min-w-8 sm:px-1.5 rounded-md`;
const NUMBER_LINK = `${NUMBER} text-gray-700 hover:bg-gray-200 transition-colors`;
const NUMBER_OPEN = `${NUMBER} bg-slate-500 text-white`;
// The arrows are round, like the ends of the pill.
const ARROW = `${BOX} w-8 sm:w-9 rounded-full`;
const ARROW_LINK = `${ARROW} text-gray-600 hover:bg-gray-200 transition-colors`;
// On the first and the last page one arrow has nowhere to go. We still
// show it (light grey, not a link): then the pill keeps the same shape.
const ARROW_OFF = `${ARROW} text-gray-300`;
// "…" is not a button, so on a phone it takes less room.
const DOTS = `${BOX} w-4 sm:w-6 text-gray-500`;

export default function Pagination({
  totalPages,
  currentPage,
  basePath,
  searchParams = {},
}: PaginationProps) {
  const hrefOf = (page: number) => pageHref(basePath, page, searchParams);

  // One row of the pill: previous, page numbers, next.
  const renderItems = (sidePages: number) => (
    <>
      {/* border-r: the thin line between the arrow and the numbers. */}
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
              // aria-current tells a screen reader which page is open.
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

  // Two pills, only one is visible: the short one on a phone, the long one
  // from 640px. The hidden one has display: none, so screen readers skip it.
  // inline-flex: the pill is as wide as its content, and text-center puts
  // it in the centre.
  // Centre of the whole page (Ivanna's choice), not of the main column:
  // from md the sidebar stands on the right, so the centre of main is to
  // the left of the page centre. So from md the inner box is absolute with
  // left-0 right-0 - as wide as the row with main and the sidebar (it is
  // "relative" in layout.tsx). Without "top" it stays at its normal height.
  // An absolute box takes no room, so the nav keeps the room itself: h-16
  // = 12px + 40px pill + 12px. The sidebar is never longer than 2/3 of
  // main, so the pill never covers its cards.
  // p-[3px] + 1px border + 32px boxes = 40px high.
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
