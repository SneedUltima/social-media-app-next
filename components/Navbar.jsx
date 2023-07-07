"use client";
import React, { useState, useEffect } from "react";
import { BiHome } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { RxExit } from "react-icons/rx";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Navbar = () => {
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
    <div className="bg-[#1F1E1E] w-[20%] px-5 py-5 flex flex-col justify-between">
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
              <p className="font-bold text-xs text-white">
                {session?.user.name}
              </p>
              <p className=" text-xs text-[#EBEBF5]">{session?.user.email}</p>
            </div>
          </div>
          <Link
            href="/"
            className="flex items-center gap-2 cursor-pointer hover:bg-gradient-to-b from-[#FF4742] from-[-100%] p-1 py-4 rounded text-[#BFBFBF] border-t-2 border-[#2C2F35]  hover:border-[#FF4742]"
          >
            <BiHome /> Home
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-2 cursor-pointer hover:bg-gradient-to-b from-[#FF4742] from-[-100%] p-1 py-4 rounded text-[#BFBFBF] border-t-2 border-[#2C2F35] hover:border-[#FF4742]"
          >
            <BsPerson /> Profile
          </Link>
          <div
            onClick={signOut}
            className="flex items-center gap-2 cursor-pointer hover:bg-gradient-to-b from-[#FF4742] from-[-100%] p-1 py-4 rounded text-[#BFBFBF] border-t-2 border-[#2C2F35]  hover:border-[#FF4742]"
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
                className="bg-[#FF4742] border-2 border-[#FF4742] w-fit text-[#181818] px-3 py-1 rounded font-semibold hover:bg-[#181818] hover:text-[#FF4742]"
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
