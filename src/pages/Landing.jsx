
import React from "react";
import { Link } from "react-router-dom";

const Landing = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-purple-200 dark:from-gray-900 dark:to-black">
    <h1 className="text-4xl font-bold mb-4">Welcome to TradingSite</h1>
    <Link
      to="/auth"
      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
    >
      Get Started
    </Link>
  </div>
);

export default Landing;
