"use client";
import React, { useState } from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BsSearch } from "react-icons/bs";

const Header = ({ setBuzzes }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = async (e) => {
    const term = e.target.value;
    setSearchTerm(e.target.value);

    if (term.length > 0 || term.length === 0) {
      const getBuzzes = await fetch(`/api/buzz/search/${term}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const getBuzzesJson = await getBuzzes.json();
      setBuzzes(getBuzzesJson);
    }
  };

  return (
    <div className=" bg-white py-2 px-4 border-b-2 flex justify-between">
      <div>
        <h1 className="font-bold text-2xl flex">
          <span className="flex gap-1 text-[rgb(31,41,55)]">
            <HiChatBubbleLeftRight />
            Social
          </span>
          <span className="text-[rgb(28,101,243)]">Buzz</span>
        </h1>
      </div>
      <div>
        <BsSearch className=" text-gray-400 absolute top-4 right-64 z-10" />
        <input
          onChange={(e) => handleSearch(e)}
          value={searchTerm}
          className=" border-2 border-gray-200 p-1 pl-10 relative"
          type="text"
          placeholder="Search Buzzes..."
        />
      </div>
    </div>
  );
};

export default Header;
