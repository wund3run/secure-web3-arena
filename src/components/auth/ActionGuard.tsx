
import React from 'react';
import { useAuth } from '@/contexts/auth/AuthContext';
import { canPerformAction } from '@/utils/auth/roleBasedRouting';

interface ActionGuardProps {
  action: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const ActionGuard: React.FC<ActionGuardProps> = ({ 
  action, 
  children, 
  fallback = null 
}) => {
  const { user, userProfile } = useAuth();

  const hasPermission = canPerformAction(user, action, userProfile);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
