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

// Which Guardian query to use for a menu item.
// Subcategory wins. If there is no subcategory, we use the category.
// No query at all (General) means "all latest news".
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

// Finds where an article lives in our menu, by its Guardian section.
// Example: section "commentisfree" -> General / Opinion.
// We check subcategories first, because they are more exact:
// "film" is inside Entertainment, but the best place is Entertainment / Movies.
export function findPlaceBySection(sectionId: string): ArticlePlace {
  for (const category of navCategories) {
    const subcategory = category.subcategories.find((sub) => hasSection(sub, sectionId));
    if (subcategory) return { category, subcategory };
  }
  const category = navCategories.find((c) => hasSection(c, sectionId));
  return { category };
}
