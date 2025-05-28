
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminOverview } from './AdminOverview';
import { UserManagement } from '../UserManagement';
import { AuditManagement } from '../AuditManagement';
import { SystemAnalytics } from '../SystemAnalytics';
import { PlatformReports } from '../PlatformReports';
import { SystemSettings } from '../SystemSettings';
import { DashboardTabValue } from './types';

interface DashboardTabsProps {
  activeTab: DashboardTabValue;
  onTabChange: (tab: DashboardTabValue) => void;
}

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange}>
      <TabsList className="grid w-full grid-cols-6 mb-6">
        <TabsTrigger value="dashboard">Overview</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="audits">Audits</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="dashboard">
        <AdminOverview />
      </TabsContent>

      <TabsContent value="users">
        <UserManagement />
      </TabsContent>

      <TabsContent value="audits">
        <AuditManagement />
      </TabsContent>

      <TabsContent value="analytics">
        <SystemAnalytics />
      </TabsContent>

      <TabsContent value="reports">
        <PlatformReports />
      </TabsContent>

      <TabsContent value="settings">
        <SystemSettings />
      </TabsContent>
    </Tabs>
  );
}
