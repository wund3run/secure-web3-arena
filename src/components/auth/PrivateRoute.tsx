
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show loading state
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    // Redirect to login page but save the attempted location
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check if admin access is required and user is not an admin
  if (adminOnly && (!user.role || user.role !== 'admin')) {
    // Redirect to dashboard if trying to access admin area without admin rights
    return <Navigate to="/dashboard" replace />;
  }

  // Return children if authenticated
  return <>{children}</>;
};

export default PrivateRoute;
