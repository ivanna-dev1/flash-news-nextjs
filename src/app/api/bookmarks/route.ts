import { z } from "zod";
import { getCurrentUser } from "@/lib/dal";
import { addBookmark, listBookmarks } from "@/lib/bookmarks";

// Limits only stop junk and huge bodies. Real Guardian values are much shorter.
const bookmarkSchema = z.object({
  // Cards send the URL-encoded id; we keep the original Guardian id in the database.
  articleId: z
    .string()
    .trim()
    .min(1)
    .max(300)
    .transform((id, ctx) => {
      try {
        return decodeURIComponent(id);
      } catch {
        ctx.addIssue({ code: "custom", message: "Bad article id" });
        return z.NEVER;
      }
    }),
  title: z.string().trim().min(1).max(500),
  // May contain HTML from Guardian (we render it).
  description: z.string().max(3000).default(""),
  image: z.url({ protocol: /^https?$/ }).max(1000).nullable().default(null),
  sectionId: z.string().trim().min(1).max(100),
});

const notSignedIn = () => Response.json({ error: "Not signed in" }, { status: 401 });

// GET /api/bookmarks — my bookmarks, newest first.
export async function GET() {
  const user = await getCurrentUser();
  if (!user) return notSignedIn();

  const bookmarks = await listBookmarks(user.id);
  return Response.json({ bookmarks });
}

// POST /api/bookmarks — save an article.
// 201 = new bookmark, 200 = the article was already saved.
export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user) return notSignedIn();

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
