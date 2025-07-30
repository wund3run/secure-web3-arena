import React from 'react';
import { EnhancedPageTemplate } from '@/components/templates/EnhancedPageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LiveMetric } from '@/components/ui/live-metric';
import { DataTable } from '@/components/ui/data-table';
import { Gavel, Scale, Clock, Shield } from 'lucide-react';

export default function AdminAuditLogs() {
  return (
    <EnhancedPageTemplate 
      title="Audit Logs" 
      description="Monitor and review platform audit logs"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <LiveMetric
          title="Total Logs"
          value="12.5k"
          trend="+1.2k"
          icon={Gavel}
        />
        <LiveMetric
          title="Critical Events"
          value="23"
          trend="-5"
          icon={Shield}
          trendType="negative"
        />
        <LiveMetric
          title="Resolution Rate"
          value="98%"
          trend="+2%"
          icon={Scale}
        />
        <LiveMetric
          title="Avg. Response"
          value="1.2h"
          trend="-18m"
          icon={Clock}
          trendType="positive"
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Audit Events</CardTitle>
            <Button>Export Logs</Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add DataTable component here */}
        </CardContent>
      </Card>
    </EnhancedPageTemplate>
  );
}
