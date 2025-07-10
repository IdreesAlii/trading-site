import React from "react";
import { Navigate } from "react-router-dom";

// children = the component you want to show (e.g. Dashboard)
// This wrapper checks if currentUser exists
const ProtectedRoute = ({ children }) => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  if (!currentUser) {
    // if no logged-in user, redirect to login
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
