
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, HelpCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SystemStatus {
  name: string;
  status: "healthy" | "warning" | "error" | "unknown";
  lastChecked: string;
  message?: string;
}

interface SystemHealthMonitorProps {
  systems: SystemStatus[];
  onRefresh: () => void;
  isRefreshing: boolean;
}

/**
 * System health monitor component for the admin dashboard
 * Displays status of various system components with visual indicators
 */
export function SystemHealthMonitor({ systems, onRefresh, isRefreshing }: SystemHealthMonitorProps) {
  const getStatusIcon = (status: SystemStatus["status"]) => {
    switch (status) {
      case "healthy":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <HelpCircle className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: SystemStatus["status"]) => {
    switch (status) {
      case "healthy":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Healthy</Badge>;
      case "warning":
        return <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Warning</Badge>;
      case "error":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Error</Badge>;
      default:
        return <Badge variant="outline" className="bg-gray-50 text-gray-700">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">System Health</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <RefreshCw className="h-4 w-4 mr-2" />
          )}
          Refresh
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {systems.map((system) => (
            <div key={system.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(system.status)}
                <span className="font-medium">{system.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div>
                  <p className="text-xs text-muted-foreground">
                    Last checked: {system.lastChecked}
                  </p>
                  {system.message && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {system.message}
                    </p>
                  )}
                </div>
                {getStatusBadge(system.status)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
