
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { ProductionMonitoring } from '@/components/monitoring/ProductionMonitoring';
import { FinalProductionReadiness } from '@/components/production-readiness/FinalProductionReadiness';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Activity, 
  Shield, 
  TrendingUp, 
  CheckCircle,
  Users,
  DollarSign
} from 'lucide-react';

export default function ProductionDashboard() {
  const [systemStatus] = useState({
    overall: 'operational',
    services: {
      api: 'operational',
      database: 'operational',
      payments: 'operational',
      monitoring: 'operational',
      cdn: 'operational'
    },
    uptime: 99.9,
    responseTime: 145
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-500';
      case 'degraded': return 'bg-yellow-500';
      case 'down': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <>
      <Helmet>
        <title>Production Dashboard | Hawkly</title>
        <meta name="description" content="Production monitoring and system status dashboard for Hawkly platform" />
      </Helmet>

      <StandardLayout
        title="Production Dashboard"
        description="Monitor system health, performance, and production readiness"
      >
        <div className="container py-8">
          {/* System Status Overview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  System Status
                </span>
                <Badge className={getStatusColor(systemStatus.overall)}>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  All Systems Operational
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {Object.entries(systemStatus.services).map(([service, status]) => (
                  <div key={service} className="text-center">
                    <div className={`w-3 h-3 rounded-full mx-auto mb-2 ${getStatusColor(status)}`} />
                    <p className="text-sm font-medium capitalize">{service}</p>
                    <p className="text-xs text-muted-foreground capitalize">{status}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between text-sm">
                <span>Uptime: {systemStatus.uptime}%</span>
                <span>Response Time: {systemStatus.responseTime}ms</span>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="monitoring" className="space-y-6">
            <TabsList className="grid grid-cols-4 w-full">
              <TabsTrigger value="monitoring">System Monitoring</TabsTrigger>
              <TabsTrigger value="readiness">Production Readiness</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>

            <TabsContent value="monitoring">
              <ProductionMonitoring />
            </TabsContent>

            <TabsContent value="readiness">
              <FinalProductionReadiness />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      User Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Total Users</span>
                        <span className="font-semibold">2,847</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Auditors</span>
                        <span className="font-semibold">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Project Owners</span>
                        <span className="font-semibold">1,203</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Monthly Growth</span>
                        <span className="font-semibold text-green-600">+18%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Financial Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Monthly Revenue</span>
                        <span className="font-semibold">$245,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Fees</span>
                        <span className="font-semibold">$12,250</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Audits Value</span>
                        <span className="font-semibold">$2.1M</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Revenue Growth</span>
                        <span className="font-semibold text-green-600">+23%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Performance KPIs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Audit Completion Rate</span>
                        <span className="font-semibold">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Avg. Audit Duration</span>
                        <span className="font-semibold">8.5 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span>User Satisfaction</span>
                        <span className="font-semibold">4.8/5</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Platform Uptime</span>
                        <span className="font-semibold">99.9%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>System Maintenance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="h-20 flex-col">
                      <Shield className="h-6 w-6 mb-2" />
                      Security Scan
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <Activity className="h-6 w-6 mb-2" />
                      Performance Test
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <TrendingUp className="h-6 w-6 mb-2" />
                      Analytics Report
                    </Button>
                    <Button variant="outline" className="h-20 flex-col">
                      <CheckCircle className="h-6 w-6 mb-2" />
                      Health Check
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </StandardLayout>
    </>
  );
}
