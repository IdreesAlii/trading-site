import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Portfolio from "./pages/Portfolio";
import ProtectedRoute from "./components/ProtectedRoute";

// Contexts
export const ThemeContext = React.createContext();
export const SymbolContext = React.createContext();
export const IntervalContext = React.createContext(); // ✅ TF context

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  // ✅ Use defaultSymbol if set, otherwise fallback
  const [symbol, setSymbol] = useState(() =>
    localStorage.getItem("defaultSymbol") || localStorage.getItem("symbol") || "XAUUSD"
  );

  // ✅ Use defaultInterval if set
  const [interval, setInterval] = useState(() =>
    localStorage.getItem("defaultInterval") || "60"
  );

  // Theme sync
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Symbol sync
  useEffect(() => {
    localStorage.setItem("symbol", symbol);
  }, [symbol]);

  // Interval sync
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
            </Route>
          </Routes>
        </IntervalContext.Provider>
      </SymbolContext.Provider>
    </ThemeContext.Provider>
  );
}
