
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useSupabaseIntegration } from '@/hooks/useSupabaseIntegration';
import { CheckCircle, AlertTriangle, XCircle, RefreshCw, Database, Shield } from 'lucide-react';

export function IntegrationStatus() {
  const { services, isChecking, overallHealth, runHealthCheck } = useSupabaseIntegration();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'degraded':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <RefreshCw className="h-4 w-4 animate-spin" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-100 text-green-800">Healthy</Badge>;
      case 'degraded':
        return <Badge className="bg-yellow-100 text-yellow-800">Degraded</Badge>;
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const getOverallStatusBadge = () => {
    switch (overallHealth) {
      case 'healthy':
        return <Badge className="bg-green-500">All Systems Operational</Badge>;
      case 'degraded':
        return <Badge className="bg-yellow-500">Some Issues Detected</Badge>;
      case 'error':
        return <Badge variant="destructive">Service Disruption</Badge>;
    }
  };

  const healthyServices = services.filter(s => s.status === 'healthy').length;
  const healthPercentage = services.length > 0 ? (healthyServices / services.length) * 100 : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <div>
            <CardTitle>Supabase Integration Status</CardTitle>
            <p className="text-sm text-muted-foreground">
              Real-time monitoring of all platform services
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getOverallStatusBadge()}
          <Button 
            onClick={runHealthCheck}
            disabled={isChecking}
            size="sm"
            variant="outline"
          >
            {isChecking ? (
              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <RefreshCw className="h-4 w-4 mr-2" />
            )}
            Check Status
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Overall Health Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>System Health</span>
            <span>{Math.round(healthPercentage)}%</span>
          </div>
          <Progress value={healthPercentage} className="h-2" />
        </div>

        {/* Individual Service Status */}
        <div className="grid gap-3">
          {services.map((service) => (
            <div 
              key={service.name}
              className="flex items-center justify-between p-3 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(service.status)}
                <div>
                  <p className="font-medium text-sm">{service.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {service.responseTime ? `${service.responseTime}ms` : 'Response time unavailable'}
                  </p>
                  {service.errorMessage && (
                    <p className="text-xs text-red-600">{service.errorMessage}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusBadge(service.status)}
                <p className="text-xs text-muted-foreground">
                  {service.lastChecked.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {isChecking && (
          <div className="flex items-center justify-center py-4 text-sm text-muted-foreground">
            <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            Running comprehensive health check...
          </div>
        )}

        {services.length === 0 && !isChecking && (
          <div className="text-center py-4 text-muted-foreground">
            <Database className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No service data available. Click "Check Status" to run diagnostics.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
