import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthRoute.jsx";
import AuthModal from "../ModalComponents/authModal/authModal.jsx";

//TODO: find out why 500 error when trying to login.
const LoginForm = () => {
  //states
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    errorState: "",
  });
  //
  const { login } = useAuth();

  //Navigation
  const navigate = useNavigate();

  //set error state
  const setErrorState = (message) => {
    setLoginForm((prev) => ({
      ...prev,
      errorState: message,
    }));
  };

  //Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginForm;

    //Clear previous errors.
    setErrorState("");
    try {
      const { success, error } = await login(email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setErrorState(error);
      }
    } catch (err) {
      //TODO: for some reason login failed is rendering when it's success.
      setErrorState("Login failed", err);
    }
  };

  return (
    <div className="w-screen h-screen flex top-0 fixed justify-center items-center">
      {loginForm.errorState && (
        <AuthModal
          message={loginForm.errorState}
          onClose={() => setErrorState("")}
        />
      )}
      <div className=" bg-white p-6 rounded-lg shadow-lg border border-neutral-700 w-3/4 sm:w-1/2 md:w-1/3">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl mb-5 text-center">Login</h1>
          {/**/}
          {/*Email div*/}
          <div className="text-center mb-4">
            <label className="block mb-1">Email</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="email"
              name="email"
              value={loginForm.email}
              placeholder="Enter the email"
              onChange={handleChange}
            />
          </div>
          {/*Password div*/}
          <div className="text-center mb-4">
            <label className="block mb-1">Password</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="password"
              name="password"
              value={loginForm.password}
              placeholder="Enter the password"
              onChange={handleChange}
            />
          </div>
          {/*button div*/}
          <div className="text-center">
            <button
              type="submit"
              className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 w-full"
            >
              Login
            </button>
          </div>

          <div className="text-center mt-4">
            <Link to="/register" className="text-blue-500 hover:underline">
              Click here to create an account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
