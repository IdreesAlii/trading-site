import React, { useEffect, useRef } from "react";

export default function TradingChart({ symbol, theme, upColor, downColor }) {
  const containerRef = useRef(null);
  const widgetRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (widgetRef.current && widgetRef.current.remove) {
      try {
        widgetRef.current.remove();
      } catch (e) {
        console.warn("Failed to safely remove widget:", e);
      }
    }

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/tv.js";
    script.async = true;
    script.onload = () => {
      if (!window.TradingView || !containerRef.current) return;

      widgetRef.current = new window.TradingView.widget({
        autosize: true,
        symbol: symbol,
        interval: "15",
        container_id: containerRef.current.id,
        theme: theme,
        style: "1",
        locale: "en",
        enable_publishing: false,
        allow_symbol_change: true,
        hide_side_toolbar: false,
        hide_top_toolbar: false,
        withdateranges: true,
        save_image: false,
        studies: [],
        overrides: {
          "mainSeriesProperties.candleStyle.upColor": upColor,
          "mainSeriesProperties.candleStyle.downColor": downColor,
          "mainSeriesProperties.candleStyle.borderUpColor": upColor,
          "mainSeriesProperties.candleStyle.borderDownColor": downColor,
          "mainSeriesProperties.candleStyle.wickUpColor": upColor,
          "mainSeriesProperties.candleStyle.wickDownColor": downColor,
        },
      });
    };

    document.body.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [symbol, theme, upColor, downColor]);

  return (
    <div
      id="tradingview-widget-container"
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
