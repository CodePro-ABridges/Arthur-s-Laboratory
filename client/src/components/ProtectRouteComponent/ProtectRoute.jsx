import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthRoute.jsx";

const ProtectedRoute = ({ element: Component }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? Component : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
