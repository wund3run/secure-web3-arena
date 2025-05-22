
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, RefreshCw, Wifi, WifiOff, AlertTriangle, Server } from "lucide-react";
import { toast } from "sonner";

type ServiceStatus = 'operational' | 'degraded' | 'outage' | 'unknown';

interface ServiceHealth {
  name: string;
  status: ServiceStatus;
  uptime: number;
  latency: number;
}

export function PlatformStatusMonitor() {
  const [services, setServices] = useState<ServiceHealth[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  // Mock check for platform services
  const checkPlatformStatus = async () => {
    setIsChecking(true);
    
    // Simulated API call to check platform status
    setTimeout(() => {
      // Mock data for demonstration
      const serviceStatuses: ServiceHealth[] = [
        { 
          name: 'Authentication', 
          status: 'operational', 
          uptime: 99.98, 
          latency: 120 
        },
        { 
          name: 'Database', 
          status: 'operational', 
          uptime: 99.95, 
          latency: 45 
        },
        { 
          name: 'Storage', 
          status: 'operational', 
          uptime: 100, 
          latency: 85 
        },
        { 
          name: 'Functions', 
          status: 'operational', 
          uptime: 99.95, 
          latency: 110 
        }
      ];
      
      setServices(serviceStatuses);
      setIsChecking(false);
      setLastChecked(new Date());
      toast.success("Platform status updated", {
        description: "All services are currently operational"
      });
    }, 1500);
  };

  useEffect(() => {
    checkPlatformStatus();
  }, []);

  const getStatusBadge = (status: ServiceStatus) => {
    switch (status) {
      case 'operational':
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CircleCheck className="h-3 w-3 mr-1" /> Operational
          </Badge>
        );
      case 'degraded':
        return (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            <AlertTriangle className="h-3 w-3 mr-1" /> Degraded
          </Badge>
        );
      case 'outage':
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <WifiOff className="h-3 w-3 mr-1" /> Outage
          </Badge>
        );
      default:
        return (
          <Badge variant="outline">
            Unknown
          </Badge>
        );
    }
  };

  const getOverallStatus = (): ServiceStatus => {
    if (services.length === 0) return 'unknown';
    if (services.some(s => s.status === 'outage')) return 'outage';
    if (services.some(s => s.status === 'degraded')) return 'degraded';
    return 'operational';
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex justify-between items-center">
          <span className="flex items-center">
            <Server className="h-5 w-5 mr-2 text-primary" />
            Platform Status
          </span>
          {getOverallStatus() === 'operational' ? (
            <Badge className="bg-green-500">All Systems Operational</Badge>
          ) : getOverallStatus() === 'degraded' ? (
            <Badge className="bg-amber-500">Partial Outage</Badge>
          ) : getOverallStatus() === 'outage' ? (
            <Badge variant="destructive">System Outage</Badge>
          ) : (
            <Badge variant="outline">Checking Status...</Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {isChecking ? (
            <div className="flex flex-col items-center justify-center py-6">
              <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">Checking platform status...</p>
            </div>
          ) : (
            services.map(service => (
              <div key={service.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{service.name}</span>
                  {getStatusBadge(service.status)}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>Uptime: {service.uptime}%</span>
                  <span>Latency: {service.latency}ms</span>
                </div>
                <Progress value={service.uptime} className="h-1" />
              </div>
            ))
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between items-center text-xs text-muted-foreground border-t">
        <div>
          {lastChecked ? (
            <span>Last checked: {lastChecked.toLocaleTimeString()}</span>
          ) : (
            <span>Checking status...</span>
          )}
        </div>
        <Button 
          size="sm" 
          variant="ghost" 
          onClick={checkPlatformStatus}
          disabled={isChecking}
          className="h-7 text-xs flex items-center"
        >
          <RefreshCw className={`h-3 w-3 mr-1 ${isChecking ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PlatformStatusMonitor;
