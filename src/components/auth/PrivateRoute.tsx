
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/auth";

export interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export function PrivateRoute({ children, adminOnly = false }: PrivateRouteProps) {
  const { user, loading, userProfile } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is not authenticated, redirect to auth
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If route requires admin access but user is not admin, redirect to dashboard
  if (adminOnly && (!userProfile || userProfile.role !== "admin")) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}
