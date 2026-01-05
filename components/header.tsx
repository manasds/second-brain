"use client";
import React, { useState } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import Form from "./input-form";
function Header() {
  const [isOpen, setisOpen] = useState(false);
  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm justify-center w-full flex items-center">
          <div
            className="w-96"
            onClick={(e) => e.stopPropagation}
          >
            <div
              className="absolute inset-0 -z-10"
              onClick={() => setisOpen(false)}
            />
            <Form setisOpen = {setisOpen} />
          </div>
        </div>
      )}
      <header className="flex justify-between p-3.5 border-b-2 border-gray-300">
        <h1 className="font-medium ml-3.5">All notes</h1>
        <div className="flex justify-between gap-2.5">
          <button className="text-violet-800 bg-violet-200 px-5  py-2 rounded-md flex items-center gap-2 hover:bg-violet-300 cursor-pointer">
            <IoShareSocialOutline />
            Share Brain
          </button>
          <button
            onClick={() => {
              setisOpen(true);
            }}
            className="px-7 py-2 rounded-md bg-blue-600 text-white flex items-center gap-2 text-sm cursor-pointer hover:bg-blue-800 "
          >
            <FaPlus />
            Add Content
          </button>
        </div>
      </header>
    </div>
  );
}

export default Header;
