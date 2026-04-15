import { news } from "../../../../arrayFakeNews";

export default async function NewsPage({ params }) {
  const { id } = await params;
  const article = news.find((item) => item.id === Number(id));

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">{article.title}</h1>
      <p className="text-lg">{article.article}</p>
    </div>
  );
}
