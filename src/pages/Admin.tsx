
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { IntegrationStatus } from '@/components/admin/IntegrationStatus';
import { EnhancedSupabaseCheck } from '@/components/admin/EnhancedSupabaseCheck';
import { DatabaseStatus } from '@/components/database/DatabaseStatus';
import { PlatformStatusMonitor } from '@/components/admin/PlatformStatusMonitor';
import { DashboardNavigation } from '@/components/admin/dashboard/DashboardNavigation';
import { SystemHealthMonitor } from '@/components/admin/dashboard/components/SystemHealthMonitor';
import { Shield, Database, Activity, Users, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Admin = () => {
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Hawkly</title>
        <meta name="description" content="Administrative dashboard for monitoring platform health and performance" />
      </Helmet>
      
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <Shield className="h-8 w-8 text-primary" />
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>
            <p className="text-muted-foreground">
              Monitor platform health, integrations, and system performance
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            {/* Navigation Panel */}
            <div className="lg:col-span-1">
              <DashboardNavigation />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Quick Stats */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Users className="h-4 w-4 text-blue-500" />
                      Total Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,543</div>
                    <p className="text-xs text-muted-foreground">+180 this month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Shield className="h-4 w-4 text-green-500" />
                      Active Services
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">152</div>
                    <p className="text-xs text-muted-foreground">+12 this week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-purple-500" />
                      Completed Audits
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">2,387</div>
                    <p className="text-xs text-muted-foreground">+43 this month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Activity className="h-4 w-4 text-orange-500" />
                      System Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">98.5%</div>
                    <p className="text-xs text-muted-foreground">Uptime</p>
                  </CardContent>
                </Card>
              </div>

              {/* System Health Monitor */}
              <div className="grid gap-6 lg:grid-cols-2">
                <SystemHealthMonitor />
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button asChild className="w-full justify-start">
                      <Link to="/admin/users">
                        <Users className="h-4 w-4 mr-2" />
                        Manage Users
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link to="/admin/services">
                        <Shield className="h-4 w-4 mr-2" />
                        Review Services
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link to="/admin/analytics">
                        <BarChart3 className="h-4 w-4 mr-2" />
                        View Analytics
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link to="/admin/system">
                        <Activity className="h-4 w-4 mr-2" />
                        System Status
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Integration Status Overview */}
              <IntegrationStatus />
              
              {/* Enhanced Supabase Testing */}
              <EnhancedSupabaseCheck />
              
              {/* Database Status */}
              <DatabaseStatus />
              
              {/* Platform Status Monitor */}
              <PlatformStatusMonitor />
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">System Information</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Platform Version:</span>
                <span className="ml-2 font-medium">1.0.0</span>
              </div>
              <div>
                <span className="text-muted-foreground">Environment:</span>
                <span className="ml-2 font-medium">Development</span>
              </div>
              <div>
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="ml-2 font-medium">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
