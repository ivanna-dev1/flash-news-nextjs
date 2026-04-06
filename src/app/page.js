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
      <SmallNewsCard article={news[1]} />
      <BigNewsCard article={news[0]} />
    </div>
  );
}
