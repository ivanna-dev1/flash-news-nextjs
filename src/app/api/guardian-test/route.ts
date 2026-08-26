import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GUARDIAN_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Ключ не знайдено' }, { status: 500 });
  }

  try {
    const url = `https://content.guardianapis.com/search?order-by=newest&show-fields=thumbnail,trailText,bodyText&api-key=${apiKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: 'Помилка від API' }, { status: response.status });
    }

    const results = data.response.results;
    const uniqueCategories = Array.from(new Set(results.map((item: any) => item.sectionName)));

    return NextResponse.json({
      message: "Тест успішний!",
      categories: uniqueCategories,
      firstArticleInfo: {
        title: results[0]?.webTitle,
        category: results[0]?.sectionName,
        hasPhoto: !!results[0]?.fields?.thumbnail,
        photoUrl: results[0]?.fields?.thumbnail,
      },
      rawFirstArticle: results[0]
    });

  } catch (error) {
    return NextResponse.json({ error: 'Внутрішня помилка' }, { status: 500 });
  }
}
