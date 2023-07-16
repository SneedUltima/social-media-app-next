"use client";
import React, { useContext, useState } from "react";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { BsFaBars, FaBars } from "react-icons/fa";
import Logo from "../public/images/SocialBuzzLogo.svg";
import Image from "next/image";
import NavContext from "../context/NavContext";

const Header = ({ setBuzzes }) => {
  const { nav, setNav } = useContext(NavContext);
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

  const handleNav = () => {
    setNav(!nav);
    console.log(nav);
  };

  return (
    <div className="flex flex-col bg-[#181818]">
      <div className=" py-4 px-8 flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="flex items-center gap-6">
          <h1 className="font-bold text-2xl flex items-center justify-center">
            <span className="flex gap-1 text-white">
              <Image
                src={Logo}
                width={30}
                height={30}
                alt="profile image"
                className=" rounded-full mr-1"
              />
              Social
            </span>
            <span className=" text-[#FF4742]">Buzz</span>
          </h1>
          <div>
            <FaBars
              onClick={handleNav}
              className="text-gray-400 flex sm:hidden text-lg cursor-pointer"
            />
          </div>
        </div>
        <div>
          <input
            onChange={(e) => handleSearch(e)}
            value={searchTerm}
            className=" rounded-lg p-1 pl-5 border-2 border-[#2C2F35] relative bg-[#1F1E1E] text-white"
            type="text"
            placeholder="Search Buzzes..."
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
