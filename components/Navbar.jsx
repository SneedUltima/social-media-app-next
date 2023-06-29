"use client";
import React, { useState, useEffect } from "react";
import { BiHome } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
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
    <div className="w-[30%] h-screen px-2 py-5 border-r-2 flex flex-col justify-between">
      {session?.user ? (
        <div className="flex flex-col gap-2">
          <div className="profile flex items-center gap-2 border-b-2 pb-2">
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
              <p className="font-bold text-xs">{session?.user.name}</p>
              <p className=" text-xs text-gray-400">{session?.user.email}</p>
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
