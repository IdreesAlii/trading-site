import { useState, useEffect } from "react";
import TradingChart from "./TradingChart";
import CandleThemeSelector from "./CandleThemeSelector";

const symbols = ["XAUUSD", "EURUSD", "GBPUSD"];

const candleColorThemes = {
  blackBlue: {
    up: "#000000",   // Black (bullish)
    down: "#007bff", // Blue (bearish)
  },
  blackGrey: {
    up: "#000000",   // Black
    down: "#888888", // Grey
  },
  blackPurple: {
    up: "#000000",
    down: "#800080",
  },
  blackOrange: {
    up: "#000000",
    down: "#ff6600",
  },
  greenRed: {
    up: "#00b050",   // Green (bullish)
    down: "#ff2d2d", // Red (bearish)
  },
};

export default function DashboardLayout() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const [theme, setTheme] = useState("dark");

  const [selectedSymbol, setSelectedSymbol] = useState(() => {
    return localStorage.getItem("defaultSymbol") || symbols[0];
  });

  const [selectedTheme, setSelectedTheme] = useState(() => {
    return localStorage.getItem("candleTheme") || "greenRed";
  });

  const [previousSymbol, setPreviousSymbol] = useState(null);

  const [defaultSymbol, setDefaultSymbol] = useState(() => {
    return localStorage.getItem("defaultSymbol") || symbols[0];
  });

  useEffect(() => {
    if (selectedTheme) {
      localStorage.setItem("candleTheme", selectedTheme);
    }
  }, [selectedTheme]);

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
          <button onClick={toggleTheme}>
            {theme === "dark" ? "Switch to light Mode" : "Switch to dark Mode"}
          </button>

          <select
            value={selectedSymbol}
            onChange={(e) => {
              setPreviousSymbol(selectedSymbol);
              setSelectedSymbol(e.target.value);
            }}
            style={{ padding: "6px 8px", borderRadius: 4 }}
          >
            {symbols.map((sym) => (
              <option key={sym} value={sym}>
                {sym}
              </option>
            ))}
          </select>

          <CandleThemeSelector selected={selectedTheme} onChange={setSelectedTheme} />

          {previousSymbol && previousSymbol !== selectedSymbol && (
            <button
              onClick={() => {
                setSelectedSymbol(previousSymbol);
                setPreviousSymbol(selectedSymbol);
              }}
              style={{
                padding: "4px 10px",
                fontSize: "13px",
                borderRadius: "6px",
                backgroundColor: theme === "dark" ? "#2c3e50" : "#dbe4f0",
                color: theme === "dark" ? "#f5f5f5" : "#1a1a1a",
                border: "none",
                cursor: "pointer",
                transition: "all 0.2s ease",
                outline: "none",
                boxShadow: "inset 0 0 0 0 transparent",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = theme === "dark" ? "#3b4e60" : "#c9d6e3";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = theme === "dark" ? "#2c3e50" : "#dbe4f0";
                e.target.style.boxShadow = "inset 0 0 0 0 transparent";
                e.target.style.transform = "scale(1)";
              }}
              onMouseDown={(e) => {
                e.target.style.transform = "scale(0.96)";
                e.target.style.backgroundColor = theme === "dark" ? "#1f2f3d" : "#b4c7d8";
                e.target.style.boxShadow = "inset 0 2px 4px rgba(0,0,0,0.25)";
              }}
              onMouseUp={(e) => {
                setTimeout(() => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.boxShadow = "inset 0 0 0 0 transparent";
                  e.target.style.backgroundColor = theme === "dark" ? "#2c3e50" : "#dbe4f0";
                }, 100);
              }}
            >
              ← Go back to {previousSymbol}
            </button>
          )}
        </div>

        {/* Chart / Content Area */}
        <div
          style={{
            flex: 1,
            paddingLeft: 10,
            height: "calc(100vh - 100px)",
          }}
        >
          {activeMenu === "Dashboard" && (
            <TradingChart
              symbol={selectedSymbol}
              theme={theme}
              upColor={candleColorThemes[selectedTheme]?.up}
              downColor={candleColorThemes[selectedTheme]?.down}
            />
          )}

          {activeMenu === "Portfolio" && (
            <div>
              <h2>My Portfolio</h2>
              <ul>
                <li>Gold - 2 lots</li>
                <li>EUR/USD - 0.7 lots</li>
                <li>GBP/USD - 1.2 lots</li>
              </ul>
            </div>
          )}

          {activeMenu === "Settings" && (
            <div>
              <h2>Settings</h2>
              <p>Theme: {theme}</p>
              <p>Selected Symbol: {selectedSymbol}</p>

              <label style={{ display: "block", marginTop: 12 }}>
                Default Symbol:
                <select
                  value={defaultSymbol}
                  onChange={(e) => {
                    const newSymbol = e.target.value;
                    setDefaultSymbol(newSymbol);
                    localStorage.setItem("defaultSymbol", newSymbol);
                    alert(`Default symbol set to ${newSymbol}`);
                    setSelectedSymbol(newSymbol);
                  }}
                  style={{ marginLeft: 8, padding: "6px 8px", borderRadius: 4 }}
                >
                  {symbols.map((sym) => (
                    <option key={sym} value={sym}>
                      {sym}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
