
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredUserType?: "auditor" | "project_owner";
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredUserType }) => {
  const { user, loading, getUserType } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show loading state
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/auth" state={{ from: location, message: "Please sign in to access this page" }} replace />;
  }

  // If a specific user type is required, check the user's type
  if (requiredUserType) {
    const currentUserType = getUserType();
    
    if (currentUserType !== requiredUserType) {
      const message = `You need to be a ${requiredUserType === "auditor" ? "security auditor" : "project owner"} to access this page`;
      
      // Redirect to the appropriate dashboard based on user type
      const redirectPath = currentUserType === "auditor" ? "/dashboard/auditor" : "/dashboard/project";
      
      return <Navigate to={redirectPath} state={{ message }} replace />;
    }
  }

  // Return children if authenticated and authorized
  return <>{children}</>;
};

export default PrivateRoute;
