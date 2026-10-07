"use client";
import { useState } from "react";
import Link from "next/link";
import Navbar from "./Navbar";
import SearchBox from "./SearchBox";
import AccountMenu from "./AccountMenu";

// Menu, account menu and search share one state, so only one of them can be open.
type OpenPanel = "menu" | "account" | "search" | null;

const Header = () => {
  const [openPanel, setOpenPanel] = useState<OpenPanel>(null);

  return (
    // 1fr auto 1fr keeps the logo centered regardless of the side buttons.
    // --hs: logo font size. 30px, or less on narrow phones so that logo + buttons
    // (12.2 x --hs in total) still fit between the 16px side paddings.
    <header className="grid grid-cols-[1fr_auto_1fr] items-center sticky top-0 z-50 bg-gray-800 text-white p-4 [--hs:min(1.875rem,calc((100vw-2rem)/12.2))]">
      <div className="flex items-center gap-[calc(var(--hs)*0.533)]">
        <Navbar
          isOpen={openPanel === "menu"}
          setIsOpen={(open) => setOpenPanel(open ? "menu" : null)}
        />
        <AccountMenu
          isOpen={openPanel === "account"}
          setIsOpen={(open) => setOpenPanel(open ? "account" : null)}
        />
      </div>
      <Link href="/">
        {/* leading-[1.2] = the old text-3xl line height (36px at 30px). */}
        <h2 className="text-[length:var(--hs)] leading-[1.2] font-bold">FLASHNEWS</h2>
      </Link>
      <SearchBox
        isOpen={openPanel === "search"}
        setIsOpen={(open) => setOpenPanel(open ? "search" : null)}
      />
    </header>
  );
};

export default Header;
