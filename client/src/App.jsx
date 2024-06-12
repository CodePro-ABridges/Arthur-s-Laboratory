import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthRoute.jsx";
import ProtectedRoute from "./components/ProtectRouteComponent/ProtectRoute.jsx";
import NavigationBar from "./components/NavComponent/NavBar.jsx";
import Home from "./pages/Home/Home.jsx";
import PostFormModal from "./components/ModalComponents/PostFormModalComponent/PostFormModal.jsx";
import Dashboard from "./components/DashboardComponent/Dashboard.jsx";
import RegisterForm from "./components/RegisterComponent/register.jsx";
import LoginForm from "./components/LoginComponent/login.jsx";
import "./index.css";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AuthProvider>
      <main className="w-full h-screen flex flex-row relative">
        <Router>
          <NavigationBar
            isNavOpen={isNavOpen}
            setIsNavOpen={setIsNavOpen}
            handleOpenModal={handleOpenModal}
          />
          <section
            className={`flex flex-col p-10 ${
              isNavOpen ? "ml-64" : "ml-20"
            } w-full gap-5 transition-all duration-500`}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/dashboard"
                element={<ProtectedRoute element={<Dashboard />} />}
              />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
            </Routes>
          </section>
        </Router>
        {isModalOpen && <PostFormModal onClose={handleCloseModal} />}
      </main>
    </AuthProvider>
  );
}

export default App;
