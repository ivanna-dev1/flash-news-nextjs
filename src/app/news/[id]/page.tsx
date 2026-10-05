import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReadingProgress from "@/components/ReadingProgress";
import { findPlaceByPath, findPlaceBySection } from "@/lib/categories";
import { getArticle } from "@/lib/getNews";

interface NewsPageProps {
  params: Promise<{ id: string }>;
  // Menu path of the page the reader came from (set by category cards).
  searchParams: Promise<{ from?: string | string[] }>;
}

function stripTags(html: string): string {
  return html.replace(/<[^>]+>/g, "");
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) return { title: "Article not found" };
  return {
    title: article.title,
    description: stripTags(article.description),
    // Re-encode so the slashes stay %2F.
    alternates: { canonical: `/news/${encodeURIComponent(decodeURIComponent(id))}` },
  };
}

export default async function NewsPage({ params, searchParams }: NewsPageProps) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  // Breadcrumbs follow the reader's path; otherwise use the article section.
  const sp = await searchParams;
  const from = Array.isArray(sp.from) ? sp.from[0] : sp.from;
  const fromPlace = from ? findPlaceByPath(from) : {};
  const { category, subcategory } = fromPlace.category
    ? fromPlace
    : findPlaceBySection(article.sectionId);

  return (
    <div className="gap-2 sm:mx-5">
      <ReadingProgress />
      <Breadcrumbs category={category} subcategory={subcategory} title={article.title} />
      <h1 className="text-center text-3xl font-medium text-red-800 mt-5">
        {article.title}
      </h1>
      <div className="my-5 ">
        <Image
          className="w-full h-auto mb-4 sm:float-left sm:w-[300px] sm:mr-6"
          src={article.image}
          alt="FlashNews"
          width={500}
          height={300}
          sizes="(max-width: 640px) 100vw, 300px"
        />
        {/* Guardian HTML, styled by .article-body in globals.css. */}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.article ?? article.description }}
        />
      </div>
    </div>
  );
}
