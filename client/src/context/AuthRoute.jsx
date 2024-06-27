import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //states
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  //state for fetching all comments
  const [comments, setComments] = useState([]);

  //state for fetching all post
  const [posts, setPosts] = useState([]);

  //state for fetching single Post.
  const [post, setPost] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      getUser();
      fetchAllPosts();
    }
  }, []);

  //CREATING //

  //Create post
  const createPost = async (post) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3000/api/createpost",
        { ...post },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      fetchAllPosts();
      return { success: true };
    } catch (err) {
      console.error("AuthContext Error creating post: ", err);
      return {
        success: false,
        error: err.response?.data?.error || err.message,
      };
    }
  };

  //create Comment
  const createComment = async (postId, body, parentId = null) => {
    try {
      /*  console.log("Authroute POSTID: ", postId); */
      //TODO: put conditional for better error handling.
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:3000/api/post/${postId}/comment`,
        { body, parentId },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      fetchComments(postId);
      return { success: true, data: response.data };
    } catch (err) {
      console.error("Error creating comment: ", err);
      return { success: false, error: err.response.data.error };
    }
  };

  //FETCHING //

  //FetchUser
  const getUser = async () => {
    try {
      const token = localStorage.getItem("token");
      //Token is coming in.
      /* console.log("Debug Token: ", token); */
      //conditional
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get("http://localhost:3000/api/fetchuser", {
        headers: { Authorization: `Bearer ${token}` },
      });
      /*    console.log("response: ", response.data); */
      setUser(response.data);
    } catch (err) {
      console.error("Auth Error fetching user: ", err);
    }
  };

  //Fetch Posts
  //TODO: find out why when condition for response === 200 it doesnt go into condition statement.
  const fetchAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getposts");

      setPosts(response.data);
    } catch (err) {
      console.error("Error fetching posts: ", err);
    }
  };

  //fetch single post
  const fetchSinglePost = async (id) => {
    try {
      //Authentication Check
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3000/api/post/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPost(response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching post: ", err);
    }
  };

  //FetchAllComments
  const fetchComments = async (postId) => {
    try {
      //Authentication Check
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:3000/api/post/${postId}/comments`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      setComments(response.data);
      return response.data;
    } catch (err) {
      console.error("Error fetching comments: ", err);
    }
  };

  //USER LOGIN, LOGOUT, REGISTER //

  //Register
  const register = async (name, email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/api/register", {
        name,
        email,
        password,
      });
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
        getUser();
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.response.data.error };
    }
  };

  //Login
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setIsAuthenticated(true);
        getUser();
        return { success: true };
      }
    } catch (err) {
      return { success: false, error: err.response.data.error };
    }
  };

  //logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        register,
        user,
        fetchAllPosts,
        fetchSinglePost,
        posts,
        createPost,
        fetchComments,
        createComment,
        comments,
        post,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
