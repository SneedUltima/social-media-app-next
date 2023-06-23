import Image from "next/image";
import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const Buzz = () => {
  return (
    <div className="bg-white rounded px-2 py-3 mx-5">
      <div className="top flex gap-2">
        <div className="left">
          <Image
            src="/images/avatar2.png"
            width={80}
            height={80}
            alt="profile image"
            className=" rounded-full"
          />
        </div>
        <div className="right flex flex-col gap-2">
          <div className="top pt-1">
            <p className="text-sm font-semibold">John Smith</p>
            <p className="text-sm text-gray-400">03/33/45, 4:45:11 PM</p>
          </div>
          <div className="bottom py-4">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla
              quos possimus labore libero. Voluptatem voluptatum exercitationem
              alias reiciendis assumenda, tempore explicabo quae distinctio.
              Vel, eos!
            </p>
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
