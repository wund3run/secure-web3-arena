
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { DashboardTabs, DashboardTabValue } from "@/components/admin/dashboard/DashboardTabs";
import { DashboardLoader } from "@/components/admin/dashboard/DashboardLoader";

interface AdminDashboardProps {
  section?: DashboardTabValue;
}

const AdminDashboard = ({ section = "dashboard" }: AdminDashboardProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DashboardTabValue>(section);

  // Check if admin is authenticated
  const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Update active tab when section prop changes
    setActiveTab(section);

    return () => clearTimeout(timer);
  }, [section]);

  if (!isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <AdminLayout title="Admin Dashboard">
      {isLoading ? (
        <DashboardLoader />
      ) : (
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
