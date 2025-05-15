
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/auth";

export interface PrivateRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export function PrivateRoute({ children, adminOnly = false }: PrivateRouteProps) {
  const { user, loading, userProfile } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // If route requires admin access but user is not admin, redirect to dashboard
  if (adminOnly && (!userProfile || userProfile.role !== "admin")) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
}
