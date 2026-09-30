export interface ArticleType {
    // Guardian id with slashes, already encoded for a URL (for example "film%2F2026%2F...").
    // Cards put it straight into the link: /news/<id>.
    id: string;
    title: string;
    // Short text from Guardian (trailText). It can contain HTML tags like <strong>.
    description: string;
    image: string;
    // Guardian section of the article (for example "film"). Breadcrumbs use it
    // to find the place of the article in our menu.
    sectionId: string;
    tags?: string[];
    // Full article text as HTML. Only the article page has it.
    article?: string;
    url?: string;
    publishedAt?: string;
    source?: { name: string; url?: string };
}

// One page of news plus the info that Pagination needs.
export interface NewsListType {
    articles: ArticleType[];
    currentPage: number;
    totalPages: number;
}

export interface QueryParamsType {
    type: QueryType;
    values: string[];
}
export type QueryType = "section" | "tag";

export interface SubCategoryType {
    name: string;
    slug: string;
    query?: QueryParamsType;
}

export interface CategoryType extends SubCategoryType {
    subcategories: SubCategoryType[];
}
