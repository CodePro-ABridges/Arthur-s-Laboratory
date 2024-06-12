import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  //state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      getUser(); //fetch user when the component mounts.
      fetchAllPosts(); //fetch posts when the component mounts.
    }
  }, []);

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
        posts,
        createPost,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
