import { CategoryType } from "./src/types/news";

/**
 * Навігація сайту. Замінює `arrayMainCategory.ts` і структуру, яку `Navbar`
 * зараз збирає з `arrayFakeNews.ts`.
 *
 * ПОРЯДОК ВАЖЛИВИЙ:
 *   - перші 7 записів = CategoryBar (ті самі категорії, що в `arrayMainCategory`, без General)
 *     -> у CategoryBar беремо `navCategories.slice(0, 7)`
 *   - усі 10 = Navbar (як зараз)
 *   - General стоїть останнім і слугує "кошиком" для секцій, які поки не розподілені
 *
 * ЯК ЧИТАТИ query:
 *   { type: "section", values: [...] } -> ?section=...
 *   { type: "tag",     values: [...] } -> ?tag=...
 *   query відсутній                    -> запит без фільтра (усі свіжі новини)
 *   кілька значень у values обʼєднуються через "|"
 *
 * ПРО ЗАКОМЕНТОВАНІ ПУНКТИ:
 * Назви субкатегорій узяті з поточного меню (з `arrayFakeNews`). Ті з них, яким
 * НЕ відповідає жодна реальна секція Guardian, залишені закоментованими з поміткою —
 * щоб було видно, що пункт не загубився, а свідомо вимкнений. Вмикати їх можна буде
 * лише після того, як підберемо і звіримо для них теги.
 *
 * Усі значення type: "section" звірені з реальним списком секцій Guardian (`section_ids.txt`).
 */
export const navCategories: CategoryType[] = [
  // ── 1-7: CategoryBar ────────────────────────────────────────────────
  {
    name: "World",
    slug: "world",
    query: { type: "section", values: ["world"] },
    subcategories: [
      // { name: "Diplomacy", slug: "diplomacy" }, // секції немає в Guardian
      // { name: "Events", slug: "events" },       // секції немає в Guardian
      { name: "UK", slug: "uk", query: { type: "section", values: ["uk-news"] } },
      { name: "US", slug: "us", query: { type: "section", values: ["us-news"] } },
      { name: "Australia", slug: "australia", query: { type: "section", values: ["australia-news"] } },
    ],
  },
  {
    name: "Business",
    slug: "business",
    query: { type: "section", values: ["business"] },
    subcategories: [
      // { name: "Markets", slug: "markets" },     // секції немає в Guardian
      // { name: "Companies", slug: "companies" }, // секції немає в Guardian
      // { name: "Economy", slug: "economy" },     // секції немає в Guardian
      { name: "Money", slug: "money", query: { type: "section", values: ["money"] } },
    ],
  },
  {
    name: "Technology",
    slug: "technology",
    query: { type: "section", values: ["technology"] },
    subcategories: [
      // { name: "Gadgets", slug: "gadgets" },   // секції немає в Guardian
      // { name: "AI", slug: "ai" },             // секції немає в Guardian
      // { name: "Security", slug: "security" }, // секції немає в Guardian
      { name: "Games", slug: "games", query: { type: "section", values: ["games"] } },
    ],
  },
  {
    name: "Science",
    slug: "science",
    query: { type: "section", values: ["science"] },
    subcategories: [
      // { name: "Space", slug: "space" },       // секції немає в Guardian
      // { name: "Medicine", slug: "medicine" }, // секції немає в Guardian
      // { name: "Climate", slug: "climate" },   // секції немає; найближче — Environment нижче
      { name: "Environment", slug: "environment", query: { type: "section", values: ["environment"] } },
    ],
  },
  {
    name: "Health",
    slug: "health",
    // Секції "health" у Guardian НЕМАЄ. Використано звірений тег society/health.
    query: { type: "tag", values: ["society/health"] },
    subcategories: [
      { name: "Wellness", slug: "wellness", query: { type: "section", values: ["wellness"] } },
      // { name: "Medicine", slug: "medicine" }, // секції немає в Guardian
      { name: "Society", slug: "society", query: { type: "section", values: ["society"] } },
    ],
  },
  {
    name: "Sports",
    slug: "sports",
    // увага: секція називається "sport" в однині, а слаг у нас "sports"
    query: { type: "section", values: ["sport"] },
    subcategories: [
      { name: "Football", slug: "football", query: { type: "section", values: ["football"] } },
      // { name: "Tennis", slug: "tennis" }, // секції немає в Guardian (існує лише як тег)
      // { name: "NBA", slug: "nba" },       // секції немає в Guardian (існує лише як тег)
    ],
  },
  {
    name: "Entertainment",
    slug: "entertainment",
    // Секції "entertainment" немає — збираємо з кількох культурних секцій
    query: { type: "section", values: ["culture", "film", "music", "tv-and-radio", "stage"] },
    subcategories: [
      { name: "Movies", slug: "movies", query: { type: "section", values: ["film"] } },
      { name: "TV & radio", slug: "tv-and-radio", query: { type: "section", values: ["tv-and-radio"] } },
      // { name: "Celebrities", slug: "celebrities" }, // секції немає в Guardian
      { name: "Music", slug: "music", query: { type: "section", values: ["music"] } },
      { name: "Books", slug: "books", query: { type: "section", values: ["books"] } },
      { name: "Art & design", slug: "art-and-design", query: { type: "section", values: ["artanddesign"] } },
      { name: "Stage", slug: "stage", query: { type: "section", values: ["stage"] } },
    ],
  },

  // ── 8-10: тільки Navbar, у CategoryBar не потрапляють ───────────────
  {
    name: "Politics",
    slug: "politics",
    query: { type: "section", values: ["politics"] },
    subcategories: [
      // { name: "Policy", slug: "policy" },       // секції немає в Guardian
      // { name: "Elections", slug: "elections" }, // секції немає в Guardian
      { name: "Law", slug: "law", query: { type: "section", values: ["law"] } },
      { name: "Inequality", slug: "inequality", query: { type: "section", values: ["inequality"] } },
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
    ],
  },
  {
    name: "General",
    slug: "general",
    // без query — усі свіжі новини без фільтра за секцією
    // Тимчасовий "кошик": сюди складені реальні секції Guardian, які поки не
    // розподілені по категоріях вище. Розберемо і перерозподілимо пізніше.
    subcategories: [
      // { name: "Top", slug: "top" },           // секції немає в Guardian
      // { name: "Breaking", slug: "breaking" }, // секції немає в Guardian
      { name: "Opinion", slug: "opinion", query: { type: "section", values: ["commentisfree"] } },
      { name: "Education", slug: "education", query: { type: "section", values: ["education"] } },
      { name: "Media", slug: "media", query: { type: "section", values: ["media"] } },
      { name: "Cities", slug: "cities", query: { type: "section", values: ["cities"] } },
      { name: "Global development", slug: "global-development", query: { type: "section", values: ["global-development"] } },
    ],
  },
];

/**
 * Секції Guardian, які свідомо НЕ додані нікуди — це службові, професійні мережі
 * та неновинні розділи. Лишаю списком, щоб було видно, що їх не забули, а відкинули:
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
