import React from "react";
import { useOutletContext } from "react-router-dom";

export default function Settings() {
  const { theme, setTheme } = useOutletContext();

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      <h2>Settings</h2>
      <div style={{ marginTop: 20 }}>
        <label style={{ fontWeight: "bold", marginRight: 10 }}>Theme:</label>
        <button onClick={handleToggle}>
          {theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </button>
        <div
         style={{ marginTop: 30}}>
          <button onClick={() => {
            const confirmReset = window.confirm("Are you sure you want to reset ALL settings?");
            if (confirmReset) {
              localStorage.removeItem("theme");
              localStorage.removeItem("candleThem");
              localStorage.removeItem("defaultSymbol");
              window.location.reload();

            }
          }}
           style={{
            padding: "8px 12px",
            backgroundColor: "#ff4d4f",
            color: "#fff",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}>
            Reset All Settings
          </button>
        </div>
      </div>
    </div>
  );
}
