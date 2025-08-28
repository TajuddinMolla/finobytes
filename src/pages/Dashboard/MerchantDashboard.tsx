import { Outlet } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";

export default function MerchantDashboard() {
  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
}
