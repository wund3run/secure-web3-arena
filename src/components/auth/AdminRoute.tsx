
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const location = useLocation();
  const isAdminAuthenticated = localStorage.getItem("adminAuthenticated") === "true";

  // Redirect non-admin users away from admin routes
  if (!isAdminAuthenticated) {
    return <Navigate 
      to="/admin/login" 
      state={{ 
        from: location,
        message: "Admin authentication required to access this area" 
      }} 
      replace 
    />;
  }

  return <>{children}</>;
};
