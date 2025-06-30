import React, { useEffect, useRef } from "react";

export default function TradingChart({ symbol, theme }) {
  const chartRef = useRef(null);

  useEffect(() => {
    // Clear previous widget embed if any
    if (chartRef.current) {
      chartRef.current.innerHTML = "";
    }

    // Load TradingView widget script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      new window.TradingView.widget({
        container_id: chartRef.current.id,
        symbol: symbol,
        interval: "60",
        theme: theme === "dark" ? "Dark" : "Light",
        style: "1",
        locale: "en",
        toolbar_bg: theme === "dark" ? "#1e1e1e" : "#f5f5f5",
        enable_publishing: false,
        allow_symbol_change: true,
        details: true,
        studies: [],
        withdateranges: true,
        hideideas: true,
        width: "100%",
        height: "100%",
      });
    };

    chartRef.current.appendChild(script);

    return () => {
      if (chartRef.current) {
        chartRef.current.innerHTML = "";
      }
    };
  }, [symbol, theme]);

  return (
    <div
      id="tradingview-widget"
      ref={chartRef}
      style={{
        width: "100%",
        height: "100%",  // Fill the parent container height fully
        minHeight: 600,  // you can adjust minHeight as needed
      }}
    />
  );
}
