import React from "react";
import { useOutletContext } from "react-router-dom";
import TradingChart from "../components/TradingChart";

export default function Dashboard() {
  const {
    symbol,
    theme,
    upColor,
    downColor,
  } = useOutletContext();

  return (
    <div style={{ flex: 1, height: "100%", display: "flex", flexDirection: "column" }}>
      <TradingChart
        symbol={symbol}
        theme={theme}
        upColor={upColor}
        downColor={downColor}
      />
    </div>
  );
}
