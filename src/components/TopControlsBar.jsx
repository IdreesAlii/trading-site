import React from "react";
import { Sun, Moon, ChevronDown } from "lucide-react";
import { Listbox } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

const symbols = [
  { label: "Gold (XAUUSD)", value: "XAUUSD" },
  { label: "Euro/USD (EURUSD)", value: "EURUSD" },
  { label: "Pound/USD (GBPUSD)", value: "GBPUSD" },
];

const TopControlsBar = ({ theme, setTheme, selectedSymbol, setSelectedSymbol }) => {
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleSymbolChange = (newSymbol) => {
    setSelectedSymbol(newSymbol);
    localStorage.setItem("symbol", newSymbol);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4 px-4 py-2 bg-white dark:bg-gray-800 border-b dark:border-gray-700"
    >
      <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
        Trading Dashboard
      </h1>

      <div className="flex flex-wrap items-center gap-4">
        {/* SYMBOL DROPDOWN */}
        <Listbox value={selectedSymbol} onChange={handleSymbolChange}>
          {({ open }) => (
            <div className="relative group w-full sm:w-52">
              <Listbox.Button className="flex items-center justify-between w-full px-3 py-2 bg-gray-200 dark:bg-gray-700 rounded text-sm text-gray-900 dark:text-white shadow">
                {symbols.find((s) => s.value === selectedSymbol)?.label || selectedSymbol}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Listbox.Button>

              <AnimatePresence>
                {open && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Listbox.Options className="absolute mt-1 w-full sm:w-52 origin-top-right bg-white dark:bg-gray-800 border dark:border-gray-600 rounded shadow-lg z-10">
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </Listbox>

        {/* THEME TOGGLE */}
        <button
          onClick={toggleTheme}
          className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center transition duration-300 focus:outline-none"
        >
          <motion.span
            layout
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`absolute left-1 top-1 w-6 h-6 rounded-full flex items-center justify-center text-yellow-500 dark:text-gray-300 bg-white shadow ${
              theme === "dark" ? "translate-x-6" : "translate-x-0"
            }`}
            style={{
              boxShadow:
                theme === "dark"
                  ? "0 0 10px rgba(255,255,255,0.4)"
                  : "0 0 10px rgba(255, 230, 0, 0.5)",
            }}
          >
            {theme === "dark" ? <Moon size={18} /> : <Sun size={18} />}
          </motion.span>
        </button>
      </div>
    </motion.div>
  );
};

export default TopControlsBar;
