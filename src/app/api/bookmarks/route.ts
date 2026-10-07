import { z } from "zod";
import { getCurrentUser, unauthorized } from "@/lib/dal";
import { addBookmark, listBookmarks } from "@/lib/bookmarks";
import { decodeGuardianId } from "@/lib/guardianId";

// PostgreSQL does not accept the zero character in text: without this check
// "%00" in a body gives a 500 from the database instead of our 400.
const noZeroChar = (s: string) => !s.includes("\u0000");

// Limits only stop junk and huge bodies. Real Guardian values are much shorter.
const bookmarkSchema = z.object({
  // Cards send the URL-encoded id; we keep the original Guardian id in the database.
  articleId: z
    .string()
    .trim()
    .min(1)
    .max(300)
    .transform((id, ctx) => {
      const decoded = decodeGuardianId(id);
      if (decoded !== null) return decoded;
      ctx.addIssue({ code: "custom", message: "Bad article id" });
      return z.NEVER;
    })
    .refine(noZeroChar),
  title: z.string().trim().min(1).max(500).refine(noZeroChar),
  // May contain HTML from Guardian (we render it).
  description: z.string().max(3000).refine(noZeroChar).default(""),
  image: z.url({ protocol: /^https?$/ }).max(1000).refine(noZeroChar).nullable().default(null),
  sectionId: z.string().trim().min(1).max(100).refine(noZeroChar),
});

// GET /api/bookmarks — my bookmarks, newest first.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  const bookmarks = await listBookmarks(user.id);
  return Response.json({ bookmarks });
}

// POST /api/bookmarks — save an article.
// 201 = new bookmark, 200 = the article was already saved.
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return unauthorized();

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Body must be JSON" }, { status: 400 });
  }

  const parsed = bookmarkSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "Invalid data", details: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }

  const { bookmark, created } = await addBookmark(user.id, parsed.data);
  return Response.json({ bookmark }, { status: created ? 201 : 200 });
}
