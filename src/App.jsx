import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Portfolio from "./pages/Portfolio";
import ProtectedRoute from "./components/ProtectedRoute";
import DashboardLayout from "./components/DashboardLayout"; // ✅ this was missing

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/auth" element={<Auth />} />

      {/* ✅ This is the layout for all dashboard-related routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* ✅ These are nested pages rendered inside <Outlet /> */}
        <Route index element={<Dashboard />} />
        <Route path="settings" element={<Settings />} />
        <Route path="portfolio" element={<Portfolio />} />
      </Route>
    </Routes>
  );
}

export default App;
