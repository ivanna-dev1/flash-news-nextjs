import { NextResponse } from "next/server";
import { news } from "./arrayFakeNews.js";

export async function GET() {
  return NextResponse.json(news);
}
