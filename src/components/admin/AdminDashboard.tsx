
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RealtimeAuditQueue } from './dashboard/RealtimeAuditQueue';
import { PlatformMetrics } from './dashboard/PlatformMetrics';
import { UserManagement } from './dashboard/UserManagement';
import { ServiceApproval } from './dashboard/ServiceApproval';
import { Badge } from '@/components/ui/badge';
import { Shield, Users, FileCheck, BarChart3 } from 'lucide-react';

export function AdminDashboard() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Platform administration and monitoring
          </p>
        </div>
        <Badge variant="outline" className="flex items-center gap-2">
          <Shield className="h-4 w-4" />
          Administrator
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="audit-queue" className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            Audit Queue
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="services" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Services
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <PlatformMetrics />
        </TabsContent>

        <TabsContent value="audit-queue" className="space-y-6">
          <RealtimeAuditQueue />
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <UserManagement />
        </TabsContent>

        <TabsContent value="services" className="space-y-6">
          <ServiceApproval />
        </TabsContent>
      </Tabs>
    </div>
  );
}
