
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { UnifiedDashboard } from '@/components/dashboard/UnifiedDashboard';

const DashboardPage = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Hawkly</title>
        <meta name="description" content="Your comprehensive security audit dashboard" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <UnifiedDashboard />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default DashboardPage;
