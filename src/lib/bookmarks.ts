import "server-only";
import { Prisma, type Bookmark } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

// userId always comes from the checked session (getCurrentUser), never from the request body.
// Every query has userId in "where", so one user can never read or change another user's bookmarks.

export interface BookmarkInput {
  articleId: string;
  title: string;
  description: string;
  image: string | null;
  sectionId: string;
}

export function listBookmarks(userId: string): Promise<Bookmark[]> {
  return prisma.bookmark.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

// created: false when the article was already saved (double click, two tabs).
export async function addBookmark(
  userId: string,
  data: BookmarkInput,
): Promise<{ bookmark: Bookmark; created: boolean }> {
  try {
    const bookmark = await prisma.bookmark.create({ data: { userId, ...data } });
    return { bookmark, created: true };
  } catch (error) {
    // P2002 = unique constraint failed. The database checks @@unique([userId, articleId]),
    // so two requests at the same time cannot both create a row.
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      const bookmark = await prisma.bookmark.findUniqueOrThrow({
        where: { userId_articleId: { userId, articleId: data.articleId } },
      });
      return { bookmark, created: false };
    }
    throw error;
  }
}

// false when there is no such bookmark for this user (wrong id or another user's id).
export async function removeBookmark(userId: string, id: string): Promise<boolean> {
  const { count } = await prisma.bookmark.deleteMany({ where: { id, userId } });
  return count > 0;
}
