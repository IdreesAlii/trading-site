import React, { useState } from "react";
import TradingChart from "./TradingChart";

const symbols = ["XAUUSD", "EURUSD", "GBPUSD"];

export default function DashboardLayout() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [theme, setTheme] = useState("dark");
  const [selectedSymbol, setSelectedSymbol] = useState(symbols[0]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const menuItems = ["Dashboard", "Portfolio", "Settings"];

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
          transition: "background-color 0.3s ease",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {menuItems.map((item) => (
            <li
              key={item}
              onClick={() => setActiveMenu(item)}
              style={{
                padding: "12px 20px",
                cursor: "pointer",
                backgroundColor:
                  activeMenu === item
                    ? theme === "dark"
                      ? "#333333"
                      : "#ddd"
                    : "transparent",
                color: activeMenu === item ? "#00bfff" : "inherit",
                fontWeight: activeMenu === item ? "600" : "normal",
                borderRadius: 4,
                transition: "background-color 0.3s ease, color 0.3s ease",
                margin: "0 10px 8px 10px",
              }}
            >
              {item}
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
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        {/* Top controls bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: 12,
            gap: 12,
          }}
        >
          <button onClick={() => setSelectedSymbol("XAUUSD")}>Switch to Gold</button>
          <button onClick={toggleTheme}>
            {theme === "dark" ? "Switch to light Mode" : "Switch to dark Mode"}
          </button>
          <select
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            style={{ padding: "6px 8px", borderRadius: 4 }}
          >
            {symbols.map((sym) => (
              <option key={sym} value={sym}>
                {sym}
              </option>
            ))}
          </select>
        </div>

        {/* Chart area with fixed height for proper chart sizing */}
        <div
          style={{
            flex: 1,
            paddingLeft: 10,
            height: "calc(100vh - 100px)", // Fix height so chart fills space properly
          }}
        >
          <TradingChart symbol={selectedSymbol} theme={theme} />
        </div>
      </div>
    </div>
  );
}
