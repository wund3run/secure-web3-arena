
import React from 'react';
import { TestingDashboard as TestingDashboardComponent } from '@/components/testing/TestingDashboard';
import { Helmet } from 'react-helmet-async';

const TestingDashboard = () => {
  return (
    <>
      <Helmet>
        <title>Testing Dashboard | Hawkly</title>
        <meta name="description" content="Comprehensive testing and bug tracking system for the Hawkly platform" />
      </Helmet>
      <TestingDashboardComponent />
    </>
  );
};

export default TestingDashboard;
