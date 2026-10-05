import { navCategories } from "@/data/arrayCategory";
import type { CategoryType, QueryParamsType, SubCategoryType } from "@/types/news";

export function findCategory(slug: string): CategoryType | undefined {
  return navCategories.find((c) => c.slug === slug.toLowerCase());
}

export function findSubcategory(
  category: CategoryType,
  slug: string,
): SubCategoryType | undefined {
  return category.subcategories.find((sub) => sub.slug === slug.toLowerCase());
}

// Subcategory query wins; no query means all latest news.
export function getMenuQuery(
  category?: CategoryType,
  subcategory?: SubCategoryType,
): QueryParamsType | undefined {
  return subcategory?.query ?? category?.query;
}

interface ArticlePlace {
  category?: CategoryType;
  subcategory?: SubCategoryType;
}

function hasSection(item: SubCategoryType, sectionId: string): boolean {
  return item.query?.type === "section" && item.query.values.includes(sectionId);
}

// "science/medical-research" -> menu place. Unknown paths give an empty place.
export function findPlaceByPath(path: string): ArticlePlace {
  const [categorySlug, subcategorySlug] = path.split("/");
  const category = findCategory(categorySlug ?? "");
  if (!category) return {};
  const subcategory = subcategorySlug ? findSubcategory(category, subcategorySlug) : undefined;
  return { category, subcategory };
}

// Subcategories first: "film" belongs to Entertainment / Movies, not just Entertainment.
export function findPlaceBySection(sectionId: string): ArticlePlace {
  for (const category of navCategories) {
    const subcategory = category.subcategories.find((sub) => hasSection(sub, sectionId));
    if (subcategory) return { category, subcategory };
  }
  const category = navCategories.find((c) => hasSection(c, sectionId));
  return { category };
}
