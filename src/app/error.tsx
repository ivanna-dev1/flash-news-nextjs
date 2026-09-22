"use client"; // Error boundaries must be Client Components

import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  // Next.js 16: loads the data again and draws the page again.
  unstable_retry: () => void;
}

// Shown when a page throws an error, for example Guardian API is down.
// Header, menu and footer stay on the screen: they are in layout.tsx.
export default function Error({ error, unstable_retry }: ErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[400px] text-gray-700">
      <h2 className="text-3xl font-semibold">Something went wrong</h2>
      <p>We could not load the news. Please try again.</p>
      <button
        className="border border-gray-500 hover:bg-gray-100 cursor-pointer px-4 py-2 rounded"
        onClick={() => unstable_retry()}
      >
        Try again
      </button>
    </div>
  );
}
