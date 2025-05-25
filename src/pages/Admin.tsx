
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { IntegrationStatus } from '@/components/admin/IntegrationStatus';
import { EnhancedSupabaseCheck } from '@/components/admin/EnhancedSupabaseCheck';
import { DatabaseStatus } from '@/components/database/DatabaseStatus';
import { PlatformStatusMonitor } from '@/components/admin/PlatformStatusMonitor';
import { SupabaseConnectionCheck } from '@/components/admin/SupabaseConnectionCheck';
import { Shield, Database, Activity, Users, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  const adminQuickActions = [
    {
      title: "View All Users",
      description: "Manage user accounts and profiles",
      icon: Users,
      action: () => navigate('/admin/dashboard?tab=users'),
      color: "bg-blue-500"
    },
    {
      title: "Service Management", 
      description: "Review and manage marketplace services",
      icon: Shield,
      action: () => navigate('/admin/dashboard?tab=services'),
      color: "bg-green-500"
    },
    {
      title: "Audit Management",
      description: "Monitor audit requests and progress",
      icon: FileText,
      action: () => navigate('/admin/dashboard?tab=audits'),
      color: "bg-purple-500"
    },
    {
      title: "Platform Reports",
      description: "View comprehensive platform analytics",
      icon: Activity,
      action: () => navigate('/admin/dashboard?tab=reports'),
      color: "bg-orange-500"
    }
  ];

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

          {/* Quick Actions */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            {adminQuickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <Card key={index} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${action.color}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-lg">{action.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                    <Button 
                      onClick={action.action} 
                      size="sm" 
                      className="w-full"
                    >
                      Access
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="grid gap-6">
            {/* System Health Checks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Database className="h-5 w-5" />
                  <span>System Health Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <SupabaseConnectionCheck />
              </CardContent>
            </Card>
            
            {/* Integration Status Overview */}
            <IntegrationStatus />
            
            {/* Enhanced Supabase Testing */}
            <EnhancedSupabaseCheck />
            
            {/* Database Status */}
            <DatabaseStatus />
            
            {/* Platform Status Monitor */}
            <PlatformStatusMonitor />
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
