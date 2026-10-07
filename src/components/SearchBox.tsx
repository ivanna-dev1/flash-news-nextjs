"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { popularSearches } from "@/data/popularSearches";
import { CloseIcon, HEADER_BUTTON, SearchIcon } from "./HeaderIcons";

interface SearchBoxProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// The desktop Search button is outside the form and submits it via the form attribute.
const WIDE_FORM_ID = "search-form-wide";

// Desktop: the input opens between the logo and the button.
// Mobile: the input covers the whole header.
export default function SearchBox({ isOpen, setIsOpen }: SearchBoxProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [text, setText] = useState("");

  const close = () => {
    setIsOpen(false);
    setText("");
  };

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

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const searchText = text.trim();
    if (!searchText) return;
    router.push(`/search?q=${encodeURIComponent(searchText)}`);
    close();
  };

  const typed = text.trim().toLowerCase();
  const suggestions = popularSearches.filter((s) => s.toLowerCase().includes(typed));

  // Mobile: full width under the header. Desktop: under the input.
  const suggestionList = suggestions.length > 0 && (
    <ul className="absolute top-full left-0 right-0 md:mt-1 z-10 py-1 bg-gray-800 border-b md:border border-gray-700 md:rounded">
      <li className="px-3 pt-1 pb-1 text-sm text-gray-400">Popular searches</li>
      {suggestions.map((s) => (
        <li key={s}>
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
    // min-w-0 lets the input shrink so the logo stays centered.
    <div ref={boxRef} className="flex items-center justify-end gap-1 min-w-0">
      {isOpen && (
        <form
          id={WIDE_FORM_ID}
          onSubmit={onSubmit}
          role="search"
          className="hidden md:block relative flex-1 min-w-0 ml-1"
        >
          {/* 7px + 1px border = 40px, same height as the button. */}
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
      <button
        type={isOpen ? "submit" : "button"}
        form={isOpen ? WIDE_FORM_ID : undefined}
        onClick={isOpen ? undefined : () => setIsOpen(true)}
        className="hidden md:block shrink-0 bg-gray-700 text-white px-4 py-2 rounded cursor-pointer"
      >
        Search
      </button>
      {/* h-[0.7em] = cap height of the logo. */}
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open search"
        className={`md:hidden ${HEADER_BUTTON}`}
      >
        <SearchIcon className="h-[0.7em]" />
      </button>

      {isOpen && (
        // Positioned against the sticky header.
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
            className={HEADER_BUTTON}
          >
            <CloseIcon className="h-[0.7em]" />
          </button>
          {suggestionList}
        </form>
      )}
    </div>
  );
}
