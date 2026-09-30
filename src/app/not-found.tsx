import Link from "next/link";

// Shown for every notFound() call and for any unknown address.
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[400px] text-gray-700">
      <h2 className="text-3xl font-semibold">Page not found</h2>
      <p>Sorry, we could not find this page.</p>
      <Link className="text-blue-900 hover:underline" href="/">
        Back to the home page
      </Link>
    </div>
  );
}
