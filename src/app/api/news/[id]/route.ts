import { NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  let apiKey = process.env.GUARDIAN_API_KEY;

  try {
    const { id } = await params;
    const decodedId = decodeURIComponent(id);
    let url = `https://content.guardianapis.com/${decodedId}?show-fields=all&api-key=${apiKey}`;
    let response = await fetch(url);
    let data = await response.json();

    if (!data.response.content) {
      console.warn("The first key didn't work, we're trying a spare one...");
      apiKey = process.env.GUARDIAN_API_KEY_2;
      url = `https://content.guardianapis.com/${decodedId}?show-fields=all&api-key=${apiKey}`;

      response = await fetch(url);
      data = await response.json();
    }

    // Витягуємо статтю з відповіді Guardian
    const item = data.response.content;

    // Перевіряємо чи стаття взагалі знайшлася
    if (!item) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    // Робимо ремапінг (точно як ти робила в попередньому файлі, але для одного об'єкта)
    const article = {
      id: encodeURIComponent(item.id),
      title: item.webTitle,
      description: item.fields?.trailText,
      image: item.fields?.thumbnail || "/mainIMG_2.jpg",
      category: item.sectionName, // Раніше тут було "General", тепер беремо реальну категорію
      subcategory: "Latest",
      article: item.fields?.body || item.fields?.trailText,
      source: { name: "The Guardian", url: "https://www.theguardian.com" },
      url: item.webUrl,
      publishedAt: item.webPublicationDate,
    };

    // Повертаємо одну статтю, а не масив
    return NextResponse.json(article);

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 },
    );
  }
}
