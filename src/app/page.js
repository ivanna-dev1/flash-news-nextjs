import Image from "next/image";
import SmallNewsCard from "@/components/SmallNewsCard";
import BigNewsCard from "@/components/BigNewsCard";
import { news } from "../../arrayFakeNews.js";

export default function Home() {
  return (
    <div>
      <p className="text-center text-3xl text-black mb-5 font-gelasio font-medium">
        Stay informed with the latest news from around the world. We bring you
        accurate, timely, and relevant stories every day.
      </p>
      <div className="flex flex-col gap-6  ">
        <div className="flex flex-col flex-2 gap-2">
          {news.map((article) => (
            <BigNewsCard article={article} key={article.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
