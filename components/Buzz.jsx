"use client";
import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { ImBin } from "react-icons/im";
import { GrClose } from "react-icons/gr";
import { BsPencilSquare } from "react-icons/bs";
import { toast } from "react-toastify";

const Buzz = ({ buzz, setBuzzes }) => {
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

  const deleteBuzz = async () => {
    console.log(_id);
    const response = await fetch(`/api/buzz/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const responseJson = await response.json();

    toast.error("Your buzz has been deleted!", {
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
                    defaultValue={buzz.body}
                    onChange={(e) => setEditText(e.target.value)}
                    className="resize-none p-3 bg-gray-200"
                  ></textarea>
                  <button
                    onClick={updateBuzz}
                    disabled={pressDisabled}
                    className="bg-[rgb(28,101,243)] text-white px-3 py-1 rounded font-semibold hover:bg-[rgb(40,98,213)] active:bg-gray-600 focus:bg-gray-600 mt-4"
                  >
                    Update
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white rounded px-2 py-3 mx-5 w-[1400px]">
        <div className="top flex gap-2">
          <div className="left min-w-[60px]">
            <img
              src={buzzUser?.picture}
              alt={buzzUser?.name}
              className=" rounded-full w-[60px] h-[60px]"
            />
          </div>
          <div className="right flex flex-col gap-2">
            <div className="top pt-1">
              <p className="text-sm font-semibold">{buzzUser?.nickname}</p>
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
          <div className="flex items-center gap-2">
            <AiOutlineHeart className=" cursor-pointer text-xl text-red-600" />
            <BsPencilSquare
              onClick={() => setModalOpen(!modalOpen)}
              className=" cursor-pointer text-xl text-green-600"
            />
            <ImBin
              onClick={deleteBuzz}
              className=" cursor-pointer text-red-600"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Buzz;
