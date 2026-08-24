import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  let apiKey = process.env.GNEWS_API_KEY;
  let url =
    "https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=" +
    apiKey;
  try {
    const { id } = await params;
    let response = await fetch(url);
    let data = await response.json();

    if (!data.articles) {
      console.warn("The first key didn't work, we're trying a spare one...");
      apiKey = process.env.GNEWS_API_KEY_2;
      url = `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=us&max=10&apikey=${apiKey}`;

      response = await fetch(url);
      data = await response.json();
    }

    const articles = data.articles.map((item, index) => ({
      id: index + 1,
      title: item.title,
      description: item.description,
      image: item.image,
      category: "General",
      subCategory: "Latest",
      article: item.content || item.description,
      source: item.source.name,
      url: item.url,
    }));
    const article = articles.find((item) => item.id === Number(id));

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
