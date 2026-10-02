import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import ReadingProgress from "@/components/ReadingProgress";
import { findPlaceByPath, findPlaceBySection } from "@/lib/categories";
import { getArticle } from "@/lib/getNews";

interface NewsPageProps {
  // The id comes encoded ("film%2F2026%2F..."). getArticle decodes it.
  params: Promise<{ id: string }>;
  // The menu place the reader came from (a category page card link).
  // An address with two "from" (?from=a&from=b) gives an array here.
  searchParams: Promise<{ from?: string | string[] }>;
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
  return {
    title: article.title,
    description: stripTags(article.description),
    // One article can have many addresses: with ?from=... and without.
    // canonical tells search engines which one is the real one.
    // The id can come encoded or not, so we decode it and encode again:
    // the slashes inside the id must stay "%2F", or the link gives 404.
    alternates: { canonical: `/news/${encodeURIComponent(decodeURIComponent(id))}` },
  };
}

export default async function NewsPage({ params, searchParams }: NewsPageProps) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  // Breadcrumbs. Opened from a category page: the place the reader came
  // from (?from=science/medical-research), even if the article section is
  // different - otherwise the breadcrumbs would show another place and
  // confuse the reader. Opened in any other way (home page, sidebar, a
  // shared link): the place of the article section in our menu,
  // for example "commentisfree" -> General / Opinion.
  const sp = await searchParams;
  // Two "from" in the address: we take the first one. Without this the
  // page crashed, because an array has no split().
  const from = Array.isArray(sp.from) ? sp.from[0] : sp.from;
  const fromPlace = from ? findPlaceByPath(from) : {};
  const { category, subcategory } = fromPlace.category
    ? fromPlace
    : findPlaceBySection(article.sectionId);

  return (
    // sm:mx-5: on a phone no extra side margin - the layout padding is
    // enough, and the breadcrumbs and the text get more room.
    <div className="gap-2 sm:mx-5">
      <ReadingProgress />
      <Breadcrumbs category={category} subcategory={subcategory} title={article.title} />
      <h1 className="text-center text-3xl font-medium text-red-800 mt-5">
        {article.title}
      </h1>
      <div className="my-5 ">
        {/* width/height are only the proportions of the Guardian photo
            (500x300), so the browser keeps room for it before it loads.
            The real size comes from the classes: full width on a phone,
            300px with text around it from 640px. h-auto keeps the photo
            proportions - it is never stretched. sizes tells the browser
            which file size to download. */}
        <Image
          className="w-full h-auto mb-4 sm:float-left sm:w-[300px] sm:mr-6"
          src={article.image}
          alt="FlashNews"
          width={500}
          height={300}
          sizes="(max-width: 640px) 100vw, 300px"
        />
        {/* Guardian is a trusted source, so we can show its HTML. */}
        {/* article-body: the styles of the Guardian HTML (paragraphs,
            links, quotes, live blog updates) are in globals.css. */}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.article ?? article.description }}
        />
      </div>
    </div>
  );
}
