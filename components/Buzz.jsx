"use client";
import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { BsPencilSquare } from "react-icons/bs";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const Buzz = ({ buzz, setBuzzes }) => {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const [editText, setEditText] = useState("");
  const [pressDisabled, setPressDisabled] = useState(false);
  const { _id, postedAt, body, user: buzzUser } = buzz;

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
      theme: "light",
    });
  };

  console.log(buzzUser);
  console.log(buzz);
  console.log(session);

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
              className="rounded flex flex-col w-fit h-fit overflow-hidden p-5 bg-zinc-100  mb-20"
            >
              <div>
                <div className="flex justify-between">
                  <p>Edit your buzz</p>
                  <GrClose
                    onClick={() => setModalOpen(!modalOpen)}
                    className=" cursor-pointer"
                  />
                </div>
                <div className="flex flex-col items-center pt-4">
                  <textarea
                    cols="50"
                    rows="2"
                    placeholder="Edit buzz.."
                    onChange={(e) => setEditText(e.target.value)}
                    className="resize-none p-3 bg-gray-200"
                  >
                    {buzz.body}
                  </textarea>
                  <button
                    onClick={updateBuzz}
                    disabled={pressDisabled}
                    className="bg-[rgb(28,101,243)] text-white px-3 py-1 rounded font-semibold hover:bg-[rgb(40,98,213)] mt-4"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white rounded px-2 py-3 mx-5 w-[700px] lg:w-[1400px]">
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
              <p className="text-sm font-semibold">{buzzUser?.name}</p>
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
          <div className="flex gap-2">
            <AiOutlineHeart className=" cursor-pointer text-xl text-red-600" />
            {session?.user.id === buzzUser.id && (
              <BsPencilSquare
                onClick={() => setModalOpen(!modalOpen)}
                className=" cursor-pointer text-xl text-green-600"
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Buzz;
