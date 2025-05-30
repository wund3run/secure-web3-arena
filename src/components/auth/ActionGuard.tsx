
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { canPerformAction } from '@/utils/auth/roleBasedRouting';

interface ActionGuardProps {
  children: React.ReactNode;
  action: string;
  fallback?: React.ReactNode;
}

export const ActionGuard: React.FC<ActionGuardProps> = ({ 
  children, 
  action, 
  fallback = null 
}) => {
  const { user, userProfile } = useAuth();
  
  const hasPermission = canPerformAction(user, action, userProfile);
  
  if (!hasPermission) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};
