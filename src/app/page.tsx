import type { Metadata } from "next";
import BigNewsCard from "@/components/BigNewsCard";
import Pagination from "@/components/Pagination";
import { getNewsList } from "@/lib/getNews";

interface HomeProps {
  searchParams: Promise<{ page?: string }>;
}

export const metadata: Metadata = {
  // The title template from layout.tsx does not work for a page in the same
  // folder as the layout, so we write the full title here.
  title: { absolute: "Latest news | FlashNews" },
  description: "Latest news from around the world, powered by The Guardian.",
};

export default async function Home({ searchParams }: HomeProps) {
  const sp = await searchParams;
  const currentPage = Math.max(1, Number(sp.page) || 1);
  // No query = all latest news, the same as the General category.
  const { articles, totalPages } = await getNewsList(undefined, currentPage);

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
