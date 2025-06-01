
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldX, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredUserType?: "auditor" | "project_owner" | "admin";
  requiresAuth?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ 
  children, 
  requiredUserType,
  requiresAuth = true 
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
      <Navigate 
        to="/auth" 
        state={{ 
          from: location, 
          message: "Please sign in to access this page" 
        }} 
        replace 
      />
    );
  }

  // If a specific user type is required, check the user's type
  if (requiredUserType && user) {
    try {
      const currentUserType = getUserType();
      
      if (currentUserType !== requiredUserType) {
        // Redirect to appropriate dashboard based on user type
        const redirectPath = currentUserType === "auditor" 
          ? "/dashboard/auditor" 
          : currentUserType === "admin"
          ? "/admin/dashboard"
          : "/dashboard/project";

        return (
          <div className="min-h-screen flex items-center justify-center bg-muted/50">
            <Card className="max-w-md w-full mx-4">
              <CardHeader className="text-center">
                <ShieldX className="mx-auto h-12 w-12 text-destructive mb-4" />
                <CardTitle>Access Restricted</CardTitle>
                <CardDescription>
                  You need to be a {requiredUserType === "auditor" ? "security auditor" : requiredUserType === "admin" ? "platform administrator" : "project owner"} to access this page.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link to={redirectPath}>
                    <Home className="mr-2 h-4 w-4" />
                    Go to Your Dashboard
                  </Link>
                </Button>
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

export default PrivateRoute;
