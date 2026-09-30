"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { navCategories } from "@/data/arrayCategory";
import { CloseIcon, MenuIcon } from "./HeaderIcons";

interface NavbarProps {
  // The open / closed state lives in Header: see OpenPanel there.
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Navbar = ({ isOpen: isMenuOpen, setIsOpen: setIsMenuOpen }: NavbarProps) => {
  // The whole nav: the menu button and the open menu. A click inside it is
  // not a click "outside the menu".
  const navRef = useRef<HTMLElement>(null);

  // Other ways to close the open menu (the close icon and a click on a link
  // already work):
  // - the Escape key;
  // - a click anywhere outside the menu, for example on FLASHNEWS;
  // - the browser Back (or Forward) button.
  // The listeners work only while the menu is open, and the cleanup
  // function removes them when it closes.
  useEffect(() => {
    if (!isMenuOpen) return;
    const close = () => setIsMenuOpen(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    // pointerdown, not click: the menu closes as soon as the finger or
    // the mouse button goes down, like in most menus.
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) close();
    };
    // popstate: the browser Back or Forward button changed the address.
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("popstate", close);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("popstate", close);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <nav ref={navRef} className="flex gap-4">
      {/* A fixed square size (w-8 h-8): the menu and the close icons have
          different widths, so without it the button changed its width on
          click and pushed the FLASHNEWS title in the header to the side.
          text-3xl + h-[0.7em]: the icon is as tall as the capital letters
          of FLASHNEWS (see HeaderIcons). */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        className="w-8 h-8 shrink-0 flex items-center justify-center text-3xl cursor-pointer"
      >
        {isMenuOpen ? (
          <CloseIcon className="h-[0.7em]" />
        ) : (
          <MenuIcon className="h-[0.7em]" />
        )}
      </button>
      {isMenuOpen && (
        // One list of categories. Each category is an <li> with its link and
        // an inner list of subcategories. Valid HTML allows only <li> right
        // inside a <ul>, so the inner <ul> must be inside the <li>.
        <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 fixed top-[64px] left-1/2 -translate-x-1/2 w-full max-w-[980px] mx-auto my-2 z-100 gap-6 bg-gray-100/95 border-2 border-gray-300/50 px-10 pt-6 pb-10 max-h-[calc(100vh-80px)] overflow-y-auto md:max-h-none md:overflow-visible">
          {navCategories.map((categ) => (
            // A click on any link inside closes the menu (the click goes up
            // to this <li>).
            <li onClick={() => setIsMenuOpen(false)} key={categ.slug}>
              <Link
                href={`/${categ.slug}`}
                className="block text-black hover:text-blue-900 hover:underline text-xl transition-colors duration-300"
              >
                {categ.name}
              </Link>
              <ul className="text-gray-800 text-lg">
                {categ.subcategories.map((sub) => (
                  <li
                    className="text-gray-800 hover:text-blue-900 hover:underline text-lg"
                    key={sub.slug}
                  >
                    <Link href={`/${categ.slug}/${sub.slug}`}>
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
