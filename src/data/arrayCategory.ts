import type { CategoryType } from "@/types/news";

/**
 * Site navigation: categories, subcategories and their Guardian queries.
 * Search functions for this file live in `src/lib/categories.ts`.
 *
 * ORDER MATTERS:
 *   - all 10 items = Navbar
 *   - CategoryBar = items 1-7 -> `navCategories.slice(1, 8)` (7 items)
 *   - General is FIRST (index 0) and is NOT in CategoryBar on purpose:
 *     it is a "basket" for sections without a better place
 *   - Lifestyle and Health (index 8-9) are in the Navbar only
 *
 * HOW TO READ query:
 *   { type: "section", values: [...] } -> ?section=...
 *   { type: "tag",     values: [...] } -> ?tag=...
 *   no query                           -> request without a filter (all latest news)
 *   several values are joined with "|"
 *
 * SECTION OR TAG:
 * In Guardian the second level of the menu is a mix. Some items are real
 * sections, others exist only as tags. So every item keeps its own query.
 * All "section" values are checked against the real list of Guardian sections
 * (`projectsText/guardian-research/section_ids.txt`). All "tag" values were
 * checked with live requests on 2026-09-23: the tag exists and it really gets
 * new articles (we looked at the number of articles in the last 30 days).
 */
export const navCategories: CategoryType[] = [
  // ── 1-8: CategoryBar ────────────────────────────────────────────────
  {
    name: "General",
    slug: "general",
    // No query: all latest news without a section filter.
    // A temporary "basket": real Guardian sections that do not belong
    // to the categories below yet.
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
    name: "Politics",
    slug: "politics",
    query: { type: "section", values: ["politics"] },
    subcategories: [
      // Guardian has no "politics" tag for most countries (checked: France,
      // Germany, China, India, Canada do not exist). Only US, EU and Australia.
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
    name: "Sports",
    slug: "sports",
    // Careful: the Guardian section is "sport" (one), our slug is "sports".
    query: { type: "section", values: ["sport"] },
    subcategories: [
      // Different sports, not three kinds of football: Premier League,
      // Champions League and women's football all live inside Football.
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
    // There is no "entertainment" section: we collect several culture sections.
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

  // ── 9-10: Navbar only, not in CategoryBar ───────────────────────────
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
    // There is no "health" section in Guardian. We use the checked tag.
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

/**
 * Guardian sections we left out on purpose: service pages, professional
 * networks and non-news parts. Kept as a list, so it is clear that they were
 * not forgotten but skipped:
 *
 * about, animals-farmed, better-business, business-to-business, cardiff,
 * childrens-books-site, community, crosswords, culture-network,
 * culture-professionals-network, edinburgh, enterprise-network, extra,
 * global-development-professionals-network, government-computing-network,
 * guardian-foundation, guardian-professional, healthcare-network, help,
 * higher-education-network, housing-network, info, jobsadvice, katine, leeds,
 * local, local-government-network, media-network, membership, news, public-leaders-network,
 * puzzles, search, small-business-network, social-care-network,
 * social-enterprise-network, society-professionals, teacher-network, thefilter,
 * thefilter-us, theguardian, theobserver, travel/offers, us-wellness,
 * voluntary-sector-network, weather, women-in-leadership, working-in-development
 */
