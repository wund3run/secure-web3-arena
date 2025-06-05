
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DashboardRouter } from '@/components/dashboard/DashboardRouter';
import { CriticalPageErrorBoundary } from '@/components/error/CriticalPageErrorBoundary';

const Dashboard = () => {
  return (
    <CriticalPageErrorBoundary pageName="Dashboard">
      <Helmet>
        <title>Dashboard | Hawkly</title>
        <meta name="description" content="Your security audit dashboard" />
      </Helmet>
      <DashboardRouter />
    </CriticalPageErrorBoundary>
  );
};

export default Dashboard;
