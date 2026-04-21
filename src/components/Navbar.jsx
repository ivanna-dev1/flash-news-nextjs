"use client";
import React, { useState } from "react";
import Link from "next/link";
import { news } from "../../arrayFakeNews";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const uniqueCategories = [...new Set(news.map((item) => item.category))];
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
          {uniqueCategories.map((categ) => (
            <ul
              onClick={() => setIsMenuOpen(false)}
              // className="text-black text-xl transition-colors duration-300"
              key={categ}
              href={`/${categ}`}
            >
              <li className="text-black hover:text-blue-900 hover:underline text-xl transition-colors duration-300">
                <Link href={`/${categ}`}>{categ}</Link>
              </li>
              {/* <p className="text-red-500 text-lg">hello</p> */}
              <ul className="text-gray-800  text-lg">
                {news
                  .filter((newsItem) => newsItem.category === categ)
                  .map((newsItem) => (
                    <li
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-800 hover:text-blue-900 hover:underline text-lg"
                      key={newsItem.id}
                    >
                      <Link href={`/${categ}/${newsItem.subcategory}`}>
                        {newsItem.subcategory}
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
