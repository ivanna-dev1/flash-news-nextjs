import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  let apiKey = process.env.GNEWS_API_KEY;

  try {
    const { id } = await params;
    const category = id.split("-")[0];
    let url =
      `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();

    if (!data.articles) {
      console.warn("The first key didn't work, we're trying a spare one...");
      apiKey = process.env.GNEWS_API_KEY_2;
      url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${apiKey}`;

      response = await fetch(url);
      data = await response.json();
    }

    const articles = data.articles.map((item, index) => ({
      id: category.toLowerCase() + "-" + (index + 1),
      title: item.title,
      description: item.description,
      image: item.image,
      category: "General",
      subCategory: "Latest",
      article: item.content || item.description,
      source: item.source.name,
      url: item.url,
    }))
    const article = articles.find((item) => item.id === id);

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
