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
    <div className="bg-[#242D4D] w-[20%] px-2 py-5 flex flex-col justify-between">
      {session?.user ? (
        <div className="flex flex-col">
          <div className="profile flex flex-col lg:flex-row items-center gap-2 pb-2">
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
            className="flex items-center gap-2 cursor-pointer hover:bg-gradient-to-b from-[#8016A7] from-[-100%] p-1 py-4 rounded text-[#fff] border-t-2 border-[#454B79]  hover:border-[#8016A7]"
          >
            <BiHome /> Home
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-2 cursor-pointer hover:bg-gradient-to-b from-[#8016A7] from-[-100%] p-1 py-4 rounded text-[#fff] border-t-2 border-[#454B79] hover:border-[#8016A7]"
          >
            <BsPerson /> Profile
          </Link>
          <div
            onClick={signOut}
            className="flex items-center gap-2 cursor-pointer hover:bg-gradient-to-b from-[#8016A7] from-[-100%] p-1 py-4 rounded text-[#fff] border-t-2 border-[#454B79]  hover:border-[#8016A7]"
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
                className="bg-[rgb(28,101,243)] w-fit text-white px-3 py-1 rounded font-semibold hover:bg-[rgb(40,98,213)]"
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
