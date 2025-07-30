import React from 'react';
import { EnhancedPageTemplate } from '@/components/templates/EnhancedPageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LiveMetric } from '@/components/ui/live-metric';
import { DataTable } from '@/components/ui/data-table';
import { AlertTriangle, MessageCircle, DollarSign, Scale } from 'lucide-react';

export default function AdminDisputes() {
  return (
    <EnhancedPageTemplate 
      title="Dispute Management" 
      description="Handle and resolve platform disputes"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <LiveMetric
          title="Active Disputes"
          value="8"
          trend="-15%"
          icon={AlertTriangle}
        />
        <LiveMetric
          title="In Mediation"
          value="5"
          trend="+2"
          icon={MessageCircle}
        />
        <LiveMetric
          title="Value at Risk"
          value="$45.2k"
          trend="+12%"
          icon={DollarSign}
        />
        <LiveMetric
          title="Resolution Rate"
          value="92%"
          trend="+3%"
          icon={Scale}
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Active Disputes</CardTitle>
            <Button variant="outline">Export Report</Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add DataTable component here */}
        </CardContent>
      </Card>
    </EnhancedPageTemplate>
  );
}
