
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { IntegrationStatus } from '@/components/admin/IntegrationStatus';
import { EnhancedSupabaseCheck } from '@/components/admin/EnhancedSupabaseCheck';
import { DatabaseStatus } from '@/components/database/DatabaseStatus';
import { PlatformStatusMonitor } from '@/components/admin/PlatformStatusMonitor';
import { Shield, Database, Activity } from 'lucide-react';

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

          <div className="grid gap-6">
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
