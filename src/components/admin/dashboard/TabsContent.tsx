
import { TabsContent as ShadcnTabsContent } from "@/components/ui/tabs";
import { DashboardOverview } from "./DashboardOverview";
import { ServiceManagement } from "@/components/admin/ServiceManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { AuditManagement } from "@/components/admin/AuditManagement";
import SettingsManagement from "@/components/admin/SettingsManagement";
import { ProviderApplications } from "@/components/admin/ProviderApplications";
import { AdminServiceApproval } from "@/components/admin/AdminServiceApproval";
import { ReportManagement } from "@/components/admin/ReportManagement";
import { DashboardTabValue } from "./types";

interface TabsContentProps {
  activeTab: DashboardTabValue;
}

export function TabsContent({ activeTab }: TabsContentProps) {
  return (
    <div className="p-4 sm:p-6">
      <ShadcnTabsContent value="dashboard" className="mt-0">
        <DashboardOverview />
      </ShadcnTabsContent>
      <ShadcnTabsContent value="services" className="mt-0">
        <ServiceManagement />
      </ShadcnTabsContent>
      <ShadcnTabsContent value="approvals" className="mt-0">
        <AdminServiceApproval />
      </ShadcnTabsContent>
      <ShadcnTabsContent value="audits" className="mt-0">
        <AuditManagement />
      </ShadcnTabsContent>
      <ShadcnTabsContent value="users" className="mt-0">
        <UserManagement />
      </ShadcnTabsContent>
      <ShadcnTabsContent value="providers" className="mt-0">
        <ProviderApplications />
      </ShadcnTabsContent>
      <ShadcnTabsContent value="reports" className="mt-0">
        <ReportManagement />
      </ShadcnTabsContent>
      <ShadcnTabsContent value="settings" className="mt-0">
        <SettingsManagement />
      </ShadcnTabsContent>
    </div>
  );
}
