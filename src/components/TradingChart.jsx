import React, { useEffect, useRef, useContext } from "react";
import { SymbolContext, ThemeContext } from "../App";

const TradingChart = () => {
  const containerRef = useRef();
  const { symbol } = useContext(SymbolContext);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;

    script.onload = () => {
      if (window.TradingView) {
        new window.TradingView.widget({
          autosize: true,
          symbol,
          interval: "60",
          timezone: "Etc/UTC",
          theme: theme === "dark" ? "dark" : "light",
          style: "1",
          locale: "en",
          container_id: containerRef.current.id,
        });
      }
    };

    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, [symbol, theme]);

  return (
    <div
      id="tv_chart_container"
      ref={containerRef}
      className="w-full h-full border dark:border-gray-700"
    />
  );
};

export default TradingChart;