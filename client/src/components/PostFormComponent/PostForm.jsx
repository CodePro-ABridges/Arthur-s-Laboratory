import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../../assets/JimmyNeutron.png";

const PostForm = () => {
  return (
    <>
      <div className="px-6 py-4 text-gray-200 border border-neutral-700 rounded-md">
        <div className=" bg-black border border-neutral-800 rounded-md p-2 flex">
          <div className="rounded-full bg-neutral-500 overflow-hidden w-8 h-8">
            <img src={Logo} alt="User's Avatar" />
          </div>
          <form className="flex-grow bg-neutral-500 border border-neutral-800 ml-4 rounded-md">
            <input
              type="text"
              className="bg-neutral-500 p-2 px-3 text-sm block w-full rounded-md"
              placeholder="New Post"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default PostForm;
