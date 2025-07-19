import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import DashboardPanel from "./pages/customer/DashboardPanel";
import Transfer from "./pages/customer/Transfer";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/dashboard" element={<DashboardPanel />} />
      <Route path="/transfer" element={<Transfer />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
