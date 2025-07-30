import React from 'react';
import { EnhancedPageTemplate } from '@/components/templates/EnhancedPageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LiveMetric } from '@/components/ui/live-metric';
import { DataTable } from '@/components/ui/data-table';
import { Settings, AlertTriangle, CheckCircle, Activity } from 'lucide-react';

export default function AdminSettings() {
  return (
    <EnhancedPageTemplate 
      title="Platform Settings" 
      description="Manage global platform configuration"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <LiveMetric
          title="Active Settings"
          value="156"
          trend="+8"
          icon={Settings}
        />
        <LiveMetric
          title="Alerts"
          value="3"
          trend="-2"
          icon={AlertTriangle}
          trendType="positive"
        />
        <LiveMetric
          title="Security Health"
          value="98%"
          trend="+2%"
          icon={AlertTriangle}
          trendType="positive"
        />
        <LiveMetric
          title="Health Score"
          value="98%"
          trend="+5%"
          icon={CheckCircle}
          trendType="positive"
        />
        <LiveMetric
          title="API Status"
          value="100%"
          trend="0%"
          icon={Activity}
          trendType="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>System Configuration</CardTitle>
              <Button>Save Changes</Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Add settings form components here */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Environment Variables</CardTitle>
              <Button variant="outline">Refresh</Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Add environment variables table here */}
          </CardContent>
        </Card>
      </div>
    </EnhancedPageTemplate>
  );
}
