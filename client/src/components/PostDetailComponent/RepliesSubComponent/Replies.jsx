import React from "react";

export const renderReplies = (comments, parentId, handleOpenCommentModal) => {
  //Checking to see if comments is defined before accessing.
  if (!Array.isArray(comments)) {
    return null;
  }

  return comments
    .filter((c) => c.parent && c.parent._id === parentId)
    .map((reply) => (
      <div key={reply._id} className="ml-6">
        <p className="text-neutral-400">{reply.body}</p>
        <p className="text-sm text-neutral-600">
          {" "}
          - {reply.author?.name} at {new Date(reply.createdAt).toLocaleString()}
        </p>
        <div className="flex justify-center">
          <button
            className="mt-2 px-2 bg-neutral-700 text-white rounded hover:bg-neutral-500"
            onClick={() => handleOpenCommentModal(reply._id)}
          >
            Reply
          </button>
        </div>
        {renderReplies(comments, reply._id, handleOpenCommentModal)}
      </div>
    ));
};
