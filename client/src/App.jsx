import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthRoute.jsx";
import ProtectedRoute from "./components/ProtectRouteComponent/ProtectRoute.jsx";
import NavigationBar from "./components/NavComponent/NavBar.jsx";
import Home from "./pages/Home/Home.jsx";
import PostFormModal from "./components/ModalComponents/PostFormModalComponent/PostFormModal.jsx";
import PostDetail from "./components/PostDetailComponent/PostDetail.jsx";
import Dashboard from "./components/DashboardComponent/Dashboard.jsx";
import RegisterForm from "./components/RegisterComponent/register.jsx";
import LoginForm from "./components/LoginComponent/login.jsx";
import Footer from "./components/footer/Footer.jsx";
import "./index.css";

function App() {
  //State
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  //
  const handlePostOpenModal = () => {
    setIsPostModalOpen(true);
  };

  const handlePostCloseModal = () => {
    setIsPostModalOpen(false);
  };

  return (
    <AuthProvider>
      <main className="w-full h-screen flex flex-row relative">
        <Router>
          <NavigationBar
            isNavOpen={isNavOpen}
            setIsNavOpen={setIsNavOpen}
            handlePostOpenModal={handlePostOpenModal}
          />
          <section
            className={`flex flex-col p-6 ${
              isNavOpen ? "ml-64" : "ml-10"
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
              <Route path="/post/:id" element={<PostDetail />} />
            </Routes>
            <Footer />
          </section>
        </Router>
        {isPostModalOpen && <PostFormModal onClose={handlePostCloseModal} />}
      </main>
    </AuthProvider>
  );
}

export default App;
