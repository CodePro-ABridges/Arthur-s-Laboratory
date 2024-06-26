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
import CommentFormModal from "./components/ModalComponents/CommentFormModalComponent/CommentFormModal.jsx";
import "./index.css";

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  const handlePostOpenModal = () => {
    setIsPostModalOpen(true);
  };

  const handlePostCloseModal = () => {
    setIsPostModalOpen(false);
  };

  const handleCommentOpenModal = () => {
    setIsCommentModalOpen(true);
  };

  const handleCommentCloseModal = () => {
    setIsCommentModalOpen(false);
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
              <Route
                path="/post/:id"
                element={
                  <PostDetail handleCommentOpenModal={handleCommentOpenModal} />
                }
              />
            </Routes>
          </section>
        </Router>
        {isPostModalOpen && <PostFormModal onClose={handlePostCloseModal} />}
        {isCommentModalOpen && (
          <CommentFormModal onClose={handleCommentCloseModal} />
        )}
      </main>
    </AuthProvider>
  );
}

export default App;
