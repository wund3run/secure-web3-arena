import React from 'react';
import { EnhancedPageTemplate } from '@/components/templates/EnhancedPageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LiveMetric } from '@/components/ui/live-metric';
import { DataTable } from '@/components/ui/data-table';
import { Activity, Shield, Clock, AlertTriangle } from 'lucide-react';

export default function AdminAudits() {
  return (
    <EnhancedPageTemplate 
      title="Audit Management" 
      description="Manage and monitor platform audits"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <LiveMetric
          title="Active Audits"
          value="28"
          trend="+12%"
          icon={Activity}
        />
        <LiveMetric
          title="Completed"
          value="156"
          trend="+5%"
          icon={Shield}
        />
        <LiveMetric
          title="In Progress"
          value="42"
          trend="+8%"
          icon={Clock}
        />
        <LiveMetric
          title="Critical Findings"
          value="12"
          trend="-25%"
          icon={AlertTriangle}
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Audits</CardTitle>
            <Button>New Audit</Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add DataTable component here */}
        </CardContent>
      </Card>
    </EnhancedPageTemplate>
  );
}
