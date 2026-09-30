"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import SearchBox from "./SearchBox";

// What is open in the header now: the menu, the search (phone) or nothing.
// One value for both, so only one of them can be open: opening one closes
// the other. Before, the menu and the search had their own useState and did
// not know about each other - on a phone the search covered the open menu
// together with its close button.
type OpenPanel = "menu" | "search" | null;

const Header = () => {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);

  return (
    // Three columns: 1fr | auto | 1fr. The two side columns are always equally
    // wide, so FLASHNEWS in the middle stands exactly in the centre of the
    // header, even if the left and the right buttons have different widths.
    // The search block fills the right column and keeps its button at the
    // right edge (see SearchBox). The header padding (p-4) is the same on
    // both sides, so the menu button and the search button are equally far
    // from the outer edges.
    <header className="grid grid-cols-[1fr_auto_1fr] items-center sticky top-0 z-50 bg-gray-800 text-white p-4">
      <Navbar
        isOpen={openPanel === "menu"}
        setIsOpen={(open) => setOpenPanel(open ? "menu" : null)}
      />
      <Link href="/">
        <h2 className="text-3xl font-bold">FLASHNEWS</h2>
      </Link>
      <SearchBox
        isOpen={openPanel === "search"}
        setIsOpen={(open) => setOpenPanel(open ? "search" : null)}
      />
    </header>
  );
};

export default Header;
