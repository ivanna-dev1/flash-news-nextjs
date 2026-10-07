import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/lib/auth-client";
import type { ArticleType, SavedArticleType } from "@/types/news";

// Card ids are URL-encoded, the database keeps the original Guardian id.
const toGuardianId = (id: string) => decodeURIComponent(id);

// A bookmark that the server has not confirmed yet.
const TEMP_PREFIX = "temp:";

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  // Without this check an error answer would look like normal data.
  if (!response.ok) throw new Error(`Bookmarks request failed: ${response.status}`);
  return response.json();
}

// One list for the whole page: every card reads the same cache, so the page
// makes one GET /api/bookmarks, not one request per card.
export default function useBookmarks() {
  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const userId = session?.user.id;
  // The user id is in the key, so after a switch of accounts the old list is not shown.
  const queryKey = ["bookmarks", userId];

  const { data: bookmarks = [], isLoading } = useQuery({
    queryKey,
    queryFn: () =>
      request<{ bookmarks: SavedArticleType[] }>("/api/bookmarks").then((r) => r.bookmarks),
    // Without a session the server answers 401, so we do not ask.
    enabled: !!userId,
  });

  // Optimistic update: change the cached list first, send the request after.
  // On error put the snapshot back; in any case reload the list from the server.
  const optimistic = {
    onError: (_error: Error, _variables: unknown, snapshot?: SavedArticleType[]) => {
      queryClient.setQueryData(queryKey, snapshot);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey }),
  };

  async function takeSnapshot() {
    // Stop a running GET, or its old answer would overwrite our change.
    await queryClient.cancelQueries({ queryKey });
    return queryClient.getQueryData<SavedArticleType[]>(queryKey) ?? [];
  }

  const save = useMutation({
    mutationFn: (article: ArticleType) =>
      request("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          articleId: article.id,
          title: article.title,
          description: article.description,
          image: article.image || null,
          sectionId: article.sectionId,
        }),
      }),
    onMutate: async (article) => {
      const snapshot = await takeSnapshot();
      const draft: SavedArticleType = {
        id: TEMP_PREFIX + article.id,
        articleId: toGuardianId(article.id),
        title: article.title,
        description: article.description,
        image: article.image || null,
        sectionId: article.sectionId,
        createdAt: new Date().toISOString(),
      };
      queryClient.setQueryData(queryKey, [draft, ...snapshot]);
      return snapshot;
    },
    ...optimistic,
  });

  const remove = useMutation({
    mutationFn: (bookmarkId: string) => request(`/api/bookmarks/${bookmarkId}`, { method: "DELETE" }),
    onMutate: async (bookmarkId) => {
      const snapshot = await takeSnapshot();
      queryClient.setQueryData(
        queryKey,
        snapshot.filter((b) => b.id !== bookmarkId),
      );
      return snapshot;
    },
    ...optimistic,
  });

  const findBookmark = (articleId: string) => {
    const guardianId = toGuardianId(articleId);
    return bookmarks.find((b) => b.articleId === guardianId);
  };

  const toggle = (article: ArticleType) => {
    const bookmark = findBookmark(article.id);
    if (!bookmark) return save.mutate(article);
    // Not saved on the server yet: there is no real id to delete.
    if (bookmark.id.startsWith(TEMP_PREFIX)) return;
    remove.mutate(bookmark.id);
  };

  return {
    isSignedIn: !!userId,
    bookmarks,
    isLoading,
    isSaved: (articleId: string) => !!findBookmark(articleId),
    toggle,
    // For /saved, where we already have the bookmark id.
    remove: (bookmarkId: string) => remove.mutate(bookmarkId),
  };
}
