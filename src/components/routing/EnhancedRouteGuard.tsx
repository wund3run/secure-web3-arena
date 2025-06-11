
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldX, Home, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface EnhancedRouteGuardProps {
  children: React.ReactNode;
  requiredRole?: "auditor" | "project_owner" | "admin";
  requiresAuth?: boolean;
  fallbackMessage?: string;
  allowedRoles?: string[];
}

export const EnhancedRouteGuard: React.FC<EnhancedRouteGuardProps> = ({ 
  children, 
  requiredRole,
  requiresAuth = true,
  fallbackMessage,
  allowedRoles = []
}) => {
  const { user, loading, getUserType, userProfile } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If authentication is required and user is not authenticated
  if (requiresAuth && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <LogIn className="mx-auto h-12 w-12 text-primary mb-4" />
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              {fallbackMessage || "Please sign in to access this page"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <Button asChild className="flex-1">
                <Link to="/auth" state={{ from: location }}>
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button variant="outline" asChild className="flex-1">
                <Link to="/auth?mode=register" state={{ from: location }}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Register
                </Link>
              </Button>
            </div>
            <Button variant="ghost" asChild className="w-full">
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Return Home
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // If a specific role is required, check the user's role
  if (requiredRole && user) {
    try {
      const currentUserType = getUserType();
      
      // Check if user has the required role or is in allowed roles
      const hasRequiredRole = currentUserType === requiredRole;
      const hasAllowedRole = allowedRoles.length > 0 && allowedRoles.includes(currentUserType);
      
      if (!hasRequiredRole && !hasAllowedRole) {
        const redirectPath = currentUserType === "auditor" 
          ? "/dashboard" 
          : currentUserType === "admin"
          ? "/admin"
          : "/dashboard";

        return (
          <div className="min-h-screen flex items-center justify-center bg-muted/50">
            <Card className="max-w-md w-full mx-4">
              <CardHeader className="text-center">
                <ShieldX className="mx-auto h-12 w-12 text-destructive mb-4" />
                <CardTitle>Access Restricted</CardTitle>
                <CardDescription>
                  {fallbackMessage || `This area is restricted to ${requiredRole ? requiredRole.replace('_', ' ') : 'authorized'} users only.`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground text-center">
                  Your current role: <strong>{currentUserType}</strong>
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
    } catch (error) {
      console.error('Error determining user type:', error);
      return <Navigate to="/dashboard" replace />;
    }
  }

  return <>{children}</>;
};

export default EnhancedRouteGuard;
