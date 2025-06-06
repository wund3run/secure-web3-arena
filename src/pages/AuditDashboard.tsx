
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';

export default function AuditDashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard | Hawkly</title>
        <meta name="description" content="Your audit dashboard" />
      </Helmet>
      <DashboardLayout />
    </>
  );
}
