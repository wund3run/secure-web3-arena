
import React from 'react';
import { useRBAC, Permission, Role } from '@/utils/rbac/RBACManager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldX, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PermissionGuardProps {
  children: React.ReactNode;
  permission?: Permission;
  role?: Role;
  permissions?: Permission[];
  roles?: Role[];
  requireAll?: boolean;
  fallback?: React.ReactNode;
  showFallback?: boolean;
}

export const PermissionGuard: React.FC<PermissionGuardProps> = ({
  children,
  permission,
  role,
  permissions = [],
  roles = [],
  requireAll = false,
  fallback,
  showFallback = true
}) => {
  const { hasPermission, hasRole, hasAnyRole, hasAllPermissions, loading } = useRBAC();

  if (loading) {
    return <div className="animate-pulse h-4 bg-muted rounded" />;
  }

  let hasAccess = false;

  // Check single permission
  if (permission) {
    hasAccess = hasPermission(permission);
  }

  // Check single role
  if (role && !hasAccess) {
    hasAccess = hasRole(role);
  }

  // Check multiple permissions
  if (permissions.length > 0 && !hasAccess) {
    hasAccess = requireAll 
      ? hasAllPermissions(permissions)
      : permissions.some(p => hasPermission(p));
  }

  // Check multiple roles
  if (roles.length > 0 && !hasAccess) {
    hasAccess = requireAll 
      ? roles.every(r => hasRole(r))
      : hasAnyRole(roles);
  }

  if (hasAccess) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  if (!showFallback) {
    return null;
  }

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <ShieldX className="mx-auto h-12 w-12 text-destructive mb-4" />
        <CardTitle>Access Restricted</CardTitle>
        <CardDescription>
          You don't have permission to access this content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Return Home
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
