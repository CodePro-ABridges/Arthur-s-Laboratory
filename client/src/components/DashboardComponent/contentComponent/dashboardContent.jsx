import React, { useEffect } from "react";
import { useAuth } from "../../../context/AuthRoute.jsx";
import { Link } from "react-router-dom";
const MainContent = () => {
  const { posts, fetchAllPosts } = useAuth();

  useEffect(() => {
    fetchAllPosts();
  }, []);

  console.log("Posts structure", posts);
  return (
    <div className="px-6 text-neutral-400">
      {posts.length === 0 ? (
        <div className="border border-neutral-600 bg-neutral-900 mt-4 p-2 rounded-md">
          <div className="text-center text-neutral-600 text-sm">No Posts</div>
        </div>
      ) : (
        posts.map((post) => (
          <Link
            key={post._id}
            to={`/post/${post._id}`}
            className="block border border-neutral-600 hover:border-yellow-200 bg-neutral-900 mt-4 p-4 rounded-md mb-4 cursor-pointer"
          >
            <h5 className="text-neutral-600 text-sm mb-2">
              Posted by{" "}
              {post.author ? (
                <>user/{post.author.name}</>
              ) : (
                <span className="italic">deleted user </span>
              )}{" "}
              on {new Date(post.createdAt).toLocaleString()}
            </h5>
            <h2 className="text-xl mb-3">{post.title}</h2>
            <div className="text-sm leading-6">{post.body}</div>
          </Link>
        ))
      )}
    </div>
  );
};

export default MainContent;
