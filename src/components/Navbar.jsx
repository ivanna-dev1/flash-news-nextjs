"use client";
import React, { useState } from "react";
import Link from "next/link";
import { news } from "../../arrayFakeNews";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const uniqueCategories = [...new Set(news.map((item) => item.category))];
  return (
    <nav className="flex gap-4">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-2xl font-bold cursor-pointer "
      >
        ☰
      </button>
      {isMenuOpen && (
        <div className="grid grid-cols-2  md:grid-cols-4 fixed inset-0 z-100 p-4 gap-4     ">
          {uniqueCategories.map((item) => (
            <Link key={item} href={`/${item}`}>
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
