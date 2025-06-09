
import React, { useEffect, ReactNode } from 'react';
import { useAuth } from '@/contexts/auth';

interface AppInitializerProps {
  children?: ReactNode;
}

export function AppInitializer({ children }: AppInitializerProps) {
  const { user, loading } = useAuth();

  useEffect(() => {
    // Initialize app-wide settings, analytics, etc.
    console.log('App initialized');
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
}
