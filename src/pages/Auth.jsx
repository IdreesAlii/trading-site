import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // ✅ New import

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/dashboard");
      }
    });

    const timer = setTimeout(() => setShowForm(true), 100);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // ✅ Save the user's email to Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          createdAt: new Date(),
          lastActive: new Date(),
        });

        alert("Account created! Redirecting...");
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;

          // ✅ Update lastActive in Firestore
          await setDoc(doc(db, "users", user.uid), {
            email: user.email,
            lastActive: new Date(),
          }, { merge: true }); // merge keeps other fields like createdAt

          alert("Logged in!");

      }

      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
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
        >
          {isSignup ? "Login" : "Sign Up"}
        </button>
      </p>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-4 w-80 transition-all duration-500"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white"
            required
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
