import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import DashboardLayout from "./components/DashboardLayout";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<DashboardLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
