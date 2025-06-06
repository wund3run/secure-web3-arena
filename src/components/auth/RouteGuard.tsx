
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldX, Home, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EnhancedLoadingState } from '@/components/ui/enhanced-loading-state';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  allowedRoles?: ("auditor" | "project_owner" | "admin")[];
  redirectTo?: string;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({ 
  children, 
  requireAuth = false,
  allowedRoles = [],
  redirectTo = '/auth'
}) => {
  const { user, loading, getUserType, userProfile } = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (loading) {
    return <EnhancedLoadingState message="Verifying access..." />;
  }

  // If authentication is required but user is not logged in
  if (requireAuth && !user) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // If specific roles are required, check user's role
  if (allowedRoles.length > 0 && user) {
    try {
      const currentUserType = getUserType();
      
      // Only check against allowed roles, ignore other user types like 'general' or 'visitor'
      const validRoles: ("auditor" | "project_owner" | "admin")[] = ["auditor", "project_owner", "admin"];
      const userRole = validRoles.includes(currentUserType as any) ? currentUserType as ("auditor" | "project_owner" | "admin") : null;
      
      if (!userRole || !allowedRoles.includes(userRole)) {
        return (
          <div className="min-h-screen flex items-center justify-center bg-muted/50">
            <Card className="max-w-md w-full mx-4">
              <CardHeader className="text-center">
                <ShieldX className="mx-auto h-12 w-12 text-destructive mb-4" />
                <CardTitle>Access Restricted</CardTitle>
                <CardDescription>
                  You need {allowedRoles.length === 1 ? 'to be a' : 'one of the following roles:'} {' '}
                  {allowedRoles.map(role => 
                    role === 'auditor' ? 'Security Auditor' : 
                    role === 'admin' ? 'Administrator' : 'Project Owner'
                  ).join(', ')} to access this page.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col gap-2">
                  <Button asChild className="w-full">
                    <Link to="/dashboard">
                      <Home className="mr-2 h-4 w-4" />
                      Go to Dashboard
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link to="/">
                      <Home className="mr-2 h-4 w-4" />
                      Return Home
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      }
    } catch (error) {
      console.error('Error checking user role:', error);
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};
