import React from 'react';
import { EnhancedPageTemplate } from '@/components/templates/EnhancedPageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LiveMetric } from '@/components/ui/live-metric';
import { DataTable } from '@/components/ui/data-table';
import { Users, UserCheck, UserX, UserPlus } from 'lucide-react';

export default function AdminUsers() {
  return (
    <EnhancedPageTemplate 
      title="User Management" 
      description="Manage platform users and permissions"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <LiveMetric
          title="Total Users"
          value="15.2k"
          trend="+124"
          icon={Users}
        />
        <LiveMetric
          title="Active Users"
          value="12.8k"
          trend="+82"
          icon={UserCheck}
        />
        <LiveMetric
          title="Suspended"
          value="45"
          trend="-12"
          icon={UserX}
        />
        <LiveMetric
          title="New Today"
          value="34"
          trend="+8"
          icon={UserPlus}
        />
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>User Directory</CardTitle>
            <div className="space-x-2">
              <Button variant="outline">Export</Button>
              <Button>Add User</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Add DataTable component here */}
        </CardContent>
      </Card>
    </EnhancedPageTemplate>
  );
}
