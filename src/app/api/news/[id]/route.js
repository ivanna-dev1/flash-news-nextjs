import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const apiKey = process.env.GNEWS_API_KEY;
  const url =
    "https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=" +
    apiKey;
  try {
    const { id } = await params;
    const response = await fetch(url);
    const data = await response.json();
    const articles = data.articles.map((item, index) => ({
      id: index + 1,
      title: item.title,
      description: item.description,
      image: item.image,
      category: "General",
      subCategory: "Latest",
      article: item.content || item.description,
      source: item.source.name,
    }));
    const article = articles.find((item) => item.id === Number(id));
    // return NextResponse.json(articles[Number(id) - 1]);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 },
    );
  }
}
