
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth/AuthContext';
import { hasRole, getUserRole } from '@/utils/auth/roleAccess';
import { Loader2, Shield, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface EnhancedProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "auditor" | "project_owner" | "admin";
  requiredPermissions?: string[];
  fallbackPath?: string;
}

export function EnhancedProtectedRoute({ 
  children, 
  requiredRole, 
  requiredPermissions = [],
  fallbackPath 
}: EnhancedProtectedRouteProps) {
  const { user, loading, userProfile } = useAuth();
  const location = useLocation();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto" />
          <p className="text-sm text-muted-foreground">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to auth if not authenticated
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Check role requirements
  if (requiredRole && !hasRole(user, requiredRole, userProfile)) {
    const userRole = getUserRole(user, userProfile);
    const redirectPath = fallbackPath || (
      userRole === "auditor" ? "/dashboard/auditor" : 
      userRole === "admin" ? "/admin/dashboard" : 
      "/dashboard/project"
    );
    
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/50">
        <Card className="max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <Shield className="mx-auto h-12 w-12 text-destructive mb-4" />
            <CardTitle>Access Restricted</CardTitle>
            <CardDescription>
              You need {requiredRole} permissions to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-sm text-muted-foreground text-center">
              Your current role: <span className="font-medium">{userRole}</span>
            </div>
            <div className="flex flex-col gap-2">
              <Button asChild>
                <Link to={redirectPath}>Go to Your Dashboard</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Return Home</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Check additional permissions if specified
  if (requiredPermissions.length > 0) {
    // Implementation for permission checking would go here
    // For now, we'll allow through if role check passed
  }

  return <>{children}</>;
}
