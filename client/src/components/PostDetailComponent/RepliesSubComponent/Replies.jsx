import React from "react";

export const renderReplies = (comments, parentId, handleOpenCommentModal) => {
  return comments
    .filter((c) => c.parent && c.parent._id === parentId)
    .map((reply) => (
      <div key={reply._id} className="">
        <p>{reply.body}</p>
        <p>
          {" "}
          - {reply.author?.name} at {new Date(reply.createdAt).toLocaleString()}
        </p>
        <button
          className="mt-2 px-2 bg-neutral-700 text-white rounded hover:bg-neutral-500"
          onClick={() => handleOpenCommentModal(reply._id)}
        >
          Reply
        </button>
        {renderReplies(comments, reply._id, handleOpenCommentModal)}
      </div>
    ));
};
