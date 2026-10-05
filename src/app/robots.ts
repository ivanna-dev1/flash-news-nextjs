import type { MetadataRoute } from "next";

// Each crawled page is a Guardian API request (daily limit), so close the
// endless and duplicate URLs.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/search", "/*?page=", "/*&page=", "/*?from=", "/*&from="],
    },
  };
}
