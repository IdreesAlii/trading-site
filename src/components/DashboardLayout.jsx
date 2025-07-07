import { useState, useEffect } from "react";
import { Outlet, NavLink } from "react-router-dom";
import TopControlsBar from "./TopControlsBar";

const symbols = ["XAUUSD", "EURUSD", "GBPUSD"];
const defaultCandleColors = {
  up: "#00b050",
  down: "#ff2d2d",
};

export default function DashboardLayout() {
  const [selectedSymbol, setSelectedSymbol] = useState(() => localStorage.getItem("defaultSymbol") || symbols[0]);
  const [previousSymbol, setPreviousSymbol] = useState(null);
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        backgroundColor: theme === "dark" ? "#121212" : "#f5f5f5",
        color: theme === "dark" ? "#eee" : "#111",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* Sidebar */}
      <nav
        style={{
          width: 200,
          backgroundColor: theme === "dark" ? "#1e1e1e" : "#fff",
          paddingTop: 20,
          position: "fixed",
          height: "100%",
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {["Dashboard", "Portfolio", "Settings"].map((name) => (
            <li key={name}>
              <NavLink
                to={`/${name.toLowerCase()}`}
                style={({ isActive }) => ({
                  display: "block",
                  padding: "12px 20px",
                  textDecoration: "none",
                  color: isActive ? "#00bfff" : "inherit",
                  fontWeight: isActive ? "600" : "normal",
                  backgroundColor: isActive
                    ? theme === "dark"
                      ? "#333333"
                      : "#ddd"
                    : "transparent",
                  borderRadius: 4,
                  margin: "0 10px 8px 10px",
                })}
              >
                {name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Main content */}
      <div
        style={{
          marginLeft: 200,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          padding: "20px 20px 0 20px",
        }}
      >
        <TopControlsBar
          theme={theme}
          setTheme={setTheme}
          selectedSymbol={selectedSymbol}
          setSelectedSymbol={setSelectedSymbol}
          previousSymbol={previousSymbol}
          setPreviousSymbol={setPreviousSymbol}
        />

        <div style={{ flex: 1, height: "100%" }}>
          <Outlet context={{
            symbol: selectedSymbol,
            theme,
            setTheme,
            upColor: defaultCandleColors.up,
            downColor: defaultCandleColors.down,
          }} />
        </div>
      </div>
    </div>
  );
}
