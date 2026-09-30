"use client";
import { useEffect, useRef } from "react";
import { CloseIcon, SearchIcon } from "./HeaderIcons";

interface SearchBoxProps {
  // The open / closed state lives in Header: see OpenPanel there.
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

// Search in the header. It does not search yet (module 11).
// In the header there is only a button (Ivanna's choice); the input opens
// after a click:
// - wide screen (md): the "Search" button. The input opens on its left, in
//   the free room between FLASHNEWS and the button;
// - phone: a search icon. There is no free room in the header, so the input
//   opens on top of the whole header (absolute inset-0).
export default function SearchBox({ isOpen, setIsOpen }: SearchBoxProps) {
  // The whole search block. A click inside it does not close the search.
  const boxRef = useRef<HTMLDivElement>(null);

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
        // py-[7px]: with the 1px border the input is 40px high, the same as
        // the button - so the header does not get taller when it opens.
        // focus:outline-none: no white focus frame from the browser (its
        // colour comes from text-white); the grey border shows the input.
        <input
          autoFocus
          aria-label="Search news"
          className="hidden md:block flex-1 min-w-0 ml-1 text-white px-4 py-[7px] border border-gray-700 rounded focus:outline-none"
          type="text"
          placeholder="Search"
        />
      )}
      <button
        onClick={() => setIsOpen(true)}
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
        // absolute box (this div has no position of its own).
        <div className="md:hidden absolute inset-0 z-10 flex items-center gap-2 bg-gray-800 px-4">
          <input
            autoFocus
            aria-label="Search news"
            className="flex-1 min-w-0 text-white px-4 py-2 border border-gray-700 rounded focus:outline-none"
            type="text"
            placeholder="Search"
          />
          <button className="bg-gray-700 text-white px-4 py-2 rounded">Search</button>
          <button
            onClick={() => setIsOpen(false)}
            aria-label="Close search"
            className="w-8 h-8 shrink-0 flex items-center justify-center text-3xl cursor-pointer"
          >
            <CloseIcon className="h-[0.7em]" />
          </button>
        </div>
      )}
    </div>
  );
}
