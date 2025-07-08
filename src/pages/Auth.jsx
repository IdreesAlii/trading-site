import React from "react";
import { Link } from "react-router-dom";

const Auth = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
    <h2 className="text-2xl font-bold mb-4">Login</h2>
    <Link
      to="/dashboard"
      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
    >
      Login
    </Link>
  </div>
);

export default Auth;
