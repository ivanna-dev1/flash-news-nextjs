import { NextResponse } from "next/server";
import { getArticle } from "@/lib/getNews";

// One article as JSON. The article page does not use this route:
// it calls lib/getNews directly. The route stays for other clients.
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  // Here the id comes decoded ("film/2026/..."). getArticle works with both forms.
  const { id } = await params;

  try {
    const article = await getArticle(id);
    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }
    return NextResponse.json(article);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 502 });
  }
}
