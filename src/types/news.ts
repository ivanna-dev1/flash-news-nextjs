export interface ArticleType {
    id: string | number;
    title: string;
    description: string;
    image: string;
    category: string;
    subcategory?: string;
    article?: string;
    url?: string;
    publishedAt?: string;
    source?: { name: string; url?: string };
}

export interface CategoryType {
    id: string | number;
    name: string;
    slug: string;
    href: string;
}




