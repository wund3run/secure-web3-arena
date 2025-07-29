
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { EnhancedDashboard } from '@/components/dashboard/EnhancedDashboard';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const EnhancedDashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Enhanced Dashboard | Hawkly</title>
        <meta name="description" content="Advanced dashboard with analytics and insights" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-8">
          <EnhancedDashboard />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default EnhancedDashboardPage;
