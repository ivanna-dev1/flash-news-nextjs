import { useQuery } from "@tanstack/react-query";
import { ArticleType } from "@/types/news";

export default function useNews(category: string = "general") {
  return useQuery<ArticleType[]>({
    queryKey: ["news", category],
    queryFn: async () => {
      const response = await fetch(`/api/news?category=${category}`);
      const data = await response.json();
      return data;
    },
  });
}
