
import { TabsContent as UITabsContent } from "@/components/ui/tabs";
import { DashboardOverview } from "./DashboardOverview";
import { UserManagement } from "@/components/admin/UserManagement";
import { ServiceManagement } from "@/components/admin/ServiceManagement";
import { AuditManagement } from "@/components/admin/AuditManagement";
import { ProviderApplications } from "@/components/admin/ProviderApplications";
import { AdminServiceApproval } from "@/components/admin/AdminServiceApproval";
import { ReportManagement } from "@/components/admin/ReportManagement";
import SettingsManagement from "@/components/admin/SettingsManagement";
import { AdminPlatformReport } from "@/components/admin/PlatformReport";
import { RealtimeAuditQueue } from "./RealtimeAuditQueue";
import { RealtimeNotifications } from "@/components/realtime/RealtimeNotifications";
import { AdminAppConnections } from "./AdminAppConnections";
import { DashboardTabValue } from "./types";

interface TabsContentProps {
  activeTab: DashboardTabValue;
}

export function TabsContent({ activeTab }: TabsContentProps) {
  return (
    <>
      <UITabsContent value="dashboard" className="space-y-6 mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DashboardOverview />
            <AdminAppConnections />
          </div>
          <div className="space-y-6">
            <RealtimeNotifications />
            <RealtimeAuditQueue />
          </div>
        </div>
      </UITabsContent>
      
      <UITabsContent value="users" className="space-y-6 mt-4">
        <UserManagement />
      </UITabsContent>
      
      <UITabsContent value="services" className="space-y-6 mt-4">
        <ServiceManagement />
      </UITabsContent>
      
      <UITabsContent value="audits" className="space-y-6 mt-4">
        <div className="space-y-6">
          <RealtimeAuditQueue />
          <AuditManagement />
        </div>
      </UITabsContent>
      
      <UITabsContent value="providers" className="space-y-6 mt-4">
        <ProviderApplications />
      </UITabsContent>
      
      <UITabsContent value="approvals" className="space-y-6 mt-4">
        <AdminServiceApproval />
      </UITabsContent>
      
      <UITabsContent value="reports" className="space-y-6 mt-4">
        <div className="space-y-6">
          <AdminPlatformReport />
          <ReportManagement />
        </div>
      </UITabsContent>
      
      <UITabsContent value="settings" className="space-y-6 mt-4">
        <SettingsManagement />
      </UITabsContent>
    </>
  );
}
