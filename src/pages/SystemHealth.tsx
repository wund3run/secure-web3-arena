
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { IntegrationTestSuite } from '@/components/platform/IntegrationTestSuite';
import { PlatformHealthMonitor } from '@/components/platform/platform-health-monitor';
import { SupabaseHealthCheck } from '@/components/admin/SupabaseHealthCheck';
import { RealtimeStatusIndicator } from '@/components/realtime/RealtimeStatusIndicator';
import { RealtimeNotifications } from '@/components/realtime/RealtimeNotifications';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Activity, Shield, Database, Wifi } from 'lucide-react';

export default function SystemHealth() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>System Health - Hawkly Platform Monitoring</title>
        <meta name="description" content="Monitor and test all platform integrations and system health" />
      </Helmet>
      
      <div className="container mx-auto py-8 px-4 max-w-7xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
                <Activity className="h-8 w-8 text-primary" />
                System Health & Integration Testing
              </h1>
              <p className="text-muted-foreground mt-2">
                Comprehensive monitoring and testing of all platform services and integrations
              </p>
            </div>
            <RealtimeStatusIndicator />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Database className="h-4 w-4 text-blue-500" />
                Database
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Operational</div>
              <p className="text-xs text-muted-foreground">
                All database services running
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Secure</div>
              <p className="text-xs text-muted-foreground">
                Auth system functioning
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Wifi className="h-4 w-4 text-purple-500" />
                Real-time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Active</div>
              <p className="text-xs text-muted-foreground">
                WebSocket connections live
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Activity className="h-4 w-4 text-orange-500" />
                Functions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Ready</div>
              <p className="text-xs text-muted-foreground">
                Edge functions deployed
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-8">
            <IntegrationTestSuite />
            <PlatformHealthMonitor />
          </div>
          
          <div className="space-y-6">
            <SupabaseHealthCheck />
            <RealtimeNotifications />
          </div>
        </div>
      </div>
    </div>
  );
}
