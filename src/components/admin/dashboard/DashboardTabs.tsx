import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart4, 
  Users, 
  Shield, 
  FileText,
  Search,
  Plus,
  Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServiceManagement } from "@/components/admin/ServiceManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { AuditManagement } from "@/components/admin/AuditManagement";
import { ReportManagement } from "@/components/admin/ReportManagement";
import SettingsManagement from "@/components/admin/SettingsManagement";
import { DashboardOverview } from "./DashboardOverview";
import { AdminDashboardWidgets } from "@/components/admin/dashboard/AdminDashboardWidgets";
import { useNavigate } from "react-router-dom";

// Define the valid tab values as a type
export type DashboardTabValue = "dashboard" | "services" | "users" | "audits" | "reports" | "settings";

interface DashboardTabsProps {
  activeTab: DashboardTabValue;
  onTabChange: (value: DashboardTabValue) => void;
}

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  const navigate = useNavigate();

  // Handle tab change and update URL
  const handleTabChange = (value: string) => {
    // Cast the string value to our specific type
    onTabChange(value as DashboardTabValue);
    navigate(`/admin/${value}`);
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
      <div className="flex items-center justify-between">
        <TabsList>
          <TabsTrigger value="dashboard" className="flex gap-2">
            <BarChart4 className="h-4 w-4" />
            <span className="hidden md:inline">Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="services" className="flex gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Services</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden md:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="audits" className="flex gap-2">
            <Shield className="h-4 w-4" />
            <span className="hidden md:inline">Audits</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex gap-2">
            <FileText className="h-4 w-4" />
            <span className="hidden md:inline">Reports</span>
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex gap-2">
            <Settings className="h-4 w-4" />
            <span className="hidden md:inline">Settings</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="hidden md:flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 w-[200px] lg:w-[300px]"
            />
          </div>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Create New
          </Button>
        </div>
      </div>

      <TabsContent value="dashboard" className="space-y-4">
        {/* New real-time dashboard widgets */}
        <AdminDashboardWidgets />
        
        {/* Keep existing dashboard cards (for backward compatibility) */}
        <DashboardOverview />
      </TabsContent>

      <TabsContent value="services">
        <ServiceManagement />
      </TabsContent>

      <TabsContent value="users">
        <UserManagement />
      </TabsContent>

      <TabsContent value="audits">
        <AuditManagement />
      </TabsContent>

      <TabsContent value="reports">
        <ReportManagement />
      </TabsContent>
      
      <TabsContent value="settings">
        <SettingsManagement />
      </TabsContent>
    </Tabs>
  );
}
