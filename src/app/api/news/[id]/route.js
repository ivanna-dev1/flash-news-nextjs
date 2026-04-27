import { NextResponse } from "next/server";
import { news } from "../arrayFakeNews.js";

export async function GET(request, { params }) {
  const { id } = await params;
  const article = news.find((item) => item.id === Number(id));
  await new Promise((resolve) => setTimeout(resolve, 2000));
  if (!article) {
    return NextResponse.json({ error: "Article not found" }, { status: 404 });
  }

  return NextResponse.json(article);
}
