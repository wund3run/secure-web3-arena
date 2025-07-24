
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "./TabsContent";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { DashboardTabsProps } from "./types";

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  const location = useLocation();
  
  useEffect(() => {
    // Check for URL params indicating which tab to show
    const params = new URLSearchParams(location.search);
    const showPlatformReport = params.get("showPlatformReport") === "true";
    
    if (showPlatformReport && activeTab !== "reports") {
      onTabChange("reports");
    }
  }, [location.search, activeTab, onTabChange]);
  
  return (
    <Tabs value={activeTab} onValueChange={onTabChange as (value: string) => void} className="space-y-4">
      <TabsList className="grid grid-cols-8 gap-2">
        <TabsTrigger value="dashboard">Overview</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="audits">Audits</TabsTrigger>
        <TabsTrigger value="providers">Providers</TabsTrigger>
        <TabsTrigger value="approvals">Approvals</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>
      
      <TabsContent activeTab={activeTab} />
    </Tabs>
  );
}
