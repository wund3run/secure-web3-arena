
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { EnhancedDashboardRouter } from '@/components/dashboard/EnhancedDashboardRouter';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { EnhancedRouteGuard } from '@/components/routing/EnhancedRouteGuard';

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Enhanced Dashboard | Hawkly</title>
        <meta name="description" content="Your comprehensive security management dashboard with real-time tracking and advanced features" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <div className="container py-8">
            <EnhancedRouteGuard 
              requiresAuth={true}
              allowedRoles={['auditor', 'project_owner', 'admin']}
              fallbackMessage="Please sign in to access your personalized dashboard"
            >
              <EnhancedDashboardRouter />
            </EnhancedRouteGuard>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
