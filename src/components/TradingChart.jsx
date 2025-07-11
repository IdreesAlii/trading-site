import React, { useEffect, useRef, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { IntervalContext } from "../App";

const TradingChart = () => {
  const containerRef = useRef();
  const { selectedSymbol, theme } = useOutletContext();
  const { interval } = useContext(IntervalContext);

  useEffect(() => {
    if (!selectedSymbol || !containerRef.current) return;

    containerRef.current.innerHTML = "";

    if (window.TradingView) {
      new window.TradingView.widget({
        autosize: true,
        symbol: selectedSymbol,
        interval: interval,
        timezone: "Etc/UTC",
        theme: theme === "dark" ? "dark" : "light",
        style: "1",
        locale: "en",
        container_id: containerRef.current.id,
      });
    } else {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;

      script.onload = () => {
        if (window.TradingView) {
          new window.TradingView.widget({
            autosize: true,
            symbol: selectedSymbol,
            interval: interval,
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
    }
  }, [selectedSymbol, theme, interval]);

  return (
    <div
      id="tv_chart_container"
      ref={containerRef}
      className="w-full h-[calc(100vh-160px)] min-h-[300px] border dark:border-gray-700"
    />
  );
};

export default TradingChart;
