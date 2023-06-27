import Image from "next/image";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fakeUser = {
  id: "6276d0c34ss2ce123f428b13ec",
  name: "Arnold Stallone",
  nickname: "terminator",
  picture: "https://i.pravatar.cc/150?img=50",
};

const CreateBuzz = ({ setBuzzes }) => {
  const [buzzText, setBuzzText] = useState("");

  const onSubmitBuzz = async () => {
    console.log("start");
    console.log(buzzText);
    const user = fakeUser;
    const buzz = {
      postedAt: Date.now(),
      body: buzzText,
      likes: [],
      user: {
        id: user.id,
        name: user.name,
        nickname: user.nickname,
        picture: user.picture,
      },
    };
    const response = await fetch("/api/buzz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(buzz),
    });

    const responseJson = await response.json();

    setBuzzes((buzzes) => [
      {
        _id: responseJson.insertId,
        ...buzz,
      },
      ...buzzes,
    ]);

    toast.success("Your buzz has been sent!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

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
          onChange={(e) => setBuzzText(e.target.value)}
          className="resize-none p-3 bg-gray-200"
        ></textarea>
      </form>
      <button
        onClick={onSubmitBuzz}
        className="bg-[rgb(28,101,243)] text-white px-3 py-1 rounded font-semibold hover:bg-[rgb(40,98,213)]"
      >
        Buzz
      </button>
    </div>
  );
};

export default CreateBuzz;
