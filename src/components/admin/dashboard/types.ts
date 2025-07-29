
export type DashboardTabValue = 
  | "dashboard" 
  | "users" 
  | "services" 
  | "audits" 
  | "providers" 
  | "approvals" 
  | "reports" 
  | "settings";

export interface DashboardTabsProps {
  activeTab: DashboardTabValue;
  onTabChange: (tab: DashboardTabValue) => void;
}
