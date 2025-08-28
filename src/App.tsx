import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import Home from "./pages/Home";
import AdminLogin from "./pages/Login/AdminLogin";
import MerchantLogin from "./pages/Login/MerchantLogin";
import MemberLogin from "./pages/Login/MemberLogin";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import MerchantDashboard from "./pages/Dashboard/MerchantDashboard";
import MemberDashboard from "./pages/Dashboard/MemberDashboard";
import NotFound from "./pages/NotFound";
import Notifications from "./components/Notifications";
import PurchaseApproval from "./components/PurchaseApproval";
import CustomerLookup from "./components/CustomerLookup";
import ContributionRate from "./components/ContributionRate";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/merchant" element={<MerchantLogin />} />
        <Route path="/login/member" element={<MemberLogin />} />

        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/merchant"
          element={
            <ProtectedRoute role="merchant">
              <MerchantDashboard />
            </ProtectedRoute>
          }
        />
        <Route element={<ProtectedRoute role="merchant" />}>
          <Route path="/dashboard/merchant" element={<MerchantDashboard />}>
            <Route index element={<PurchaseApproval />} />
            <Route path="customer" element={<CustomerLookup />} />
            <Route path="contribution-rate" element={<ContributionRate />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>
        <Route
          path="/dashboard/member"
          element={
            <ProtectedRoute role="member">
              <MemberDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
