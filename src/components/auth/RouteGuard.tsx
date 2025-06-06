
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldX, Home, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import LoadingState from '@/components/ui/loading-state';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: string[];
  fallbackPath?: string;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ 
  children, 
  requireAuth = false,
  allowedRoles = [],
  fallbackPath = '/auth'
}) => {
  const { user, loading, userProfile, getUserType } = useAuth();
  const location = useLocation();

  if (loading) {
    return <LoadingState message="Checking permissions..." fullPage />;
  }

  // If authentication is required but user is not authenticated
  if (requireAuth && !user) {
    return <Navigate to={fallbackPath} state={{ from: location }} replace />;
  }

  // If specific roles are required, check user role
  if (allowedRoles.length > 0 && user) {
    const userType = getUserType();
    
    if (!allowedRoles.includes(userType)) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-muted/50">
          <Card className="max-w-md w-full mx-4">
            <CardHeader className="text-center">
              <ShieldX className="mx-auto h-12 w-12 text-destructive mb-4" />
              <CardTitle>Access Restricted</CardTitle>
              <CardDescription>
                You need {allowedRoles.join(' or ')} privileges to access this page.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild className="flex-1">
                  <Link to="/dashboard">
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <Link to="/">
                    <Home className="mr-2 h-4 w-4" />
                    Home
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }
  }

  return <>{children}</>;
};
