
import { TabsList as ShadcnTabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardTabValue, TabChangeHandler } from "./types";

interface TabsListProps extends TabChangeHandler {
  activeTab: DashboardTabValue;
}

export function TabsList({ activeTab, onTabChange }: TabsListProps) {
  return (
    <div className="border-b">
      <ShadcnTabsList className="flex h-14 px-2 overflow-x-auto no-scrollbar">
        <TabsTrigger 
          value="dashboard" 
          className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary"
        >
          Dashboard
        </TabsTrigger>
        <TabsTrigger 
          value="services" 
          className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary"
        >
          Services
        </TabsTrigger>
        <TabsTrigger 
          value="approvals" 
          className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary"
        >
          Approvals
        </TabsTrigger>
        <TabsTrigger 
          value="audits" 
          className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary"
        >
          Audits
        </TabsTrigger>
        <TabsTrigger 
          value="users" 
          className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary"
        >
          Users
        </TabsTrigger>
        <TabsTrigger 
          value="providers" 
          className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary"
        >
          Providers
        </TabsTrigger>
        <TabsTrigger 
          value="reports" 
          className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary"
        >
          Reports
        </TabsTrigger>
        <TabsTrigger 
          value="settings" 
          className="rounded-none px-6 data-[state=active]:border-b-2 data-[state=active]:border-primary"
        >
          Settings
        </TabsTrigger>
      </ShadcnTabsList>
    </div>
  );
}
