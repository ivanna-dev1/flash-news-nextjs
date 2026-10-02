"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { popularSearches } from "@/data/popularSearches";
import { CloseIcon, SearchIcon } from "./HeaderIcons";

interface SearchBoxProps {
  // The open / closed state lives in Header: see OpenPanel there.
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// The id of the wide-screen form. The "Search" button stands outside the
// form (it is also the button that opens the search), so it finds its
// form by this id (the "form" attribute).
const WIDE_FORM_ID = "search-form-wide";

// Search in the header. It sends the reader to /search?q=... .
// In the header there is only a button (Ivanna's choice); the input opens
// after a click:
// - wide screen (md): the "Search" button. The input opens on its left, in
//   the free room between FLASHNEWS and the button;
// - phone: a search icon. There is no free room in the header, so the input
//   opens on top of the whole header (absolute inset-0).
// Under the input we show the popular searches (Ivanna's choice: "like on
// many sites"). Typing hides the ones that do not match.
export default function SearchBox({ isOpen, setIsOpen }: SearchBoxProps) {
  // The whole search block. A click inside it does not close the search.
  const boxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // One text for both inputs (wide screen and phone).
  const [text, setText] = useState("");

  const close = () => {
    setIsOpen(false);
    setText("");
  };

  // While the search is open: Escape or a click outside it closes it
  // (the same as for the menu, see Navbar).
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen, setIsOpen]);

  // Enter or the "Search" button. preventDefault: no full page reload,
  // Next.js opens the page itself. An empty input does nothing.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const searchText = text.trim();
    if (!searchText) return;
    router.push(`/search?q=${encodeURIComponent(searchText)}`);
    close();
  };

  // "u" -> Ukraine. Empty input -> all of them.
  const typed = text.trim().toLowerCase();
  const suggestions = popularSearches.filter((s) => s.toLowerCase().includes(typed));

  // The list under the input. absolute top-full: it hangs under its frame
  // and covers the page, it does not push the page down.
  // Phone: it hangs right under the header, as one dark block with it.
  // Wide screen: a box 4px under the input.
  const suggestionList = suggestions.length > 0 && (
    // A list, one search under another - like the search history under the
    // Google search box (Ivanna's choice). py-1: a little room above the
    // first row and under the last one.
    <ul className="absolute top-full left-0 right-0 md:mt-1 z-10 py-1 bg-gray-800 border-b md:border border-gray-700 md:rounded">
      <li className="px-3 pt-1 pb-1 text-sm text-gray-400">Popular searches</li>
      {suggestions.map((s) => (
        <li key={s}>
          {/* The whole row is the link, so it is easy to hit on a phone. */}
          <Link
            href={`/search?q=${encodeURIComponent(s)}`}
            onClick={close}
            className="flex items-center gap-3 px-3 py-2 text-white hover:bg-gray-700 focus:bg-gray-700 focus:outline-none"
          >
            <SearchIcon className="h-4 shrink-0 text-gray-400" />
            {s}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    // The right column of the header grid. justify-end: the button stands
    // at the right edge; the input (when open) takes the free room on its
    // left. min-w-0: a long input can get narrower, so it never pushes
    // FLASHNEWS out of the centre.
    // gap-1: 4px between the input and the button.
    <div ref={boxRef} className="flex items-center justify-end gap-1 min-w-0">
      {isOpen && (
        // Wide screen only. ml-1: 4px between FLASHNEWS and the input - the
        // same as between the input and the button (Ivanna's choice).
        // relative: the frame for the list of popular searches.
        <form
          id={WIDE_FORM_ID}
          onSubmit={onSubmit}
          role="search"
          className="hidden md:block relative flex-1 min-w-0 ml-1"
        >
          {/* py-[7px]: with the 1px border the input is 40px high, the same
              as the button - so the header does not get taller when it
              opens. focus:outline-none: no white focus frame from the
              browser (its colour comes from text-white); the grey border
              shows the input. */}
          <input
            autoFocus
            aria-label="Search news"
            className="w-full text-white px-4 py-[7px] border border-gray-700 rounded focus:outline-none"
            type="search"
            placeholder="Search"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          {suggestionList}
        </form>
      )}
      {/* Closed search: the button opens it. Open search: the same button
          sends the form (type="submit" + form id). */}
      <button
        type={isOpen ? "submit" : "button"}
        form={isOpen ? WIDE_FORM_ID : undefined}
        onClick={isOpen ? undefined : () => setIsOpen(true)}
        className="hidden md:block shrink-0 bg-gray-700 text-white px-4 py-2 rounded cursor-pointer"
      >
        Search
      </button>
      {/* text-3xl: the same font size as FLASHNEWS, so h-[0.7em] of the
          icon = the height of its capital letters. */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open search"
        className="md:hidden w-8 h-8 shrink-0 flex items-center justify-center text-3xl cursor-pointer"
      >
        <SearchIcon className="h-[0.7em]" />
      </button>

      {isOpen && (
        // Phone only. The header is sticky, so it is the frame for this
        // absolute box (this form has no position of its own). The list of
        // popular searches hangs under the header, as wide as the header.
        <form
          onSubmit={onSubmit}
          role="search"
          className="md:hidden absolute inset-0 z-10 flex items-center gap-2 bg-gray-800 px-4"
        >
          <input
            autoFocus
            aria-label="Search news"
            className="flex-1 min-w-0 text-white px-4 py-2 border border-gray-700 rounded focus:outline-none"
            type="search"
            placeholder="Search"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="bg-gray-700 text-white px-4 py-2 rounded cursor-pointer">
            Search
          </button>
          <button
            type="button"
            onClick={close}
            aria-label="Close search"
            className="w-8 h-8 shrink-0 flex items-center justify-center text-3xl cursor-pointer"
          >
            <CloseIcon className="h-[0.7em]" />
          </button>
          {suggestionList}
        </form>
      )}
    </div>
  );
}
