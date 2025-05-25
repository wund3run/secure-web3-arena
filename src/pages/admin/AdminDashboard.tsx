
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
import { Badge } from "@/components/ui/badge";
import { RealtimeConnectionStatus } from "@/components/realtime/RealtimeConnectionStatus";
import { adminAuth } from "@/utils/admin/adminAuth";

interface AdminDashboardProps {
  section?: DashboardTabValue;
}

const AdminDashboard = ({ section = "dashboard" }: AdminDashboardProps) => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<DashboardTabValue>(section);
  const [showSystemChecks, setShowSystemChecks] = useState(true);

  // Enhanced admin authentication check
  const isAuthenticated = adminAuth.hasAdminAccess();
  const adminUser = adminAuth.getAdminUser();

  useEffect(() => {
    // Check session validity
    if (isAuthenticated && !adminAuth.isSessionValid()) {
      toast.error("Admin session expired", {
        description: "Please log in again for security",
      });
      adminAuth.logout();
      return;
    }

    // Welcome message for admin
    if (isAuthenticated && adminUser) {
      toast.success(`Welcome back, ${adminUser}`, {
        description: "Secure admin dashboard loaded",
        duration: 3000
      });
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Handle URL parameters for tab switching
    const urlTab = searchParams.get("tab");
    const showPlatformReport = searchParams.get("showPlatformReport") === "true";
    
    if (showPlatformReport) {
      setActiveTab("reports");
    } else if (urlTab && ["dashboard", "users", "services", "audits", "providers", "approvals", "reports", "settings"].includes(urlTab)) {
      setActiveTab(urlTab as DashboardTabValue);
    } else {
      setActiveTab(section);
    }

    return () => clearTimeout(timer);
  }, [section, isAuthenticated, adminUser, searchParams]);

  // Redirect non-admin users to login
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
                <CardTitle className="text-lg flex justify-between items-center">
                  <span className="flex items-center gap-2">
                    System Health Checks
                    <Badge variant="outline" className="text-xs">
                      Real-time
                    </Badge>
                  </span>
                  <div className="flex items-center gap-4">
                    <RealtimeConnectionStatus />
                    <button 
                      onClick={() => setShowSystemChecks(false)} 
                      className="text-muted-foreground text-sm font-normal hover:text-foreground"
                    >
                      Dismiss
                    </button>
                  </div>
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
