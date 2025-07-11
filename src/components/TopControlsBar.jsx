import React, { useContext } from "react";
import { ThemeContext, SymbolContext } from "../App";
import { Sun, Moon, ChevronDown } from "lucide-react";
import { Listbox } from "@headlessui/react";

const symbols = [
  { label: "Gold (XAUUSD)", value: "XAUUSD" },
  { label: "Euro/USD (EURUSD)", value: "EURUSD" },
  { label: "Pound/USD (GBPUSD)", value: "GBPUSD" },
];

const TopControlsBar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { symbol, setSymbol } = useContext(SymbolContext);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-2 border-b dark:border-gray-700">
      <h1 className="text-lg font-semibold">Trading Dashboard</h1>

      <div className="flex items-center space-x-4">
        {/* SYMBOL DROPDOWN */}
        <Listbox value={symbol} onChange={setSymbol}>
          <div className="relative group">
            <Listbox.Button className="flex items-center justify-between px-3 py-2 w-52 bg-gray-200 dark:bg-gray-700 rounded text-sm text-gray-900 dark:text-white shadow">
              {symbols.find((s) => s.value === symbol)?.label || symbol}
              <ChevronDown className="w-4 h-4 ml-2" />
            </Listbox.Button>

            <Listbox.Options
              className="absolute mt-1 w-52 origin-top-right bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow-lg z-10 transition ease-out duration-100 transform opacity-0 scale-95 group-data-[headlessui-state=open]:opacity-100 group-data-[headlessui-state=open]:scale-100"
            >
              {symbols.map(({ label, value }) => (
                <Listbox.Option
                  key={value}
                  value={value}
                  className={({ active }) =>
                    `cursor-pointer select-none px-4 py-2 text-sm ${
                      active
                        ? "bg-blue-500 text-white"
                        : "text-gray-900 dark:text-gray-200"
                    }`
                  }
                >
                  {label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center transition duration-300 focus:outline-none"
        >
          <span
            className={`absolute left-1 top-1 w-6 h-6 rounded-full flex items-center justify-center text-yellow-500 dark:text-gray-300 bg-white shadow transition-transform duration-300 ${
              theme === "dark" ? "translate-x-6" : "translate-x-0"
            }`}
          >
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
          </span>
        </button>
      </div>
    </div>
  );
};

export default TopControlsBar;