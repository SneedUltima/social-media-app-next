import Image from "next/image";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Buzz = ({ buzz, setBuzzes }) => {
  const { _id, postedAt, body, user: buzzUser } = buzz;

  return (
    <div className="bg-white rounded px-2 py-3 mx-5 w-[1400px]">
      <div className="top flex gap-2">
        <div className="left">
          <img
            src={buzzUser.picture}
            width={60}
            height={60}
            alt={buzzUser.name}
            className=" rounded-full"
          />
        </div>
        <div className="right flex flex-col gap-2">
          <div className="top pt-1">
            <p className="text-sm font-semibold">{buzzUser.nickname}</p>
            <p className="text-sm text-gray-400">
              {new Date(postedAt).toLocaleString()}
            </p>
          </div>
          <div className="bottom py-6">
            <p>{body}</p>
          </div>
        </div>
      </div>
      <div className="bottom flex justify-between items-center py-3 px-2 border-t-2">
        <p className="text-gray-400 text-sm">1 person liked this</p>
        <AiOutlineHeart className=" cursor-pointer" />
      </div>
    </div>
  );
};

export default Buzz;
