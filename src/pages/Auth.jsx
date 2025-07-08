import React, { useState, useEffect } from "react"; 
// Import React and hooks for managing state and side effects

const Auth = () => {
  // State variables for username, password, and whether we are in signup mode
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  // New state to control animation classes for heading and form
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateRight, setAnimateRight] = useState(false);

  // useEffect runs once after component mounts to trigger animations
  useEffect(() => {
    setAnimateLeft(true); // start heading slide-in animation
    setAnimateRight(true); // start form slide-in animation
  }, []);

  // Handle form submission for login/signup
  const handleLogin = (e) => {
    e.preventDefault(); // prevent page reload on form submit

    // Get saved users from localStorage or empty array if none
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (isSignup) {
      // Signup flow
      // Check if username is already taken
      const userExists = users.some(user => user.username === username);
      if (userExists) {
        alert("Username already taken");
        return; // stop processing signup
      }
      // Save new user to localStorage
      users.push({ username, password });
      localStorage.setItem("users", JSON.stringify(users));
      alert("Account created! You can now login.");
      setIsSignup(false); // switch to login mode after signup
      setUsername(""); // clear form fields
      setPassword("");
    } else {
      // Login flow
      // Find user with matching username and password
      const validUser = users.find(
        user => user.username === username && user.password === password
      );
      if (validUser) {
        alert("Logged in successfully!");
        // TODO: redirect or set logged-in state here
      } else {
        alert("Invalid username or password");
      }
    }
  };

  return (
    // Main container: flexbox to center content, full screen height, background changes with dark mode
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900">
      
      {/* Heading text that slides in from left */}
      <h2
        className={`text-2xl font-bold mb-4 ${
          animateLeft ? "animate-slideInLeft" : "opacity-0"
        }`}
      >
        {isSignup ? "Sign Up" : "Login"}
      </h2>

      {/* Paragraph with toggle link to switch between signup/login */}
      <p className="text-sm text-gray-600 mb-4">
        {isSignup ? "Already have an account?" : "Don't have an account?"}
        <button
          onClick={() => setIsSignup(!isSignup)} // toggles signup/login mode
          className="text-blue-500 ml-1 underline"
          type="button" // button does NOT submit the form
        >
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>

      {/* Form that slides in from right */}
      <form
        onSubmit={handleLogin} // handle submit
        className={`bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4 w-80 ${
          animateRight ? "animate-slideInRight" : "opacity-0"
        }`}
      >
        {/* Username input, controlled with React state */}
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />

        {/* Password input, controlled with React state */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />

        {/* Submit button changes text based on mode */}
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
