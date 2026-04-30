import BigNewsCard from "@/components/BigNewsCard";
// import { news } from "../../arrayFakeNews.js";
import Pagination from "@/components/Pagination";
export default async function Home({ searchParams }) {
  const sp = await searchParams;
  const response = await fetch("http://localhost:3000/api/news");
  const news = await response.json();

  const currentPage = Number(sp.page) || 1;
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentNews = news.slice(startIndex, endIndex);
  const totalPages = Math.ceil(news.length / itemsPerPage);
  return (
    <div>
      <p className="text-center text-3xl text-black mb-5 font-gelasio font-medium">
        Stay informed with the latest news from around the world. We bring you
        accurate, timely, and relevant stories every day.
      </p>
      <div className="flex flex-col gap-6  ">
        <div className="flex flex-col flex-2 gap-2">
          {currentNews.map((article) => (
            <BigNewsCard article={article} key={article.id} />
          ))}
        </div>
      </div>
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
