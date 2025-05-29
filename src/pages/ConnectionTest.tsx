
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SupabaseConnectionCheck } from '@/components/admin/SupabaseConnectionCheck';
import { SupabaseHealthCheck } from '@/components/admin/SupabaseHealthCheck';
import { DatabaseStatus } from '@/components/database/DatabaseStatus';
import { useSupabaseHealth } from '@/hooks/useSupabaseHealth';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

export default function ConnectionTest() {
  const { metrics, isHealthy } = useSupabaseHealth();

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Supabase Connection Status</h1>
        <Badge 
          variant={isHealthy ? "default" : "destructive"} 
          className="flex items-center gap-2"
        >
          {metrics.connectionStatus === 'checking' ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : isHealthy ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
          {isHealthy ? 'Healthy' : 'Issues Detected'}
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SupabaseConnectionCheck />
          
          <Card>
            <CardHeader>
              <CardTitle>Quick Health Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Connection</p>
                  <p className="font-medium capitalize">{metrics.connectionStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Authentication</p>
                  <p className="font-medium capitalize">{metrics.authStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                  <p className="font-medium">
                    {metrics.responseTime ? `${metrics.responseTime}ms` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Checked</p>
                  <p className="font-medium">
                    {metrics.lastChecked ? metrics.lastChecked.toLocaleTimeString() : 'Never'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <SupabaseHealthCheck />
        </div>
      </div>

      <DatabaseStatus />
    </div>
  );
}
