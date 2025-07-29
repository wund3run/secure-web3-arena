
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Navigate, useLocation } from 'react-router-dom';
import LoadingState from '@/components/ui/loading-state';

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ 
  children, 
  requireAuth = true, 
  redirectTo = '/auth' 
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return <LoadingState message="Checking authentication..." />;
  }

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If user is logged in but trying to access auth pages
  if (!requireAuth && user && location.pathname.includes('/auth')) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
