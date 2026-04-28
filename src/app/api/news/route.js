import { NextResponse } from "next/server";
import { news } from "./arrayFakeNews.js";

export async function GET() {
  try {
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 },
    );
  }
}
