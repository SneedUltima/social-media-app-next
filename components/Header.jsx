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
    <div className="flex flex-col bg-[#181818]">
      <div className=" py-4 px-4 flex justify-between">
        <div>
          <h1 className="font-bold text-2xl flex">
            <span className="flex gap-1 text-white">
              <HiChatBubbleLeftRight className="text-[#FF4742]" />
              Social
            </span>
            <span className=" text-[#FF4742]">Buzz</span>
          </h1>
        </div>
        <div>
          <BsSearch className=" text-gray-400 absolute top-6 right-64 z-10" />
          <input
            onChange={(e) => handleSearch(e)}
            value={searchTerm}
            className=" rounded-lg p-1 pl-10 border-2 border-[#2C2F35] relative bg-[#1F1E1E] text-white"
            type="text"
            placeholder="Search Buzzes..."
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
