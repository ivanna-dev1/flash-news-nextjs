import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "general";
  const apiKey = process.env.GNEWS_API_KEY;
  const url =
    "https://gnews.io/api/v4/top-headlines?category=" +
    category +
    "&lang=en&country=us&max=10&apikey=" +
    apiKey;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const articles = data.articles.map((item, index) => ({
      id: index + 1,
      title: item.title,
      description: item.description,
      image: item.image,
      category: category.charAt(0).toUpperCase() + category.slice(1),
      subCategory: "Latest",
      article: item.content || item.description,
      source: item.source.name,
    }));

    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 },
    );
  }
}
