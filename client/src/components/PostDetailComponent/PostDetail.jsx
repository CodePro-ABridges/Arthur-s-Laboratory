import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthRoute.jsx";
import CommentFormModal from "../ModalComponents/CommentFormModalComponent/CommentFormModal.jsx";

const PostDetail = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const { fetchSinglePost, fetchComments } = useAuth();
  const { id } = useParams();

  const handleOpenCommentModal = () => {
    setIsCommentModalOpen(true);
  };

  const handleCloseCommentModal = () => {
    setIsCommentModalOpen(false);
  };

  const handleCommentAdded = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  useEffect(() => {
    const fetchData = async () => {
      const fetchedPost = await fetchSinglePost(id);
      setPost(fetchedPost);
      const fetchedComments = await fetchComments(id);
      setComments(fetchedComments);
    };

    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto p-4">
      {post && (
        <div className="bg-neutral-900 p-4 rounded-md">
          <h2 className="text-xl mb-3">{post.title}</h2>
          <p className="text-sm text-neutral-600 mb-2">
            Posted by user/{post.author.name} on{" "}
            {new Date(post?.createdAt).toLocaleString()}
          </p>
          <div className="text-neutral-400 mb-4">{post.body}</div>
        </div>
      )}
      <div className="mt-4">
        <h3 className="text-lg mb-2">Comments</h3>
        <div className="bg-neutral-800 p-4 rounded-md">
          {comments.length === 0 ? (
            <div className="text-neutral-600">No Comments yet</div>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="mb-2">
                <p className="text-neutral-400">{comment.body}</p>

                <p className="text-sm text-neutral-600">
                  {" "}
                  - {comment.author?.name}
                </p>
              </div>
            ))
          )}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-yellow-300 text-white rounded hover:bg-yellow-700"
          onClick={handleOpenCommentModal}
        >
          Add Comment
        </button>
        {isCommentModalOpen && (
          <CommentFormModal
            onClose={handleCloseCommentModal}
            postId={id}
            onCommentAdded={handleCommentAdded}
          />
        )}
      </div>
    </div>
  );
};

export default PostDetail;
