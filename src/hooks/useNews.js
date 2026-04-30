import { useQuery } from "@tanstack/react-query";

export default function useNews() {
  return useQuery({
    queryKey: ["news"],
    queryFn: async () => {
      const response = await fetch("/api/news");
      const data = await response.json();
      return data;
    },
  });
}
