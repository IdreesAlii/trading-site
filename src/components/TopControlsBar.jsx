import React from "react";

const symbols = ["XAUUSD", "EURUSD", "GBPUSD"];

export default function TopControlsBar({ theme, setTheme, selectedSymbol, setSelectedSymbol, previousSymbol, setPreviousSymbol }) {
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
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
          }}
        >
          ← Go back to {previousSymbol}
        </button>
      )}
    </div>
  );
}
