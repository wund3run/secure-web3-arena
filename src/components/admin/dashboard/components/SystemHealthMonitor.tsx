
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Shield, Server, Database, CheckCircle, AlertCircle, Clock } from "lucide-react";

// Sample system health data - would come from an API in a real app
const systemHealthData = [
  { service: "Authentication API", status: "operational", responseTime: "24ms", lastChecked: "2 min ago" },
  { service: "Database", status: "operational", responseTime: "18ms", lastChecked: "1 min ago" },
  { service: "Storage", status: "operational", responseTime: "35ms", lastChecked: "2 min ago" },
  { service: "Blockchain Provider", status: "degraded", responseTime: "210ms", lastChecked: "1 min ago" },
  { service: "Payment Gateway", status: "operational", responseTime: "65ms", lastChecked: "3 min ago" },
];

export function SystemHealthMonitor() {
  const [loading, setLoading] = React.useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "operational":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Operational</Badge>;
      case "degraded":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Degraded</Badge>;
      case "down":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Down</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getServiceIcon = (service: string) => {
    if (service.toLowerCase().includes("auth")) {
      return <Shield className="h-5 w-5 text-blue-500" />;
    } else if (service.toLowerCase().includes("database")) {
      return <Database className="h-5 w-5 text-purple-500" />;
    } else if (service.toLowerCase().includes("blockchain")) {
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    } else if (service.toLowerCase().includes("payment")) {
      return <AlertCircle className="h-5 w-5 text-amber-500" />;
    } else {
      return <Server className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          System Health
        </CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-2">
                <Skeleton className="h-6 w-1/3" />
                <Skeleton className="h-5 w-16" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-1">
            {systemHealthData.map((item, i) => (
              <div key={i} className="flex items-center justify-between p-1 rounded-md hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  {getServiceIcon(item.service)}
                  <span className="text-sm font-medium">{item.service}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{item.responseTime}</span>
                  {getStatusBadge(item.status)}
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-4 pt-2 border-t text-xs text-muted-foreground flex justify-between items-center">
          <span>Last updated: Just now</span>
          <button className="text-primary hover:underline text-xs">
            Refresh
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
