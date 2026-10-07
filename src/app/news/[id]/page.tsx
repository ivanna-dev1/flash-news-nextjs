import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import SaveButton from "@/components/SaveButton";
import ShareButton from "@/components/ShareButton";
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

// Guardian thumbnails are 500px wide; messengers show a 1000px one as a
// large preview. It exists only when the crop itself (".../x_y_width_height/500.jpg")
// is at least 1000px wide, otherwise the URL answers 403.
function previewImage(thumbnail: string): string {
  const crop = thumbnail.match(/^https:\/\/media\.guim\.co\.uk\/.+\/\d+_\d+_(\d+)_\d+\/500\.jpg$/);
  return crop && Number(crop[1]) >= 1000 ? thumbnail.replace(/500\.jpg$/, "1000.jpg") : thumbnail;
}

export async function generateMetadata({ params }: NewsPageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) return { title: "Article not found" };
  // Re-encode so the slashes stay %2F.
  const url = `/news/${encodeURIComponent(decodeURIComponent(id))}`;
  const description = stripTags(article.description);
  return {
    title: article.title,
    description,
    alternates: { canonical: url },
    // Link previews in messengers and social networks.
    openGraph: {
      type: "article",
      siteName: "FlashNews",
      url,
      title: article.title,
      description,
      images: [previewImage(article.image)],
      publishedTime: article.publishedAt,
    },
    twitter: { card: "summary_large_image" },
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
      {/* clear-both: the photo floats left, the buttons go under the whole article. */}
      <div className="clear-both flex justify-center gap-2 mt-8 pt-5 border-t border-gray-200 text-gray-700">
        <ShareButton
          path={`/news/${article.id}`}
          title={article.title}
          className="border border-gray-500 hover:bg-gray-100 cursor-pointer px-4 py-2 rounded font-medium"
        />
        <SaveButton
          article={article}
          className="border border-gray-500 hover:bg-gray-100 cursor-pointer flex items-center px-4 rounded"
          iconClassName="size-6"
        />
      </div>
    </div>
  );
}
