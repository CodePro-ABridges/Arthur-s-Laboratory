import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthRoute.jsx";
import AuthModal from "../ModalComponents/authModal/authModal.jsx";

const RegisterForm = () => {
  //States
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();

  const navigate = useNavigate();

  //submit the form
  const handleSubmit = async (e) => {
    //Wipe the form
    e.preventDefault();
    //Clear previous errors.
    setError("");
    //Conditional for not entering an email.
    if (!email) {
      setError("Email is required");
      return;
    }
    //Conditional for not entering username
    if (!name) {
      setError("Name is required");
      return;
    }
    //conditional for password === passwordConfirmation
    if (password !== passwordConfirmation) {
      setError("Passwords do not match");
      return;
    }
    //nested try that when registered it'll log them in after register.
    try {
      const { success, error } = await register(name, email, password);
      //conditional for registering the user then sending them to dashboard.
      if (success) {
        //TODO: Change to dashboard when Dashboard component is finished.
        navigate("/dashboard");
      } else {
        setError(error);
      }
    } catch (err) {
      setError("Registration failed: ", err);
    }
  };

  //render the form
  return (
    <div className="w-screen h-screen flex top-0 justify-center items-center">
      {error && <AuthModal message={error} onClose={() => setError("")} />}
      <div className="bg-white p-6 rounded-lg shadow-lg border border-neutral-700 w-3/4 sm:w-1/2 md:w-1/3">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl mb-5 text-center">Register</h1>
          {/**/}
          {/*Email div*/}
          <div className="text-center mb-4">
            <label className="block mb-1">Email</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="email"
              name="email"
              placeholder="Enter the email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {/*name div*/}
          <div className="text-center mb-4">
            <label className="block mb-1">Username</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="text"
              name="name"
              placeholder="Enter the username"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          {/*Password div*/}
          <div className="text-center mb-4">
            <label className="block mb-1">Password</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="password"
              name="password"
              placeholder="Enter the password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/*Password confirmation div*/}
          <div className="text-center mb-4">
            <label className="block mb-1">Confirm Password</label>
            <input
              className="mb-3 w-full rounded items-center border border-gray-300 p-2"
              type="password"
              name="passwordConfirmation"
              placeholder="Confirm password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
            />
          </div>
          {/*Button submit div*/}
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
