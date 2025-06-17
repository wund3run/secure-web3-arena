
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { EnhancedDashboardRouter } from '@/components/dashboard/EnhancedDashboardRouter';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { EnhancedRouteGuard } from '@/components/routing/EnhancedRouteGuard';
import { EnhancedBreadcrumbs } from '@/components/navigation/EnhancedBreadcrumbs';
import { ResponsiveLayout } from '@/components/layout/ResponsiveLayout';
import { ConnectionTest } from '@/components/debug/ConnectionTest';
import { useAuth } from '@/contexts/auth';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Settings } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [showDebug, setShowDebug] = useState(false);

  return (
    <>
      <Helmet>
        <title>Enhanced Dashboard | Hawkly</title>
        <meta name="description" content="Your comprehensive security management dashboard with real-time tracking and advanced features" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <ResponsiveLayout maxWidth="2xl" padding="md">
            <div className="flex justify-between items-center mb-4">
              <EnhancedBreadcrumbs />
              {user && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowDebug(!showDebug)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {showDebug ? 'Hide' : 'Show'} Debug
                </Button>
              )}
            </div>
            
            {showDebug && (
              <div className="mb-6">
                <ConnectionTest />
              </div>
            )}
            
            <EnhancedRouteGuard 
              requiresAuth={true}
              allowedRoles={['auditor', 'project_owner', 'admin']}
              fallbackMessage="Please sign in to access your personalized dashboard"
            >
              <EnhancedDashboardRouter />
            </EnhancedRouteGuard>
          </ResponsiveLayout>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
