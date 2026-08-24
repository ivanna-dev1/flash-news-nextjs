import Link from "next/link";

export default function Pagination({ totalPages, currentPage, basePath }) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="py-3 text-center mt-5">
      <ul className="flex justify-center gap-1">
        {currentPage > 1 && (
          <li>
            <Link
              href={`${basePath}?page=${currentPage - 1}`}
              className="px-4 py-2 rounded  bg-gray-200 text-black"
            >
              &lt;prev
            </Link>
          </li>
        )}
        {pages.map((page) => (
          <li key={page}>
            <Link
              href={`${basePath}?page=${page}`}
              className={`px-4 py-2 rounded  ${
                currentPage === page
                  ? "bg-blue-900/90 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {page}
            </Link>
          </li>
        ))}
        {currentPage < totalPages && (
          <li>
            <Link
              href={`${basePath}?page=${currentPage + 1}`}
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
