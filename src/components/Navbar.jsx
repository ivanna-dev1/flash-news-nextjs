"use client";
import React, { useState } from "react";
import Link from "next/link";
import { news } from "../../arrayFakeNews";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const uniqueCategories = [...new Set(news.map((item) => item.category))];
  const uniqueSubCategories = [
    ...new Set(uniqueCategories.map((item) => item.subcategory)),
  ];
  return (
    <nav className="flex gap-4">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`text-2xl font-bold cursor-pointer`}
      >
        {isMenuOpen ? "X" : "☰"}
      </button>
      {isMenuOpen && (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 fixed top-[64px] left-1/2 -translate-x-1/2 w-full max-w-[980px] mx-auto my-2 z-100 gap-6 bg-gray-100/95 border-2 border-gray-300/50 px-10 py-10 ">
          {uniqueCategories.map((item) => (
            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-black hover:text-blue-900 text-xl transition-colors duration-300"
              key={item}
              href={`/${item}`}
            >
              {item}
              <p className="text-red-500 text-lg">hello</p>
              {/* <div className="text-red-500 text-lg">
                {uniqueSubCategories.map((item) => (
                  <p key={item.id}>{item}</p>
                ))}
              </div> */}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
