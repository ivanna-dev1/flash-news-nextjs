import { getCurrentUser } from "@/lib/dal";
import { removeBookmark } from "@/lib/bookmarks";

// DELETE /api/bookmarks/<bookmark id> — remove a bookmark.
// We use the bookmark id, not the Guardian id: Guardian ids contain slashes.
// 404 for a wrong id and for another user's bookmark (we do not say which one).
export async function DELETE(_request: Request, ctx: RouteContext<"/api/bookmarks/[id]">) {
  const user = await getCurrentUser();
  if (!user) return Response.json({ error: "Not signed in" }, { status: 401 });

  const { id } = await ctx.params;
  const removed = await removeBookmark(user.id, id);
  if (!removed) return Response.json({ error: "Bookmark not found" }, { status: 404 });

  return Response.json({ id });
}
