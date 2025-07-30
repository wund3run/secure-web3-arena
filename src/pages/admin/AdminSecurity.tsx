import React from 'react';
import { EnhancedPageTemplate } from '@/components/templates/EnhancedPageTemplate';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LiveMetric } from '@/components/ui/live-metric';
import { DataTable } from '@/components/ui/data-table';
import { Globe, Zap, Lock, Shield } from 'lucide-react';

export default function AdminSecurity() {
  return (
    <EnhancedPageTemplate 
      title="Security Center" 
      description="Monitor and manage platform security"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <LiveMetric
          title="Threat Level"
          value="Low"
          trend="0"
          icon={Shield}
        />
        <LiveMetric
          title="Active Sessions"
          value="1.2k"
          trend="+45"
          icon={Globe}
        />
        <LiveMetric
          title="Blocked IPs"
          value="23"
          trend="+2"
          icon={Lock}
        />
        <LiveMetric
          title="Auth Attempts"
          value="856"
          trend="+124"
          icon={Zap}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Recent Security Events</CardTitle>
              <Button variant="outline">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Add security events table here */}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Security Settings</CardTitle>
              <Button>Update</Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Add security settings form here */}
          </CardContent>
        </Card>
      </div>
    </EnhancedPageTemplate>
  );
}
