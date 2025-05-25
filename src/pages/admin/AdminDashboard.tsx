
import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { DashboardTabs } from "@/components/admin/dashboard/DashboardTabs";
import { DashboardTabValue } from "@/components/admin/dashboard/types";
import { DashboardLoader } from "@/components/admin/dashboard/DashboardLoader";
import { SupabaseConnectionCheck } from "@/components/admin/SupabaseConnectionCheck";
import { AdminPlatformValidator } from "@/components/dev/AdminPlatformValidator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

interface AdminDashboardProps {
  section?: DashboardTabValue;
}

const AdminDashboard = ({ section = "dashboard" }: AdminDashboardProps) => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DashboardTabValue>(section);
  const [showSystemChecks, setShowSystemChecks] = useState(true);

  // Check if admin is authenticated
  const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
  const adminUser = localStorage.getItem("adminUser");

  useEffect(() => {
    // Welcome message for admin
    if (isAuthenticated && adminUser) {
      toast.success(`Welcome back, ${adminUser}`, {
        description: "Admin dashboard loaded successfully",
        duration: 3000
      });
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Check for platform report query param
    const showPlatformReport = searchParams.get("showPlatformReport") === "true";
    if (showPlatformReport) {
      setActiveTab("reports");
    } else {
      // Update active tab when section prop changes
      setActiveTab(section);
    }

    return () => clearTimeout(timer);
  }, [section, isAuthenticated, adminUser, searchParams]);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <AdminLayout title="Admin Dashboard">
      {isLoading ? (
        <DashboardLoader />
      ) : (
        <>
          {showSystemChecks && (
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex justify-between">
                  <span>System Health Checks</span>
                  <button 
                    onClick={() => setShowSystemChecks(false)} 
                    className="text-muted-foreground text-sm font-normal hover:text-foreground"
                  >
                    Dismiss
                  </button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SupabaseConnectionCheck />
                <Separator />
                <AdminPlatformValidator />
              </CardContent>
            </Card>
          )}
          
          <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
        </>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
