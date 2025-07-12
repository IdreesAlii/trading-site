import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Portfolio from "./pages/Portfolio";
import OnlineUsers from "./pages/OnlineUsers";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile"; // 👈 Add this


// Contexts
export const ThemeContext = React.createContext();
export const SymbolContext = React.createContext();
export const IntervalContext = React.createContext(); // ✅ TF context

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  const [symbol, setSymbol] = useState(() =>
    localStorage.getItem("defaultSymbol") || localStorage.getItem("symbol") || "XAUUSD"
  );

  const [interval, setInterval] = useState(() =>
    localStorage.getItem("defaultInterval") || "60"
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("symbol", symbol);
  }, [symbol]);

  useEffect(() => {
    localStorage.setItem("defaultInterval", interval);
  }, [interval]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <SymbolContext.Provider value={{ symbol, setSymbol }}>
        <IntervalContext.Provider value={{ interval, setInterval }}>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="settings" element={<Settings />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            {/* ✅ CORRECT: Standalone protected route for /online */}
            <Route
              path="/online"
              element={
                <ProtectedRoute>
                  <OnlineUsers />
                </ProtectedRoute>
              }
            />
          </Routes>
        </IntervalContext.Provider>
      </SymbolContext.Provider>
    </ThemeContext.Provider>
  );
}
