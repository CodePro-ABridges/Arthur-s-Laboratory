import React, { useState } from "react";
import { useAuth } from "../../../context/AuthRoute.jsx";

const CommentFormModal = ({ onClose, postId }) => {
  const [body, setBody] = useState("");
  const { createComment } = useAuth();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log("CommentForm PostID: ", postId);
    try {
      await createComment(postId, body);
      onClose();
    } catch (err) {
      console.error("Error in CommentFormModal: ", err);
    }
  };

  return (
    <>
      <div
        className="flex absolute top-0 w-screen h-screen z-20 justify-center items-center rounded"
        style={{ backgroundColor: "rgba(0,0,0,.8)" }}
        onClick={onClose}
      >
        <div
          className="border border-neutral-700 bg-neutral-700 p-5 mx-auto self-center rounded w-3/4 md:w-2/4"
          onClick={(e) => e.stopPropagation()}
        >
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={body}
              className="bg-blend-darken text-black p-2 border border-neutral-700 rounded-md block w-full"
              placeholder="Text (required)"
              onChange={(e) => setBody(e.target.value)}
            />
            <div className="text-center">
              <button
                className="mt-4 px-4 py-2 bg-yellow-300 text-white rounded hover:bg-yellow-700"
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

export default CommentFormModal;
