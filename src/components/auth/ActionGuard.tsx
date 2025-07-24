
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { canPerformAction } from '@/utils/auth/roleBasedRouting';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ActionGuardProps {
  children: React.ReactNode;
  action: string;
  fallback?: React.ReactNode;
  showFallback?: boolean;
}

export const ActionGuard: React.FC<ActionGuardProps> = ({ 
  children, 
  action, 
  fallback,
  showFallback = true 
}) => {
  const { user, userProfile } = useAuth();

  const hasPermission = canPerformAction(user, action, userProfile);

  if (!hasPermission) {
    if (fallback) {
      return <>{fallback}</>;
    }

    if (!showFallback) {
      return null;
    }

    return (
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <Shield className="mx-auto h-12 w-12 text-destructive mb-4" />
          <CardTitle>Access Restricted</CardTitle>
          <CardDescription>
            You don't have permission to perform this action.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild className="w-full">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return <>{children}</>;
};
