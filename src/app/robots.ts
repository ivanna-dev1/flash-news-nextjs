import type { MetadataRoute } from "next";

// Next.js turns this into /robots.txt.
// Every page a search robot opens is a request to the Guardian API,
// and the key has a daily limit.
// So we close the pages that only repeat other pages:
// - /api/ - our own data for the browser, not pages for people;
// - ?page= - older pages of a category (up to 100 for each one);
// - ?from= - the same article, only with other breadcrumbs;
// - /search - endless pages of search results.
// "*" means "any text", so "/*?page=" closes "/world?page=2" too.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/search", "/*?page=", "/*&page=", "/*?from=", "/*&from="],
    },
  };
}
