import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import { hasRouteAccess, getUserDashboard } from '@/utils/auth/roleBasedRouting';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldX, Home, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("general" | "auditor" | "project_owner" | "admin")[];
  fallbackPath?: string;
}

export const RoleBasedRoute: React.FC<RoleBasedRouteProps> = ({ 
  children, 
  allowedRoles,
  fallbackPath 
}) => {
  const { user, loading, userProfile } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Check if user has access to current route
  const hasAccess = hasRouteAccess(user, location.pathname, userProfile);

  if (!hasAccess) {
    // If user is not authenticated and trying to access protected route
    if (!user) {
      return <Navigate to="/auth" state={{ from: location, message: "Please sign in to access this page" }} replace />;
    }

    // If authenticated but doesn't have access, show access denied
    const userDashboard = getUserDashboard(user, userProfile);
    const redirectPath = fallbackPath || userDashboard;

    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <ShieldX className="mx-auto h-12 w-12 text-destructive mb-4" />
            <CardTitle>Access Restricted</CardTitle>
            <CardDescription>
              You don't have permission to access this page. This area is restricted to specific user roles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Your current role doesn't allow access to this section. Contact support if you believe this is an error.
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild className="flex-1">
                <Link to={redirectPath}>
                  <Home className="mr-2 h-4 w-4" />
                  Go to Dashboard
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

  return <>{children}</>;
};

export default RoleBasedRoute;
