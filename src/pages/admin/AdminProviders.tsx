import React from 'react';
import { EnhancedPageTemplate } from '@/components/templates/EnhancedPageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LiveMetric } from '@/components/ui/live-metric';
import { DataTable } from '@/components/ui/data-table';
import { Users, Star, Award, Clock } from 'lucide-react';

export default function AdminProviders() {
  return (
    <EnhancedPageTemplate 
      title="Service Provider Management" 
      description="Manage and monitor platform service providers"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <LiveMetric
          title="Active Providers"
          value="124"
          trend="+8%"
          icon={Users}
        />
        <LiveMetric
          title="Avg Rating"
          value="4.8"
          trend="+0.2"
          icon={Star}
        />
        <LiveMetric
          title="Top Performers"
          value="28"
          trend="+5"
          icon={Award}
        />
        <LiveMetric
          title="Avg Response"
          value="2.4h"
          trend="-15%"
          icon={Clock}
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Provider Directory</CardTitle>
            <Button>Add Provider</Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add DataTable component here */}
        </CardContent>
      </Card>
    </EnhancedPageTemplate>
  );
}
