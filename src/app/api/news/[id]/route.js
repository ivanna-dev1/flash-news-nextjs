import { NextResponse } from "next/server";
import { news } from "../arrayFakeNews.js";

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const article = news.find((item) => item.id === Number(id));
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return NextResponse.json(article);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch article" },
      { status: 500 },
    );
  }
}
