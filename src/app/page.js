import Image from "next/image";
import SmallNewsCard from "@/components/SmallNewsCard";
import BigNewsCard from "@/components/BigNewsCard";
import { news } from "../../arrayFakeNews.js";
import WeatherCard from "@/components/WeatherCard";
import CategoryBar from "@/components/CategoryBar";


export default function Home() {
  return (
    <div>
      {/* <h1>Home</h1> */}
      <CategoryBar />
      <p className="text-center text-3xl font-medium text-black my-5">
        Stay informed with the latest news from around the world.
        <br /> We bring you accurate, timely, and relevant stories every day.
      </p>
      <div className="flex flex-col gap-6 md:flex-row ">
        <div className="flex flex-col flex-2 gap-2">
          {news.map((article) => (
            <BigNewsCard article={article} key={article.id} />
          ))}
        </div>
        {/* <div className="hidden md:grid grid-cols-2 flex-1 gap-2 items-start content-start">
          <WeatherCard image="/weatherIMG.webp" />
          {news.map((article) => (
            <SmallNewsCard article={article} key={article.id} />
          ))}
        </div> */}
      </div>
    </div>
  );
}
