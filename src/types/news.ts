export interface ArticleType {
    // Already URL-encoded (Guardian ids contain slashes).
    id: string;
    title: string;
    // May contain HTML.
    description: string;
    image: string;
    sectionId: string;
    tags?: string[];
    // Article page only.
    article?: string;
    url?: string;
    publishedAt?: string;
    source?: { name: string; url?: string };
}

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
