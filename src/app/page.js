import Image from "next/image";
import SmallNewsCard from "@/components/SmallNewsCard";
import BigNewsCard from "@/components/BigNewsCard";
import { news } from "../../arrayFakeNews.js";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
      </p>
      <div className="flex flex-col gap-2 md:flex-row">
        <div className="flex flex-col flex-2 gap-1">
          {news.map((article) => (
            <BigNewsCard article={article} key={article.id} />
          ))}
        </div>
        <div className="hidden md:flex flex-row flex-wrap flex-1 gap-1  justify-center lg:justify-start">
          {news.map((article) => (
            <SmallNewsCard article={article} key={article.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
