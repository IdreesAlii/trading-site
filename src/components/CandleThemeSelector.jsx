import React, { useState } from "react";

const themes = [
  {
    id: "blackBlue",
    nameLeft: "Black /",
    colorLeft: "#000000", // black
    nameRight: "Blue",
    colorRight: "#007bff",
  },
  {
    id: "blackGrey",
    nameLeft: "Black /",
    colorLeft: "#000000",
    nameRight: "Grey",
    colorRight: "#888888",
  },
  {
    id: "blackPurple",
    nameLeft: "Black /",
    colorLeft: "#000000",
    nameRight: "Purple",
    colorRight: "#800080",
  },
  {
    id: "blackOrange",
    nameLeft: "Black ",
    colorLeft: "#000000",
    nameRight: "Orange",
    colorRight: "#ff6600",
  },
  {
    id: "greenRed",
    nameLeft: "Green /",
    colorLeft: "#00b050", // Green
    nameRight: "Red",
    colorRight: "#ff2d2d", // Red
  },
];

export default function CandleThemeSelector({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const currentTheme = themes.find((t) => t.id === selected);

  const handleSelect = (id) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <div style={{ position: "relative", width: 180, fontFamily: "sans-serif" }}>
      {/* Selected item */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          border: "1px solid #ccc",
          borderRadius: 6,
          padding: "6px 10px",
          cursor: "pointer",
          background: "#fff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          userSelect: "none",
        }}
      >
        {currentTheme ? (
          <span>
            <span style={{ color: currentTheme.colorLeft }}>{currentTheme.nameLeft}</span>
            <span style={{ color: currentTheme.colorRight }}>{currentTheme.nameRight}</span>
          </span>
        ) : (
          <span style={{ color: "#000", fontWeight: "500" }}>Candle Color Theme</span>
        )}
        <span style={{ color: "#000" }}>▼</span>
      </div>

      {/* Dropdown options */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "110%",
            left: 0,
            width: "100%",
            border: "1px solid #ccc",
            borderRadius: 6,
            background: "#fff",
            zIndex: 10,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          {themes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => handleSelect(theme.id)}
              style={{
                padding: "6px 10px",
                cursor: "pointer",
                display: "flex",
                gap: 4,
                userSelect: "none",
              }}
            >
              <span style={{ color: theme.colorLeft }}>{theme.nameLeft}</span>
              <span style={{ color: theme.colorRight }}>{theme.nameRight}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
