import React, { useEffect, useState } from "react";

const symbolOptions = [
  { label: "Gold (XAUUSD)", value: "XAUUSD" },
  { label: "Euro/USD (EURUSD)", value: "EURUSD" },
  { label: "Pound/USD (GBPUSD)", value: "GBPUSD" },
];

const intervalOptions = [
  { label: "1 Minute", value: "1" },
  { label: "5 Minutes", value: "5" },
  { label: "15 Minutes", value: "15" },
  { label: "1 Hour", value: "60" },
  { label: "4 Hours", value: "240" },
  { label: "1 Day", value: "1D" },
];

const Settings = () => {
  const [defaultSymbol, setDefaultSymbol] = useState("XAUUSD");
  const [defaultInterval, setDefaultInterval] = useState("60");

  // Load from localStorage
  useEffect(() => {
    const savedSymbol = localStorage.getItem("defaultSymbol");
    const savedInterval = localStorage.getItem("defaultInterval");

    if (savedSymbol) setDefaultSymbol(savedSymbol);
    if (savedInterval) setDefaultInterval(savedInterval);
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    localStorage.setItem("defaultSymbol", defaultSymbol);
    localStorage.setItem("defaultInterval", defaultInterval);
  }, [defaultSymbol, defaultInterval]);

  return (
    <div className="p-6 max-w-xl">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Settings</h2>

      {/* Default Symbol */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Default Symbol
        </label>
        <select
          value={defaultSymbol}
          onChange={(e) => setDefaultSymbol(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border dark:border-gray-600"
        >
          {symbolOptions.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      {/* Default Interval */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Default Interval (Timeframe)
        </label>
        <select
          value={defaultInterval}
          onChange={(e) => setDefaultInterval(e.target.value)}
          className="w-full px-3 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white border dark:border-gray-600"
        >
          {intervalOptions.map(({ label, value }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        These settings will be saved and used when you reopen the site.
      </p>
    </div>
  );
};

export default Settings;
