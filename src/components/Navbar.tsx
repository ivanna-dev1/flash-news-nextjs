"use client";
import React, { useState } from "react";
import Link from "next/link";
import { navCategories } from "../../arrayCategory";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const uniqueSubCategories = [
  //   ...new Set(uniqueCategories.map((item) => item.subcategory)),
  // ];
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
          {navCategories.map((categ) => (
            <ul
              onClick={() => setIsMenuOpen(false)}
              // className="text-black text-xl transition-colors duration-300"
              key={categ.slug}
            >
              <li className="text-black hover:text-blue-900 hover:underline text-xl transition-colors duration-300">
                <Link href={`/${categ.slug}`}>{categ.name}</Link>
              </li>
              {/* <p className="text-red-500 text-lg">hello</p> */}
              <ul className="text-gray-800  text-lg">
                {categ.subcategories.map((sub) => (
                  <li
                    onClick={() => setIsMenuOpen(false)}
                    className="text-gray-800 hover:text-blue-900 hover:underline text-lg"
                    key={sub.slug}
                  >
                    <Link href={`/${categ.slug}/${sub.slug}`}>
                      {sub.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </ul>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
