import Image from "next/image";
import React from "react";

const CreateBuzz = () => {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/images/avatar2.png"
        width={60}
        height={60}
        alt="profile image"
        className=" rounded-full"
      />
      <form>
        <textarea
          required
          cols="80"
          rows="2"
          placeholder="Send a buzz.."
          className="resize-none p-3 bg-gray-200"
        ></textarea>
      </form>
      <button className="bg-[rgb(28,101,243)] text-white px-3 py-1 rounded font-semibold hover:bg-[rgb(40,98,213)]">
        Buzz
      </button>
    </div>
  );
};

export default CreateBuzz;
