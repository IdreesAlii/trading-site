import React, { useEffect, useState, useContext } from "react";
import { ThemeContext, SymbolContext } from "../App";
import { Sun, Moon, ChevronDown } from "lucide-react";
import { Listbox } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const symbols = [
  { label: "Gold (XAUUSD)", value: "XAUUSD" },
  { label: "Euro/USD (EURUSD)", value: "EURUSD" },
  { label: "Pound/USD (GBPUSD)", value: "GBPUSD" },
];

const TopControlsBar = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { symbol, setSymbol } = useContext(SymbolContext);
  const navigate = useNavigate();
  const [photoURL, setPhotoURL] = useState("");

  useEffect(() => {
    const fetchPhoto = async () => {
      const user = auth.currentUser;
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) {
          const data = snap.data();
          setPhotoURL(data.photoURL || "");
        }
      }
    };

    fetchPhoto();
  }, []);

  return (
    <div className="flex justify-between items-center px-4 py-2 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
      {/* Symbol Selector */}
      <Listbox value={symbol} onChange={setSymbol}>
        <div className="relative w-48">
          <Listbox.Button className="w-full py-2 px-3 bg-gray-100 dark:bg-gray-700 text-black dark:text-white rounded flex justify-between items-center">
            {symbols.find((s) => s.value === symbol)?.label || symbol}
            <ChevronDown className="w-4 h-4 ml-2" />
          </Listbox.Button>
          <Listbox.Options className="absolute mt-1 w-full bg-white dark:bg-gray-800 rounded shadow z-50">
            {symbols.map((s) => (
              <Listbox.Option
                key={s.value}
                value={s.value}
                className="cursor-pointer px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700"
              >
                {s.label}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>

      {/* Right side controls */}
      <div className="flex items-center space-x-4">
        {/* Theme Toggle */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-black dark:text-white hover:scale-105 transition"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Profile Picture */}
        <img
          src={photoURL || "/default-avatar.png"}
          alt="Profile"
          onClick={() => navigate("/dashboard/profile")}
          className="w-9 h-9 rounded-full border-2 border-blue-500 cursor-pointer hover:scale-105 transition"
        />
      </div>
    </div>
  );
};

export default TopControlsBar;
