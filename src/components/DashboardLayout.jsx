import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import TopControlsBar from "./TopControlsBar";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-52 bg-white dark:bg-gray-800 border-r dark:border-gray-700 p-4 space-y-4">
        <h2 className="text-xl font-bold">TradingSite</h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/dashboard"
            end
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
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <TopControlsBar />
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;