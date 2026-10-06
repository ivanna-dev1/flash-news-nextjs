import { NextResponse } from "next/server";
import { findCategory, findSubcategory, getMenuQuery } from "@/lib/categories";
import { getNewsList, PAGE_SIZE } from "@/lib/getNews";

// Used by the sidebar (useNews). Server pages call lib/getNews directly.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = findCategory(searchParams.get("category") || "general");
  const subcategorySlug = searchParams.get("subcategory");
  const subcategory =
    category && subcategorySlug ? findSubcategory(category, subcategorySlug) : undefined;

  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const pageSize = Math.min(50, Math.max(1, Number(searchParams.get("pageSize")) || PAGE_SIZE));

  try {
    const news = await getNewsList(getMenuQuery(category, subcategory), page, pageSize);
    return NextResponse.json(news);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 502 });
  }
}
