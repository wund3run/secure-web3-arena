
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getPageRedirect } from '@/utils/pageRegistry';

interface LegacyRedirectProps {
  to: string;
  children?: React.ReactNode;
}

export function LegacyRedirect({ to, children }: LegacyRedirectProps) {
  const location = useLocation();
  
  useEffect(() => {
    // Track legacy page access for analytics
    console.log(`Legacy page accessed: ${location.pathname} -> redirecting to: ${to}`);
  }, [location.pathname, to]);

  return <Navigate to={to} replace />;
}

export function SmartRedirect() {
  const location = useLocation();
  const redirectTo = getPageRedirect(location.pathname);
  
  if (redirectTo) {
    return <LegacyRedirect to={redirectTo} />;
  }
  
  // If no redirect found, go to home
  return <Navigate to="/" replace />;
}
