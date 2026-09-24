import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { findPlaceBySection } from "@/lib/categories";
import { getArticle } from "@/lib/getNews";

interface NewsPageProps {
  // The id comes encoded ("film%2F2026%2F..."). getArticle decodes it.
  params: Promise<{ id: string }>;
}

// Removes HTML tags: a page description must be plain text.
function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { id } = await params;
  // getArticle uses `cache`, so the page below does not send a second request.
  const article = await getArticle(id);
  if (!article) return { title: "Article not found" };
  return { title: article.title, description: stripTags(article.description) };
}

export default async function NewsPage({ params }: NewsPageProps) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  // Guardian gives only its section (for example "commentisfree").
  // We find the place of this section in our menu: General / Opinion.
  const { category, subcategory } = findPlaceBySection(article.sectionId);

  return (
    <div className="gap-2 mx-5 ">
      <Breadcrumbs category={category} subcategory={subcategory} title={article.title} />
      <h1 className="text-center text-3xl font-medium text-red-800 mt-5">
        {article.title}
      </h1>
      <div className="my-5 ">
        <Image
          className=" float-left mr-6 mb-4 "
          src={article.image}
          alt="FlashNews"
          width={300}
          height={300}
        />
        {/* Guardian is a trusted source, so we can show its HTML. */}
        <div
          // Guardian HTML can bring wide pictures and long links:
          // keep them inside the page.
          className="text-lg text-gray-700 break-words [&_img]:max-w-full [&_img]:h-auto [&_figure]:max-w-full [&_iframe]:max-w-full"
          dangerouslySetInnerHTML={{ __html: article.article ?? article.description }}
        />
      </div>
    </div>
  );
}
