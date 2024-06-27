import React, { useState } from "react";
import { useAuth } from "../../../context/AuthRoute.jsx";
import AuthModal from "../authModal/authModal.jsx";

const PostFormModal = ({ onClose }) => {
  //state
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const { createPost } = useAuth();

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    if (!title || !body) {
      setError("Please fill in all fields");
      return;
    }
    try {
      const { success, error: createPostError } = await createPost({
        title,
        body,
      });
      if (success) {
        onClose();
      } else {
        setError(createPostError);
      }
    } catch (err) {
      setError("Post creation failed: " + err.message);
    }
  };

  return (
    <>
      <div
        className="flex fixed top-0 w-screen h-screen z-20 justify-center items-center rounded"
        style={{ backgroundColor: "rgba(0,0,0,.8)" }}
        onClick={onClose}
      >
        {error && <AuthModal message={error} onClose={() => setError("")} />}

        <div
          className="border border-neutral-700 bg-neutral-700 p-5 mx-auto self-center rounded w-3/4 md:w-2/4"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handlePostSubmit}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              className="bg-blend-darken text-black p-2 border border-neutral-700 rounded-md block w-full mb-3"
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              value={body}
              className="bg-blend-darken text-black p-2 border border-neutral-700 rounded-md block w-full"
              placeholder="Text (required)"
              onChange={(e) => setBody(e.target.value)}
            />
            <div className="text-center">
              <button
                className="mt-4 px-4 py-2 mr-3 bg-red-500 text-white rounded hover:bg-red-700"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-700"
                type="submit"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default PostFormModal;
