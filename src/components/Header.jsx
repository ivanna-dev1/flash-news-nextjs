import React from "react";
import Link from "next/link";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="flex justify-between items-center sticky top-0 z-50 bg-gray-800 text-white p-4">
      <Navbar />
      <Link href="/">
        <h2 className="text-3xl font-bold">FLASHNEWS</h2>
      </Link>
      <div>
        <input
          className="text-white px-4 py-2  border border-gray-700 rounded"
          type="text"
          placeholder="Search"
        />
        <button className="bg-gray-700 text-white px-4 py-2 rounded">
          Search
        </button>
      </div>
    </header>
  );
};

export default Header;
