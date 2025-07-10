import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // redirect hook

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateRight, setAnimateRight] = useState(false);

  const navigate = useNavigate();

  // Auto redirect if user already logged in
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      navigate("/dashboard");
    }

    setAnimateLeft(true);
    setAnimateRight(true);
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

      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify({ username })); // auto-login
      alert("Account created and logged in!");
      navigate("/dashboard");
    } else {
      const validUser = users.find(
        (user) => user.username === username && user.password === password
      );
      if (validUser) {
        localStorage.setItem("currentUser", JSON.stringify({ username }));
        alert("Logged in successfully!");
        navigate("/dashboard");
      } else {
        alert("Invalid username or password");
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      <h2
        className={`text-2xl font-bold mb-4 text-black dark:text-white ${
          animateLeft ? "animate-slideInLeft" : "opacity-0"
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

      <form
        onSubmit={handleLogin}
        className={`bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4 w-80 ${
          animateRight ? "animate-slideInRight" : "opacity-0"
        }`}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded bg-white dark:bg-gray-700 text-black dark:text-white"
        />

        <button
          type="submit"
          className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          {isSignup ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
