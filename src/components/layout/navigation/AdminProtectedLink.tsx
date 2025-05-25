
import React from "react";
import { Link } from "react-router-dom";

interface AdminProtectedLinkProps {
  children: React.ReactNode;
  to: string;
  className?: string;
}

export function AdminProtectedLink({ children, to, className }: AdminProtectedLinkProps) {
  // Only show admin links if user is authenticated as admin
  const isAdminAuthenticated = localStorage.getItem("adminAuthenticated") === "true";
  
  // Don't render admin links for regular users
  if (!isAdminAuthenticated) {
    return null;
  }

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  );
}
