"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { navCategories } from "@/data/arrayCategory";
import { CloseIcon, HEADER_BUTTON, MenuIcon } from "./HeaderIcons";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const Navbar = ({ isOpen: isMenuOpen, setIsOpen: setIsMenuOpen }: NavbarProps) => {
  const navRef = useRef<HTMLElement>(null);

  // Close on Escape, click outside and browser back/forward.
  useEffect(() => {
    if (!isMenuOpen) return;
    const close = () => setIsMenuOpen(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!navRef.current?.contains(e.target as Node)) close();
    };
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
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
        className={HEADER_BUTTON}
      >
        {isMenuOpen ? (
          <CloseIcon className="h-[0.7em]" />
        ) : (
          <MenuIcon className="h-[0.7em]" />
        )}
      </button>
      {isMenuOpen && (
        <ul className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 fixed top-[64px] left-1/2 -translate-x-1/2 w-full max-w-[980px] mx-auto my-2 z-100 gap-6 bg-gray-100/95 border-2 border-gray-300/50 px-10 pt-6 pb-10 max-h-[calc(100vh-80px)] overflow-y-auto md:max-h-none md:overflow-visible">
          {navCategories.map((categ) => (
            // Clicks on links bubble up and close the menu.
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
