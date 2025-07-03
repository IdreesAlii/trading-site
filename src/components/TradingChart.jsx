import React, { useEffect, useRef, useState } from "react";

export default function TradingChart({ symbol, theme, upColor, downColor }) {
  const containerRef = useRef(null);
  const widgetRef = useRef(null);
  const [widgetId] = useState(() => "tv_chart_" + Math.floor(Math.random() * 1000000));

  useEffect(() => {
    // Remove old widget
    if (widgetRef.current) {
      try {
        widgetRef.current.remove();
      } catch {}
      widgetRef.current = null;
    }

    function createWidget() {
      if (!window.TradingView || !containerRef.current) return;

      widgetRef.current = new window.TradingView.widget({
        container_id: widgetId,
        autosize: true,
        symbol,
        interval: "60",
        timezone: "Etc/UTC",
        theme: theme.toLowerCase(),
        style: 1,
        toolbar_bg: theme === "dark" ? "#1e1e1e" : "#f5f5f5",
        withdateranges: true,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        details: true,
        studies: [],
        disabled_features: ["use_localstorage_for_settings"],
        overrides: {
          "mainSeriesProperties.candleStyle.upColor": upColor,
          "mainSeriesProperties.candleStyle.downColor": downColor,
          "mainSeriesProperties.candleStyle.borderUpColor": upColor,
          "mainSeriesProperties.candleStyle.borderDownColor": downColor,
          "mainSeriesProperties.candleStyle.wickUpColor": upColor,
          "mainSeriesProperties.candleStyle.wickDownColor": downColor,
          "paneProperties.background": theme === "dark" ? "#121212" : "#ffffff",
          "paneProperties.vertGridProperties.color": theme === "dark" ? "#2a2a2a" : "#e6e6e6",
          "paneProperties.horzGridProperties.color": theme === "dark" ? "#2a2a2a" : "#e6e6e6",
          "scalesProperties.textColor": theme === "dark" ? "#ccc" : "#333",
        },

      });
    }

    if (!window.TradingView) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/tv.js";
      script.async = true;
      script.onload = createWidget;
      document.head.appendChild(script);
    } else {
      createWidget();
    }

    return () => {
      if (widgetRef.current) {
        try {
          widgetRef.current.remove();
        } catch {}
        widgetRef.current = null;
      }
    };
  }, [symbol, theme, upColor, downColor, widgetId]);

  return <div id={widgetId} ref={containerRef} style={{ width: "100%", height: "100%" }} />;
}
