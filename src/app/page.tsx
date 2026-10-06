import type { Metadata } from "next";
import BigNewsCard from "@/components/BigNewsCard";
import { redirect } from "next/navigation";
import Pagination, { pageHref } from "@/components/Pagination";
import { getNewsPage } from "@/lib/getNews";

interface HomeProps {
  searchParams: Promise<{ page?: string | string[] }>;
}

export const metadata: Metadata = {
  // The layout title template doesn't apply to the page next to the layout.
  title: { absolute: "Latest news | FlashNews" },
  description: "Latest news from around the world, powered by The Guardian.",
};

export default async function Home({ searchParams }: HomeProps) {
  const sp = await searchParams;
  const { articles, totalPages, currentPage, needsRedirect } = await getNewsPage(
    undefined,
    sp.page,
  );
  if (needsRedirect) redirect(pageHref("/", currentPage));

  return (
    <div>
      <p className="text-center text-3xl text-black mb-5 font-gelasio font-medium">
        Stay informed with the latest news from around the world. We bring you
        accurate, timely, and relevant stories every day.
      </p>
      <div className="flex flex-col gap-6  ">
        <div className="flex flex-col flex-2 gap-2">
          {articles.map((article) => (
            <BigNewsCard article={article} key={article.id} />
          ))}
        </div>
      </div>
      {articles.length === 0 && (
        <p className="text-center text-gray-500 my-10">No news on this page.</p>
      )}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          basePath="/"
        />
      )}
    </div>
  );
}
