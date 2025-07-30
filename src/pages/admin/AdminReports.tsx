import React from 'react';
import { EnhancedPageTemplate } from '@/components/templates/EnhancedPageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LiveMetric } from '@/components/ui/live-metric';
import { DataTable } from '@/components/ui/data-table';
import { FileText, Download, Printer, BarChart } from 'lucide-react';

export default function AdminReports() {
  return (
    <EnhancedPageTemplate 
      title="Platform Reports" 
      description="Generate and manage platform reports"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <LiveMetric
          title="Available Reports"
          value="45"
          trend="+12"
          icon={FileText}
        />
        <LiveMetric
          title="Downloads"
          value="1.2k"
          trend="+18%"
          icon={Download}
        />
        <LiveMetric
          title="Generated Today"
          value="24"
          trend="+8"
          icon={Printer}
        />
        <LiveMetric
          title="Data Points"
          value="15.4k"
          trend="+22%"
          icon={BarChart}
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Recent Reports</CardTitle>
            <Button>Generate Report</Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add DataTable component here */}
        </CardContent>
      </Card>
    </EnhancedPageTemplate>
  );
}
