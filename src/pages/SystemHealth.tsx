
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { SystemHealthDashboard } from '@/components/monitoring/SystemHealthDashboard';

export default function SystemHealth() {
  return (
    <StandardLayout 
      title="System Health - Hawkly"
      description="Real-time system health monitoring and diagnostics"
    >
      <Helmet>
        <title>System Health - Hawkly</title>
        <meta name="description" content="Real-time system monitoring, health diagnostics, and performance tracking" />
      </Helmet>

      <div className="container py-8 max-w-7xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">System Health Monitor</h1>
            <p className="text-muted-foreground text-lg">
              Real-time monitoring of system performance, service health, and operational metrics
            </p>
          </div>

          <SystemHealthDashboard />
        </div>
      </div>
    </StandardLayout>
  );
}
