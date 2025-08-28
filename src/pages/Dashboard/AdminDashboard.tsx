import DashboardLayout from "../../components/DashboardLayout";
import UserManagement from "../../components/UserManagement";

export default function AdminDashboard() {
  return (
    <DashboardLayout>
      <UserManagement />
    </DashboardLayout>
  );
}
