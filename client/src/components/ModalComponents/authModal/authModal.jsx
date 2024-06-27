import React from "react";

const AuthModal = ({ message, onClose }) => {
  return (
    <>
      <div
        className="flex absolute top-0 w-screen h-screen z-99 justify-center items-center rounded"
        style={{ backgroundColor: "rgba(0,0,0,.6)" }}
        onClick={onClose}
      >
        <div className="border border-neutral-700 bg-white p-5 text-black mx-4 self-center rounded">
          <h1 className="text-xl font-semibold">Error</h1>
          <p className="mt-2">{message}</p>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default AuthModal;
