"use client";
import React, { useState, useContext, useEffect } from "react";
import { BiHome } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { RxExit } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import NavContext from "../context/NavContext";

const Navbar = () => {
  const { nav, setNav } = useContext(NavContext);
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    };

    setUpProviders();
  });

  return (
    <div
      className={
        !nav
          ? "bg-[#1F1E1E] w-[25%] md:w-[20%] px-5 py-5 hidden sm:flex flex-col justify-between"
          : "bg-[#1F1E1E] px-5 py-5 flex flex-col justify-between left-0 top-14 w-[100%] h-full fixed z-50 ease-in duration-300"
      }
    >
      {session?.user ? (
        <div className="flex flex-col">
          <div className="profile flex flex-col items-center gap-2 pb-6">
            <div>
              <Image
                src={session?.user.image}
                width={40}
                height={40}
                alt="profile image"
                className=" rounded-full"
              />
            </div>
            <div className="pt-1">
              <p className="font-bold text-base sm:text-[9px] lg:text-xs text-white text-center sm:text-left">
                {session?.user.name}
              </p>
              <p className=" text-base sm:text-[9px] lg:text-xs text-[#EBEBF5]">
                {session?.user.email}
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer hover:bg-gradient-to-b from-[#FF4742] from-[-100%] p-1 py-4 rounded text-[#BFBFBF] border-t-2 border-[#2C2F35]  hover:border-[#FF4742] transition-colors text-[12px] text-base"
          >
            <BiHome /> Home
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-2 cursor-pointer hover:bg-gradient-to-b from-[#FF4742] from-[-100%] p-1 py-4 rounded text-[#BFBFBF] border-t-2 border-[#2C2F35] hover:border-[#FF4742] transition-colors text-[12px] text-base"
          >
            <BsPerson /> Profile
          </Link>
          <div
            onClick={signOut}
            className="flex items-center gap-2 cursor-pointer hover:bg-gradient-to-b from-[#FF4742] from-[-100%] p-1 py-4 rounded text-[#BFBFBF] border-t-2 border-[#2C2F35]  hover:border-[#FF4742] transition-colors text-[12px] text-base"
          >
            <RxExit /> Sign Out
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="bg-[#FF4742] border-2 border-[#FF4742] w-fit text-[#181818] px-3 py-1 rounded font-semibold hover:bg-[#181818] hover:text-[#FF4742] transition-all"
              >
                Sign In
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;
