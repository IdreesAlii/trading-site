import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import DashboardLayout from "./components/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Portfolio from "./pages/Portfolio";

export const ThemeContext = React.createContext();
export const SymbolContext = React.createContext();

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [symbol, setSymbol] = useState(() => localStorage.getItem("symbol") || "XAUUSD");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("symbol", symbol);
  }, [symbol]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <SymbolContext.Provider value={{ symbol, setSymbol }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="portfolio" element={<Portfolio />} />
          </Route>
        </Routes>
      </SymbolContext.Provider>
    </ThemeContext.Provider>
  );
}
