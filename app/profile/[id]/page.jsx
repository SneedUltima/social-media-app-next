import React from "react";
import Navbar from "@components/Navbar";

const Profile = () => {
  return (
    <div className="flex">
      <Navbar />
      <div className=" bg-[#f0f0f5] w-full h-screen flex flex-col items-start px-10 py-5">
        <h1 className="text-2xl font-bold">Your Profile</h1>
        <p>Display Name</p>
        <p>Avatar Image Url</p>
      </div>
    </div>
  );
};

export default Profile;
