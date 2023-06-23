"use client";
import React from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BsSearch } from "react-icons/bs";

const Header = () => {
  return (
    <div className=" bg-white py-2 px-4 shadow-md flex justify-between">
      <div>
        <h1 className="font-bold text-2xl flex">
          <span className="flex gap-1">
            <HiChatBubbleLeftRight />
            Social
          </span>
          <span>Buzz</span>
        </h1>
      </div>
      <div>
        <BsSearch className=" text-gray-400 absolute top-4 right-64 z-10" />
        <input
          className=" border-2 border-gray-200 p-1 pl-10 relative"
          type="text"
          placeholder="Search Buzzes..."
        />
      </div>
    </div>
  );
};

export default Header;
