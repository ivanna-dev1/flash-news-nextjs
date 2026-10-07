import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import { postBookmark } from "@/lib/bookmarkClient";
import { decodeGuardianId } from "@/lib/guardianId";
import { GUEST_PREFIX, readGuestBookmarks, writeGuestBookmarks } from "@/lib/guestBookmarks";
import type { ArticleType, SavedArticleType } from "@/types/news";

// Card ids are URL-encoded, the database keeps the original Guardian id.
const toGuardianId = (id: string) => decodeGuardianId(id) ?? id;

// A bookmark that the server has not confirmed yet.
const TEMP_PREFIX = "temp:";

// Without this check an error answer would look like normal data.
async function check<T>(response: Promise<Response>): Promise<T> {
  const r = await response;
  if (!r.ok) throw new Error(`Bookmarks request failed: ${r.status}`);
  return r.json();
}

const toBookmark = (article: ArticleType, id: string): SavedArticleType => ({
  id,
  articleId: toGuardianId(article.id),
  title: article.title,
  description: article.description,
  image: article.image || null,
  sectionId: article.sectionId,
  createdAt: new Date().toISOString(),
});

// One list for the whole page: every card reads the same cache, so the page
// makes one GET /api/bookmarks, not one request per card.
// Signed in: the list is on the server. Guest: in localStorage. Only the
// queryFn and mutationFn differ; the cards do not know where the list lives.
export default function useBookmarks() {
  const queryClient = useQueryClient();
  const { data: session, isPending: isSessionPending } = useSession();
  const userId = session?.user.id;
  const isGuest = !isSessionPending && !userId;
  // The user id is in the key, so after a switch of accounts the old list is not shown.
  const queryKey = ["bookmarks", userId ?? "guest"];

  const { data: bookmarks = [], isLoading, isError, refetch } = useQuery({
    queryKey,
    queryFn: async () =>
      isGuest
        ? readGuestBookmarks()
        : (await check<{ bookmarks: SavedArticleType[] }>(fetch("/api/bookmarks"))).bookmarks,
    // Until we know who it is, we do not know where to read from.
    enabled: !isSessionPending,
  });

  // Optimistic update: change the cached list first, send the request after.
  // After the request (success or error) reload the list: on error this puts the
  // icon back. Reload only after the last running change, or an early GET could
  // undo a change that is still on its way (two quick clicks on two cards).
  const optimistic = {
    mutationKey: ["bookmarks"],
    onSettled: () => {
      if (queryClient.isMutating({ mutationKey: ["bookmarks"] }) === 1) {
        return queryClient.invalidateQueries({ queryKey });
      }
    },
  };

  async function changeList(change: (list: SavedArticleType[]) => SavedArticleType[]) {
    // Stop a running GET, or its old answer would overwrite our change.
    await queryClient.cancelQueries({ queryKey });
    queryClient.setQueryData<SavedArticleType[]>(queryKey, (list = []) => change(list));
  }

  const save = useMutation({
    mutationFn: async (article: ArticleType) => {
      if (isGuest) {
        const bookmark = toBookmark(article, GUEST_PREFIX + toGuardianId(article.id));
        const others = readGuestBookmarks().filter((b) => b.articleId !== bookmark.articleId);
        return writeGuestBookmarks([bookmark, ...others]);
      }
      return check(postBookmark(toBookmark(article, "")));
    },
    onMutate: (article) =>
      changeList((list) => [toBookmark(article, TEMP_PREFIX + article.id), ...list]),
    ...optimistic,
  });

  const remove = useMutation({
    mutationFn: async (bookmarkId: string) => {
      if (isGuest) {
        return writeGuestBookmarks(readGuestBookmarks().filter((b) => b.id !== bookmarkId));
      }
      return check(fetch(`/api/bookmarks/${bookmarkId}`, { method: "DELETE" }));
    },
    onMutate: (bookmarkId) => changeList((list) => list.filter((b) => b.id !== bookmarkId)),
    ...optimistic,
  });

  const findBookmark = (articleId: string) => {
    const guardianId = toGuardianId(articleId);
    return bookmarks.find((b) => b.articleId === guardianId);
  };

  const toggle = (article: ArticleType) => {
    const bookmark = findBookmark(article.id);
    if (!bookmark) return save.mutate(article);
    // Not saved yet: there is no real id to delete.
    if (bookmark.id.startsWith(TEMP_PREFIX)) return;
    remove.mutate(bookmark.id);
  };

  return {
    // While true we do not know yet if the user is signed in.
    isSessionPending,
    isGuest,
    bookmarks,
    isLoading,
    isError,
    refetch,
    isSaved: (articleId: string) => !!findBookmark(articleId),
    toggle,
  };
}
