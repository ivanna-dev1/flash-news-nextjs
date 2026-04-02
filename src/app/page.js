import Image from "next/image";
import SmallNewsCard from "@/components/SmallNewsCard";
import BigNewsCard from "@/components/BigNewsCard";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
      </p>
      <SmallNewsCard />
      <BigNewsCard />
    </div>
  );
}
