
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") || "general";

  const categoryMapping: Record<string, string> = {
    general: "",
    sports: "sport",
    entertainment: "culture",
  };

  const guardianSection = categoryMapping[category.toLowerCase()] !== undefined ? categoryMapping[category.toLowerCase()] : category.toLowerCase();

  let apiKey = process.env.GUARDIAN_API_KEY;
  const sectionParam = guardianSection ? `section=${guardianSection}&` : "";
  let url = `https://content.guardianapis.com/search?${sectionParam}show-fields=all&api-key=${apiKey}`;

  try {
    let response = await fetch(url);
    let data = await response.json();
    // Додаємо перевірку: якщо статей немає, викидаємо помилку з текстом від GNews
    if (!data.response || !data.response.results) {
      console.warn("The first key didn't work, we're trying a spare one...");
      apiKey = process.env.GUARDIAN_API_KEY_2;
      url = `https://content.guardianapis.com/search?${sectionParam}show-fields=all&api-key=${apiKey}`;

      response = await fetch(url);
      data = await response.json();
    }
    // Остання перевірка: якщо і другий ключ не допоміг
    if (!data.response || !data.response.results) {
      return NextResponse.json(
        { error: "All limits have been exceeded" },
        { status: 429 },

      );
    }
    const articles = data.response.results.map((item: any) => ({
      id: encodeURIComponent(item.id),
      title: item.webTitle,
      description: item.fields?.trailText,
      image: item.fields?.thumbnail || "/mainIMG_2.jpg",
      category: category.charAt(0).toUpperCase() + category.slice(1),
      subcategory: "Latest",
      article: item.fields?.body || item.fields?.trailText,
      source: { name: "The Guardian", url: "https://www.theguardian.com" },
      url: item.webUrl,
      publishedAt: item.webPublicationDate,
    }));
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 },
    );
  }
}
