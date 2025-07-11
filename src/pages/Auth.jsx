import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [showForm, setShowForm] = useState(false); // animation trigger

  const navigate = useNavigate();

  // ✅ Trigger entrance animation and redirect if already logged in
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      navigate("/dashboard");
    }

    const timeout = setTimeout(() => {
      setShowForm(true);
    }, 100);

    return () => clearTimeout(timeout);
  }, [navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isSignup) {
      const userExists = users.some((user) => user.username === username);
      if (userExists) {
        alert("Username already taken");
        return;
      }

      const newUser = { username, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(newUser));
      localStorage.setItem("isLoggedIn", "true");

      alert("Account created! Redirecting to dashboard...");
      navigate("/dashboard");
    } else {
      const validUser = users.find(
        (user) => user.username === username && user.password === password
      );
      if (validUser) {
        localStorage.setItem("currentUser", JSON.stringify(validUser));
        localStorage.setItem("isLoggedIn", "true");
        alert("Logged in successfully!");
        navigate("/dashboard");
      } else {
        alert("Invalid username or password");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">
      <h2
        className={`text-2xl font-bold mb-4 transition-all duration-500 ${
          showForm ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"
        }`}
      >
        {isSignup ? "Sign Up" : "Login"}
      </h2>

      <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
        {isSignup ? "Already have an account?" : "Don't have an account?"}
        <button
          onClick={() => setIsSignup(!isSignup)}
          className="text-blue-500 ml-1 underline"
          type="button"
        >
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>

      {showForm && (
        <form
          onSubmit={handleLogin}
          className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4 w-80 transition-all duration-500 animate-fade-in"
        >
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
          />

          <button
            type="submit"
            className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {isSignup ? "Create Account" : "Login"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Auth;