import { NextResponse } from "next/server";
import { news } from "./arrayFakeNews.js";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return NextResponse.json(news);
}
