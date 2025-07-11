
import React from "react";
import { Navigate } from "react-router-dom";

// Wrapper to protect routes like Dashboard, Settings, etc.
const ProtectedRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Redirect to /auth if not logged in or no user found
  if (!currentUser || isLoggedIn !== "true") {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
