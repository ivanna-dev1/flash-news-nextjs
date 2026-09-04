export interface ArticleType {
    id: string | number;
    title: string;
    description: string;
    image: string;
    category: string;
    tags?: string[];
    article?: string;
    url?: string;
    publishedAt?: string;
    source?: { name: string; url?: string };
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
