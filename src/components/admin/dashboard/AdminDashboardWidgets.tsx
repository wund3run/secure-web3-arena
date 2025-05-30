
import { PlatformHealthWidget } from "./PlatformHealthWidget";
import { RevenueStreamsWidget } from "./RevenueStreamsWidget";
import { CategoryPerformanceWidget } from "./CategoryPerformanceWidget";
import { RealtimeAuditQueue } from "./RealtimeAuditQueue";
import { AdminNotificationCenter } from "../AdminNotificationCenter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, FileText, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

export function AdminDashboardWidgets() {
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12.5%",
      icon: Users,
      trend: "up"
    },
    {
      title: "Active Audits", 
      value: "127",
      change: "+8.3%",
      icon: Shield,
      trend: "up"
    },
    {
      title: "Completed Audits",
      value: "2,387",
      change: "+15.2%",
      icon: FileText,
      trend: "up"
    },
    {
      title: "Revenue (30d)",
      value: "$94,250",
      change: "+23.1%",
      icon: DollarSign,
      trend: "up"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                  <span className="text-green-500">{stat.change}</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <PlatformHealthWidget />
          <div className="grid gap-6 md:grid-cols-2">
            <RevenueStreamsWidget />
            <CategoryPerformanceWidget />
          </div>
        </div>
        
        <div className="space-y-6">
          <AdminNotificationCenter />
          <RealtimeAuditQueue />
        </div>
      </div>
    </div>
  );
}
