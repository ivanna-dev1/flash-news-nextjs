import { news } from "../../../../arrayFakeNews";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs";

export default async function NewsPage({ params }) {
  const { id } = await params;
  const article = news.find((item) => item.id === Number(id));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div className="gap-2 m-5 ">
      <Breadcrumbs
        className="my-5 mx-5"
        category={article.category}
        subCategory={article.subcategory}
      />
      <h1 className="text-center text-3xl font-medium text-black ">
        {article.title}
      </h1>
      <div className="my-5 mx-5">
        <Image
          className=" float-left mr-6 mb-4 rounded-lg "
          src={article.image}
          alt="FlashNews"
          width={300}
          height={300}
        />
        <p className="text-lg text-gray-700 ">{article.article}</p>
      </div>
    </div>
  );
}
