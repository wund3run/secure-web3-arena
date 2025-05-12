
import { DashboardCard } from "./DashboardCard";
import { DashboardActivity } from "./DashboardActivity";
import { TopServices } from "./TopServices";
import { BarChart4, FileText, Shield, Users } from "lucide-react";

export function DashboardOverview() {
  // Consolidated admin dashboard stats matching those shown on public-facing pages
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard 
          title="Platform Users" 
          value="2,543" 
          description="+180 this month" 
          icon={<Users className="h-4 w-4 text-muted-foreground" />} 
        />
        <DashboardCard 
          title="Security Services" 
          value="152" 
          description="+12 this week" 
          icon={<Shield className="h-4 w-4 text-muted-foreground" />} 
        />
        <DashboardCard 
          title="Completed Audits" 
          value="2,387" 
          description="+43 this month" 
          icon={<FileText className="h-4 w-4 text-muted-foreground" />} 
        />
        <DashboardCard 
          title="Platform Revenue" 
          value="$94,250" 
          description="+10.5% from last month" 
          icon={<BarChart4 className="h-4 w-4 text-muted-foreground" />} 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <DashboardActivity />
        <TopServices />
      </div>
    </>
  );
}
