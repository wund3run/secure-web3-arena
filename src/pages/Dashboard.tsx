
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { Navigate } from 'react-router-dom';
import LoadingState from '@/components/ui/loading-state';

export default function Dashboard() {
  const { user, loading, getUserType } = useAuth();

  if (loading) {
    return <LoadingState message="Loading dashboard..." />;
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const userType = getUserType();

  // Redirect admin users to admin dashboard
  if (userType === 'admin') {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <DashboardLayout dashboardType={userType} />;
}
