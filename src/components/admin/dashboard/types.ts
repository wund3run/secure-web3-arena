
export type DashboardTabValue = 
  | "dashboard" 
  | "users" 
  | "services" 
  | "audits" 
  | "settings" 
  | "providers" 
  | "approvals" 
  | "reports";

export interface TabChangeHandler {
  onTabChange: (tab: DashboardTabValue) => void;
}

export interface DashboardTabsProps {
  activeTab: DashboardTabValue;
  onTabChange: (tab: DashboardTabValue) => void;
}
