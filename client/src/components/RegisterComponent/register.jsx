import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthRoute.jsx";
import AuthModal from "../ModalComponents/authModal/authModal.jsx";

const RegisterForm = () => {
  //States
  const [registerForm, setRegisterForm] = useState({
    email: "",
    name: "",
    password: "",
    passwordConfirmation: "",
    errorState: "",
  });

  const { register } = useAuth();

  //Navigation.
  const navigate = useNavigate();

  //Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //Set error state
  const setErrorState = (message) => {
    setRegisterForm((prev) => ({ ...prev, errorState: message }));
  };

  //submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, name, password, passwordConfirmation } = registerForm;

    //Clear previous errors.
    setErrorState("");

    //Validations
    if (!email) {
      setErrorState("Email is required");
      return;
    }
    if (!name) {
      setErrorState("Name is required");
      return;
    }
    if (password !== passwordConfirmation) {
      setErrorState("Passwords do not match");
      return;
    }

    try {
      const { success, error } = await register(name, email, password);
      if (success) {
        navigate("/dashboard");
      } else {
        setErrorState(error);
      }
    } catch (err) {
      setErrorState(`Registration failed: ${err.message}`);
    }
  };

  return (
    <div className="w-screen h-screen flex top-0 justify-center items-center">
      {registerForm.errorState && (
        <AuthModal
          message={registerForm.errorState}
          onClose={() => setErrorState("")}
        />
      )}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-neutral-700 w-3/4 sm:w-1/2 md:w-1/3">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl mb-5 text-center">Register</h1>

          <div className="text-center mb-4">
            <label className="block mb-1">Email</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="email"
              name="email"
              placeholder="Enter the email"
              value={registerForm.email}
              onChange={handleChange}
            />
          </div>

          <div className="text-center mb-4">
            <label className="block mb-1">Username</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="text"
              name="name"
              placeholder="Enter the username"
              value={registerForm.name}
              onChange={handleChange}
            />
          </div>

          <div className="text-center mb-4">
            <label className="block mb-1">Password</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="password"
              name="password"
              placeholder="Enter the password"
              value={registerForm.password}
              onChange={handleChange}
            />
          </div>

          <div className="text-center mb-4">
            <label className="block mb-1">Confirm Password</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm password"
              value={registerForm.passwordConfirmation}
              onChange={handleChange}
            />
          </div>

          <div className="text-center">
            <button
              className="bg-yellow-400 text-white px-4 py-2 rounded hover:bg-yellow-500 w-full"
              type="submit"
            >
              Register
            </button>
          </div>

          <div className="text-center mt-4">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already have an account? Click here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
