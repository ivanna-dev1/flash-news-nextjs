import { useQuery } from "@tanstack/react-query";

export default function useNews(category = "general") {
  return useQuery({
    queryKey: ["news", category],
    queryFn: async () => {
      const response = await fetch(`/api/news?category=${category}`);
      const data = await response.json();
      return data;
    },
  });
}
