import React, { useEffect, useRef } from "react";
import { useOutletContext } from "react-router-dom";

const TradingChart = () => {
  // Ref to hold the container where TradingView will render
  const containerRef = useRef();

  // Get symbol and theme from Outlet context (passed via DashboardLayout)
  const { selectedSymbol, theme } = useOutletContext();

  useEffect(() => {
    // Prevent widget load if no symbol or ref not ready
    if (!selectedSymbol || !containerRef.current) return;

    // Create the TradingView script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    // When script is loaded, initialize the TradingView widget
    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true, // Widget fills available space
          symbol: selectedSymbol, // e.g., XAUUSD, EURUSD
          interval: "60", // 1-hour interval
          timezone: "Etc/UTC",
          theme: theme === "dark" ? "dark" : "light",
          style: "1", // Candle chart style
          locale: "en",
          container_id: containerRef.current.id, // Where to render the widget
        });
      }
    };

    // Append the script to the document
    document.body.appendChild(script);

    // Clean up when component unmounts or dependencies change
    return () => {
      document.body.removeChild(script);
    };
  }, [selectedSymbol, theme]); // Re-run effect on symbol/theme change

  return (
    <div
      id="tv_chart_container" // Required container ID for TradingView
      ref={containerRef}
      className="w-full h-full border dark:border-gray-700"
    />
  );
};

export default TradingChart;
