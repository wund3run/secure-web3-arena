
import { TabsList as UITabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  ClipboardSignature, 
  Settings, 
  FileSpreadsheet, 
  CheckSquare,
  FileBarChart 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { DashboardTabValue } from "./types";

interface TabsListProps {
  activeTab: DashboardTabValue;
  onTabChange: (tab: DashboardTabValue) => void;
}

export function TabsList({ activeTab, onTabChange }: TabsListProps) {
  const tabItems = [
    { value: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { value: "users", label: "Users", icon: Users },
    { value: "services", label: "Services", icon: ShieldCheck },
    { value: "audits", label: "Audits", icon: ClipboardSignature },
    { value: "providers", label: "Providers", icon: FileSpreadsheet },
    { value: "approvals", label: "Approvals", icon: CheckSquare },
    { value: "reports", label: "Reports", icon: FileBarChart },
    { value: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <UITabsList className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-8 h-auto p-1 bg-muted/60">
      {tabItems.map((tab) => {
        const Icon = tab.icon;
        return (
          <TabsTrigger
            key={tab.value}
            value={tab.value}
            className={cn(
              "flex flex-col items-center justify-center h-16 gap-1 data-[state=active]:bg-background py-2",
              activeTab === tab.value ? "text-primary" : "text-muted-foreground"
            )}
            onClick={() => onTabChange(tab.value as DashboardTabValue)}
          >
            <Icon className="h-4 w-4" />
            <span className="text-xs">{tab.label}</span>
          </TabsTrigger>
        );
      })}
    </UITabsList>
  );
}
