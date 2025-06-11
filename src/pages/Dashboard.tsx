
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Dashboard | Hawkly</title>
        <meta name="description" content="Your personalized security dashboard" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <DashboardLayout />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;
