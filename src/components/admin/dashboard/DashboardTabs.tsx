
import { useState, ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardOverview } from "./DashboardOverview";
import { ServiceManagement } from "@/components/admin/ServiceManagement";
import { UserManagement } from "@/components/admin/UserManagement";
import { AuditManagement } from "@/components/admin/AuditManagement";
import { SettingsManagement } from "@/components/admin/SettingsManagement";
import { ProviderApplications } from "@/components/admin/ProviderApplications";
import { AdminServiceApproval } from "@/components/admin/AdminServiceApproval";
import { ReportManagement } from "@/components/admin/ReportManagement";

export type DashboardTabValue = "dashboard" | "users" | "services" | "audits" | "settings" | "providers" | "approvals" | "reports";

interface DashboardTabsProps {
  activeTab: DashboardTabValue;
  onTabChange: (tab: DashboardTabValue) => void;
}

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as DashboardTabValue)}>
      <div className="border-b">
        <TabsList className="flex h-14 px-2 overflow-x-auto no-scrollbar">
          <TabsTrigger value="dashboard" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="services" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Services
          </TabsTrigger>
          <TabsTrigger value="approvals" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Approvals
          </TabsTrigger>
          <TabsTrigger value="audits" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Audits
          </TabsTrigger>
          <TabsTrigger value="users" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Users
          </TabsTrigger>
          <TabsTrigger value="providers" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Providers
          </TabsTrigger>
          <TabsTrigger value="reports" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Reports
          </TabsTrigger>
          <TabsTrigger value="settings" className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary">
            Settings
          </TabsTrigger>
        </TabsList>
      </div>
      
      <div className="p-4 sm:p-6">
        <TabsContent value="dashboard" className="mt-0">
          <DashboardOverview />
        </TabsContent>
        <TabsContent value="services" className="mt-0">
          <ServiceManagement />
        </TabsContent>
        <TabsContent value="approvals" className="mt-0">
          <AdminServiceApproval />
        </TabsContent>
        <TabsContent value="audits" className="mt-0">
          <AuditManagement />
        </TabsContent>
        <TabsContent value="users" className="mt-0">
          <UserManagement />
        </TabsContent>
        <TabsContent value="providers" className="mt-0">
          <ProviderApplications />
        </TabsContent>
        <TabsContent value="reports" className="mt-0">
          <ReportManagement />
        </TabsContent>
        <TabsContent value="settings" className="mt-0">
          <SettingsManagement />
        </TabsContent>
      </div>
    </Tabs>
  );
}
