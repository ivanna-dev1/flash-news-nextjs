import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "general";
  let apiKey = process.env.GNEWS_API_KEY;
  let url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=100&apikey=${apiKey}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    // Додаємо перевірку: якщо статей немає, викидаємо помилку з текстом від GNews
    if (!data.articles) {
      console.warn("The first key didn't work, we're trying a spare one...");
      apiKey = process.env.GNEWS_API_KEY_2;
      url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=100&apikey=${apiKey}`;

      response = await fetch(url);
      data = await response.json();
    }
    // Остання перевірка: якщо і другий ключ не допоміг
    if (!data.articles) {
      return NextResponse.json(
        { error: "All limits have been exceeded" },
        { status: 429 },

      );
    }
    const articles = data.articles.map((item, index) => ({
      id: category.toLowerCase() + "-" + (index + 1),
      title: item.title,
      description: item.description,
      image: item.image || "/mainIMG_2.jpg",
      category: category.charAt(0).toUpperCase() + category.slice(1),
      subCategory: "Latest",
      article: item.content || item.description,
      source: item.source.name,
      url: item.url,
    }));
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 },
    );
  }
}
