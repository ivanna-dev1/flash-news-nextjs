import type { CategoryType } from "@/types/news";

// Menu config. Navbar shows all items, CategoryBar shows items 1-7
// (General and the last two are menu-only).
// Each item maps to a Guardian section OR tag: many topics exist only as tags.
// Every tag here was checked against the live API - an unknown tag returns
// zero results instead of an error.
export const navCategories: CategoryType[] = [
  {
    name: "General",
    slug: "general",
    // No query: all latest news.
    subcategories: [
      { name: "Opinion", slug: "opinion", query: { type: "section", values: ["commentisfree"] } },
      { name: "Education", slug: "education", query: { type: "section", values: ["education"] } },
      { name: "Media", slug: "media", query: { type: "section", values: ["media"] } },
      { name: "Cities", slug: "cities", query: { type: "section", values: ["cities"] } },
      { name: "Global development", slug: "global-development", query: { type: "section", values: ["global-development"] } },
    ],
  },
  {
    name: "World",
    slug: "world",
    query: { type: "section", values: ["world"] },
    subcategories: [
      { name: "UK", slug: "uk", query: { type: "section", values: ["uk-news"] } },
      { name: "US", slug: "us", query: { type: "section", values: ["us-news"] } },
      { name: "Europe", slug: "europe", query: { type: "tag", values: ["world/europe-news"] } },
      { name: "Ukraine", slug: "ukraine", query: { type: "tag", values: ["world/ukraine"] } },
      { name: "Middle East", slug: "middle-east", query: { type: "tag", values: ["world/middleeast"] } },
      { name: "Asia Pacific", slug: "asia-pacific", query: { type: "tag", values: ["world/asia-pacific"] } },
      { name: "Africa", slug: "africa", query: { type: "tag", values: ["world/africa"] } },
      { name: "Australia", slug: "australia", query: { type: "section", values: ["australia-news"] } },
    ],
  },
  {
    name: "Business",
    slug: "business",
    query: { type: "section", values: ["business"] },
    subcategories: [
      { name: "Economy", slug: "economy", query: { type: "tag", values: ["business/economics"] } },
      { name: "Markets", slug: "markets", query: { type: "tag", values: ["business/stock-markets"] } },
      { name: "Inflation", slug: "inflation", query: { type: "tag", values: ["business/inflation"] } },
      { name: "Energy", slug: "energy", query: { type: "tag", values: ["business/energy-industry"] } },
      { name: "Retail", slug: "retail", query: { type: "tag", values: ["business/retail"] } },
      { name: "Banking", slug: "banking", query: { type: "tag", values: ["business/banking"] } },
      { name: "Money", slug: "money", query: { type: "section", values: ["money"] } },
    ],
  },
  {
    name: "Science",
    slug: "science",
    query: { type: "section", values: ["science"] },
    subcategories: [
      { name: "Environment", slug: "environment", query: { type: "section", values: ["environment"] } },
      { name: "Climate crisis", slug: "climate", query: { type: "tag", values: ["environment/climate-crisis"] } },
      { name: "Wildlife", slug: "wildlife", query: { type: "tag", values: ["environment/wildlife"] } },
      { name: "Space", slug: "space", query: { type: "tag", values: ["science/space"] } },
      { name: "Medical research", slug: "medical-research", query: { type: "tag", values: ["science/medical-research"] } },
    ],
  },
  {
    name: "Politics",
    slug: "politics",
    query: { type: "section", values: ["politics"] },
    subcategories: [
      // Guardian has country politics tags only for the US, EU and Australia.
      { name: "US", slug: "us-politics", query: { type: "tag", values: ["us-news/us-politics"] } },
      { name: "Europe", slug: "eu", query: { type: "tag", values: ["world/eu"] } },
      { name: "Australia", slug: "australia-politics", query: { type: "tag", values: ["australia-news/australian-politics"] } },
      { name: "Nato", slug: "nato", query: { type: "tag", values: ["world/nato"] } },
      { name: "Economy", slug: "economic-policy", query: { type: "tag", values: ["politics/economy"] } },
      { name: "Law", slug: "law", query: { type: "section", values: ["law"] } },
      { name: "Inequality", slug: "inequality", query: { type: "section", values: ["inequality"] } },
    ],
  },
  {
    name: "Technology",
    slug: "technology",
    query: { type: "section", values: ["technology"] },
    subcategories: [
      { name: "AI", slug: "ai", query: { type: "tag", values: ["technology/artificialintelligenceai"] } },
      { name: "Computing", slug: "computing", query: { type: "tag", values: ["technology/computing"] } },
      { name: "Smartphones", slug: "smartphones", query: { type: "tag", values: ["technology/smartphones"] } },
      { name: "Social media", slug: "social-media", query: { type: "tag", values: ["media/social-media"] } },
      { name: "Crypto", slug: "crypto", query: { type: "tag", values: ["technology/cryptocurrencies"] } },
      { name: "Games", slug: "games", query: { type: "section", values: ["games"] } },
    ],
  },
  {
    name: "Sports",
    slug: "sports",
    // Guardian section is "sport", not "sports".
    query: { type: "section", values: ["sport"] },
    subcategories: [
      { name: "Football", slug: "football", query: { type: "section", values: ["football"] } },
      { name: "Cricket", slug: "cricket", query: { type: "tag", values: ["sport/cricket"] } },
      { name: "Tennis", slug: "tennis", query: { type: "tag", values: ["sport/tennis"] } },
      { name: "Rugby", slug: "rugby", query: { type: "tag", values: ["sport/rugby-union"] } },
      { name: "Boxing", slug: "boxing", query: { type: "tag", values: ["sport/boxing"] } },
      { name: "Golf", slug: "golf", query: { type: "tag", values: ["sport/golf"] } },
      { name: "Formula One", slug: "formula-one", query: { type: "tag", values: ["sport/formulaone"] } },
      { name: "US sports", slug: "us-sports", query: { type: "tag", values: ["sport/us-sport"] } },
    ],
  },
  {
    name: "Entertainment",
    slug: "entertainment",
    // No "entertainment" section in Guardian.
    query: { type: "section", values: ["culture", "film", "music", "tv-and-radio", "stage"] },
    subcategories: [
      { name: "Movies", slug: "movies", query: { type: "section", values: ["film"] } },
      { name: "TV & radio", slug: "tv-and-radio", query: { type: "section", values: ["tv-and-radio"] } },
      { name: "Music", slug: "music", query: { type: "section", values: ["music"] } },
      { name: "Books", slug: "books", query: { type: "section", values: ["books"] } },
      { name: "Art & design", slug: "art-and-design", query: { type: "section", values: ["artanddesign"] } },
      { name: "Stage", slug: "stage", query: { type: "section", values: ["stage"] } },
    ],
  },

  {
    name: "Lifestyle",
    slug: "lifestyle",
    query: { type: "section", values: ["lifeandstyle"] },
    subcategories: [
      { name: "Travel", slug: "travel", query: { type: "section", values: ["travel"] } },
      { name: "Food", slug: "food", query: { type: "section", values: ["food"] } },
      { name: "Fashion", slug: "fashion", query: { type: "section", values: ["fashion"] } },
      { name: "Work & careers", slug: "work-and-careers", query: { type: "tag", values: ["money/work-and-careers"] } },
    ],
  },
  {
    name: "Health",
    slug: "health",
    // No "health" section in Guardian.
    query: { type: "tag", values: ["society/health"] },
    subcategories: [
      { name: "Wellbeing", slug: "wellbeing", query: { type: "tag", values: ["lifeandstyle/health-and-wellbeing"] } },
      { name: "Mental health", slug: "mental-health", query: { type: "tag", values: ["society/mental-health"] } },
      { name: "NHS", slug: "nhs", query: { type: "tag", values: ["society/nhs"] } },
      { name: "Cancer", slug: "cancer", query: { type: "tag", values: ["society/cancer"] } },
      { name: "Fitness", slug: "fitness", query: { type: "tag", values: ["lifeandstyle/fitness"] } },
      { name: "Society", slug: "society", query: { type: "section", values: ["society"] } },
    ],
  },
];
