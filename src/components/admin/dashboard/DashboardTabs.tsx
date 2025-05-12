
import { Tabs } from "@/components/ui/tabs";
import { TabsList } from "./TabsList";
import { TabsContent } from "./TabsContent";
import { DashboardTabsProps } from "./types";

export * from "./types";

export function DashboardTabs({ activeTab, onTabChange }: DashboardTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as DashboardTabValue)}>
      <TabsList activeTab={activeTab} onTabChange={onTabChange} />
      <TabsContent activeTab={activeTab} />
    </Tabs>
  );
}
