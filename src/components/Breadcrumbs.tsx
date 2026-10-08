"use client";
import { useLayoutEffect, useRef, useState, type Ref } from "react";
import Link from "next/link";
import type { SubCategoryType } from "@/types/news";

interface BreadcrumbsProps {
  category?: SubCategoryType;
  subcategory?: SubCategoryType;
  title?: string;
}

const LINK = "shrink-0 whitespace-nowrap hover:underline cursor-pointer hover:text-blue-900";

// A long name is shown in full or as its first word ("Global"), never cut in the middle.
function CrumbLink({
  href,
  name,
  short,
  restRef,
}: {
  href: string;
  name: string;
  short: boolean;
  restRef: Ref<HTMLSpanElement>;
}) {
  const [first, ...rest] = name.split(" ");
  return (
    <Link className={LINK} href={href}>
      {first}
      {rest.length > 0 && !short && <span ref={restRef}> {rest.join(" ")}</span>}
    </Link>
  );
}

// A new key for every new path: the row is created again and measured with full
// names. Without it, a move article -> article keeps the old level, the short
// names have no "rest" spans to measure, and the row ends up cut.
export default function Breadcrumbs(props: BreadcrumbsProps) {
  const key = `${props.category?.slug}/${props.subcategory?.slug}/${props.title}`;
  return <BreadcrumbsRow key={key} {...props} />;
}

function BreadcrumbsRow({ category, subcategory, title }: BreadcrumbsProps) {
  const rowRef = useRef<HTMLDivElement>(null);
  const subRestRef = useRef<HTMLSpanElement>(null);
  const catRestRef = useRef<HTMLSpanElement>(null);
  // 0 = full names, 1 = short subcategory, 2 = short subcategory and category.
  const [level, setLevel] = useState(0);

  // CSS can only shrink smoothly, but a name must be full or one word.
  // So we measure once with full names and pick the level from the row width.
  useLayoutEffect(() => {
    const row = rowRef.current;
    if (!row) return;
    // First run is at level 0. Width needed with full names: all parts,
    // the title at its 3em minimum (it grows into free space) and the gaps.
    const parts = [...row.children] as HTMLElement[];
    const gap = parseFloat(getComputedStyle(row).columnGap) || 0;
    const full =
      parts.reduce(
        (sum, el) =>
          sum + (el === parts.at(-1) && title ? parseFloat(getComputedStyle(el).minWidth) : el.offsetWidth),
        0,
      ) +
      gap * (parts.length - 1);
    const rests = [subRestRef.current?.offsetWidth ?? 0, catRestRef.current?.offsetWidth ?? 0];

    const update = () => {
      let need = full;
      let next = 0;
      while (need > row.clientWidth && next < rests.length) need -= rests[next++];
      setLevel(next);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(row);
    return () => observer.disconnect();
  }, [category?.name, subcategory?.name, title]);

  return (
    // One line. The title takes only the space that is left (basis-0 + grow), down to 3em.
    // overflow-hidden: no page scroll for a moment before the first measure.
    <div ref={rowRef} className="flex flex-row gap-2 text-gray-700 text-md overflow-hidden">
      <Link className={LINK} href="/">
        Home
      </Link>
      {category && (
        <>
          <p className="shrink-0"> / </p>
          <CrumbLink
            href={`/${category.slug}`}
            name={category.name}
            short={level >= 2}
            restRef={catRestRef}
          />
        </>
      )}
      {category && subcategory && (
        <>
          <p className="shrink-0"> / </p>
          <CrumbLink
            href={`/${category.slug}/${subcategory.slug}`}
            name={subcategory.name}
            short={level >= 1}
            restRef={subRestRef}
          />
        </>
      )}
      {title && (
        <>
          <p className="shrink-0"> / </p>
          <p className="min-w-[3em] grow basis-0 italic text-gray-500 truncate">{title}</p>
        </>
      )}
    </div>
  );
}
