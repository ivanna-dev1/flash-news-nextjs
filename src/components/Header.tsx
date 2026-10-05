"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import SearchBox from "./SearchBox";

// Menu and search share one state, so only one of them can be open.
type OpenPanel = "menu" | "search" | null;

const Header = () => {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);

  return (
    // 1fr auto 1fr keeps the logo centered regardless of the side buttons.
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
