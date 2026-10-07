import { useQuery } from "@tanstack/react-query";
import type { NewsListType } from "@/types/news";

// enabled: false = no request (e.g. the sidebar is hidden on this page).
export default function useNews(category: string = "general", pageSize: number = 20, enabled = true) {
  return useQuery<NewsListType>({
    enabled,
    queryKey: ["news", category, pageSize],
    queryFn: async () => {
      const response = await fetch(`/api/news?category=${category}&pageSize=${pageSize}`);
      // Without this check an error answer would look like normal data.
      if (!response.ok) throw new Error("Failed to fetch news");
      return response.json();
    },
  });
}
