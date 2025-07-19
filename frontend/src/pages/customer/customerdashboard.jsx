// src/pages/customer/CustomerDashboard.jsx
import { Routes, Route } from "react-router-dom";
import DashboardPanel from "./DashboardPanel";
//import SendMoney from "./SendMoney";
import Transfer from "./Transfer";

const CustomerDashboard = () => {
  return (
    <Routes>
      <Route index element={<DashboardPanel />} />  {/* /dashboard */}
      <Route path="transfer" element={<Transfer />} />
      {/* Add more as needed */}
      <Route path="*" element={<h2>Page not found</h2>} />
    </Routes>
  );
};

export default CustomerDashboard;
