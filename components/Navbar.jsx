import React from "react";
import { BiHome } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="w-[30%] h-screen px-2 py-5 border-r-2 flex flex-col justify-between">
      <div className="flex flex-col gap-2">
        <div className="profile flex items-center gap-2 border-b-2 pb-2">
          <div>
            <Image
              src="/images/avatar2.png"
              width={40}
              height={40}
              alt="profile image"
              className=" rounded-full"
            />
          </div>
          <div className="pt-1">
            <p className="font-bold text-xs">John Smith</p>
            <p className=" text-xs text-gray-400">smith@mail.com</p>
          </div>
        </div>
        <Link
          href="/"
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-1 rounded text-gray-600"
        >
          <BiHome /> Home
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-2 cursor-pointer hover:bg-slate-100 p-1 rounded text-gray-600"
        >
          <BsPerson /> Profile
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
