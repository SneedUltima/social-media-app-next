"use client";
import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { GrClose } from "react-icons/gr";
import { BsPencilSquare } from "react-icons/bs";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const Buzz = ({ buzz, setBuzzes }) => {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const [pressDisabled, setPressDisabled] = useState(false);
  const { _id, postedAt, likes, body, user: buzzUser } = buzz;
  const [likesState, setLikesState] = useState(likes);

  const updateBuzz = async () => {
    setPressDisabled(true);

    const response = await fetch("/api/buzz", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, body: editText }),
    });

    const responseJson = await response.json();

    setBuzzes((buzzes) =>
      buzzes.map((buzz) => {
        if (buzz._id === _id) {
          return {
            ...buzz,
            body: editText,
          };
        }
        return buzz;
      })
    );

    setPressDisabled(false);
    setModalOpen(!modalOpen);

    toast.success("Your buzz has been updated!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const likeBuzz = async () => {
    let action = likesState.includes(session.user.id) ? "$pull" : "$addToSet";

    await fetch("/api/buzz/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ _id, userId: session.user.id, action }),
    });

    setLikesState((likes) => {
      if (likesState.includes(session.user.id)) {
        return likes.filter((like) => like !== session.user.id);
      }
      return [...likes, session.user.id];
    });
  };

  const deleteBuzz = async (id) => {
    const response = await fetch(`/api/buzz/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    setBuzzes((buzzes) => buzzes.filter((buzz) => buzz._id !== _id));

    toast.success("Your buzz has been deleted!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  return (
    <>
      {modalOpen && (
        <div className="container transition-all duration-200 ease-in-out">
          <div
            onClick={() => setModalOpen(!modalOpen)}
            className="fixed top-0 left-0 h-screen w-screen z-40 bg-neutral-900/70 flex items-center justify-center"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="rounded flex flex-col w-fit h-fit overflow-hidden p-5 bg-[#222222] border-2 border-[#2C2F35]  mb-20"
            >
              <div>
                <div className="flex justify-between">
                  <p className="text-white font-semibold">Edit your buzz</p>
                  <GrClose
                    onClick={() => setModalOpen(!modalOpen)}
                    className=" cursor-pointer text-white"
                  />
                </div>
                <div className="flex flex-col items-center pt-4">
                  <textarea
                    cols="50"
                    rows="2"
                    placeholder="Edit buzz.."
                    onChange={(e) => setEditText(e.target.value)}
                    className="resize-none p-3 bg-[#181818] text-white"
                    defaultValue={buzz.body}
                  ></textarea>
                  <button
                    onClick={updateBuzz}
                    disabled={pressDisabled}
                    className="bg-[#FF4742] border-2 border-[#FF4742] text-[#181818]  px-3 py-1 rounded font-semibold hover:bg-[#181818] hover:text-[#FF4742] ease-in-out mt-3"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-[#222222] border-2 border-[#2C2F35] shadow-md rounded px-6 py-4 mx-5 w-[700px] lg:w-[1600px]">
        <div className="top flex gap-2">
          <div className="left min-w-[60px]">
            <img
              src={buzzUser?.image}
              alt={buzzUser?.name}
              className=" rounded-full w-[60px] h-[60px]"
            />
          </div>
          <div className="right flex flex-col gap-2">
            <div className="top pt-1">
              <p className="text-sm font-semibold text-white">
                {buzzUser?.name}
              </p>
              <p className="text-sm text-gray-400">
                {new Date(postedAt).toLocaleString()}
              </p>
            </div>
            <div className="bottom py-6 text-white">
              <p>{body}</p>
            </div>
          </div>
        </div>
        <div className="bottom flex justify-between items-center py-3 px-2 border-t-2 border-[#2C2F35] ">
          <p className="text-gray-400 text-sm">
            {likesState ? likesState.length : 0}{" "}
            {` ${likesState.length === 1 ? "person" : "people"} liked this`}
          </p>
          <div className="flex gap-2">
            {session && (
              <>
                {likesState.includes(session.user.id) ? (
                  <AiFillHeart
                    onClick={() => likeBuzz()}
                    className=" cursor-pointer text-xl text-red-600"
                  />
                ) : (
                  <AiOutlineHeart
                    onClick={() => likeBuzz()}
                    className=" cursor-pointer text-xl text-[#FF4742]"
                  />
                )}
              </>
            )}
            {session?.user.id === buzzUser.id && (
              <div className="flex items-center gap-2">
                <BsPencilSquare
                  onClick={() => setModalOpen(!modalOpen)}
                  className=" cursor-pointer text-xl text-green-500"
                />
                <ImBin
                  onClick={() => deleteBuzz(buzz._id)}
                  className=" cursor-pointer text-[#FF4742]"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Buzz;
