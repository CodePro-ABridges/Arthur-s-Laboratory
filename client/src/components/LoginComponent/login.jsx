import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthRoute.jsx";
import AuthModal from "../ModalComponents/authModal/authModal.jsx";

//TODO: find out why 500 error when trying to login.
const LoginForm = () => {
  //states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();

  const navigate = useNavigate();

  //handleSubmit
  const handleSubmit = async (e) => {
    e.preventDefault();
    //Clear previous errors.
    setError("");
    try {
      const { success, error } = await login(email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setError(error);
      }
    } catch (err) {
      //TODO: for some reason login failed is rendering when it's success.
      setError("Login failed", err);
    }
  };

  return (
    <div className="w-screen h-screen flex top-0 fixed justify-center items-center">
      {error && <AuthModal message={error} onClose={() => setError("")} />}
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
              value={email}
              placeholder="Enter the email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/*Password div*/}
          <div className="text-center mb-4">
            <label className="block mb-1">Password</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="password"
              name="password"
              value={password}
              placeholder="Enter the password"
              onChange={(e) => setPassword(e.target.value)}
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
