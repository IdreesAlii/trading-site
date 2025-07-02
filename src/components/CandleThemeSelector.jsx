import React, { useState } from "react";

// 🔧 Updated colors for better contrast on white background
const themes = [
  {
    id: "classicDark",
    nameLeft: "Class",
    colorLeft: "#000", // black
    nameRight: "ic",
    colorRight: "#fff", // white
  },
  {
    id: "iceLight",
    nameLeft: "Ice",
    colorLeft: "#2aa6ff", // light blue
    nameRight: "Light",
    colorRight: "#ff9900", // orange
  },
  {
    id: "matrix",
    nameLeft: "Mat",
    colorLeft: "#0066ff", // better blue
    nameRight: "rix",
    colorRight: "#ffaa00", // darker yellow for contrast
  },
  {
    id: "chillGrey",
    nameLeft: "Chill",
    colorLeft: "#666666", // grey
    nameRight: "Grey",
    colorRight: "#f44", // strong red
  },
];

export default function CandleThemeSelector({ selected, onChange }) {
  const [open, setOpen] = useState(false);

  const handleSelect = (id) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <div style={{ position: "relative", width: 180, fontFamily: "sans-serif" }}>
      {/* Selected item (like dropdown button) */}
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
        }}
      >
        <span>
          <span style={{ color: themes.find((t) => t.id === selected)?.colorLeft }}>
            {themes.find((t) => t.id === selected)?.nameLeft}
          </span>
          <span style={{ color: themes.find((t) => t.id === selected)?.colorRight }}>
            {themes.find((t) => t.id === selected)?.nameRight}
          </span>
        </span>
        <span>▼</span>
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
