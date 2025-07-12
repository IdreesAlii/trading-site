import React, { useContext, useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import TopControlsBar from "./TopControlsBar";
import { ThemeContext, SymbolContext } from "../App";
import { motion, AnimatePresence } from "framer-motion";
import { Menu } from "lucide-react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const DashboardLayout = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { symbol: selectedSymbol, setSymbol: setSelectedSymbol } = useContext(SymbolContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

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
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900 relative overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 640) && (
          <motion.aside
            key="sidebar"
            initial={{ x: -220, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -220, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed sm:static z-20 w-52 h-full bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4 space-y-4"
          >
            <h2 className="text-xl font-bold">TradingSite</h2>
            <nav className="flex flex-col space-y-2">
              <NavLink
                to="/dashboard"
                end
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md font-medium ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/dashboard/settings"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md font-medium ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                Settings
              </NavLink>

              <NavLink
                to="/dashboard/portfolio"
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md font-medium ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`
                }
              >
                Portfolio
              </NavLink>
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Hamburger on mobile */}
        <div className="sm:hidden p-2">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-800 dark:text-gray-100"
          >
            <Menu size={28} />
          </button>
        </div>

        <TopControlsBar
          theme={theme}
          setTheme={setTheme}
          selectedSymbol={selectedSymbol}
          setSelectedSymbol={setSelectedSymbol}
        />

        {/* Profile Picture Top Right */}
        <div className="absolute top-3 right-3">
          <img
            src={photoURL || "/default-avatar.png"} // fallback image
            alt="Profile"
            className="w-10 h-10 rounded-full border-2 border-blue-500 cursor-pointer"
            onClick={() => navigate("/dashboard/profile")}
          />
        </div>

        <div className="flex-1 overflow-hidden">
          <Outlet context={{ selectedSymbol, setSelectedSymbol, theme }} />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
