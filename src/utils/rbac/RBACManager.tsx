
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';

export type Permission = 
  | 'create_audit_request'
  | 'accept_audit' 
  | 'manage_users'
  | 'view_all_audits'
  | 'create_escrow'
  | 'release_payment'
  | 'submit_findings'
  | 'manage_system_settings'
  | 'view_audit_logs'
  | 'approve_services'
  | 'manage_disputes'
  | 'access_admin_panel'
  | 'moderate_content'
  | 'view_analytics'
  | 'manage_billing';

export type Role = 'admin' | 'auditor' | 'project_owner' | 'moderator' | 'general';

interface UserRole {
  id: string;
  user_id: string;
  role: Role;
  permissions: Permission[];
  is_active: boolean;
  granted_by: string;
  granted_at: string;
  expires_at?: string;
}

interface RBACContextType {
  userRoles: UserRole[];
  hasPermission: (permission: Permission) => boolean;
  hasRole: (role: Role) => boolean;
  hasAnyRole: (roles: Role[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  refreshPermissions: () => Promise<void>;
  loading: boolean;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

// Role-Permission Matrix
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin: [
    'create_audit_request',
    'accept_audit',
    'manage_users',
    'view_all_audits',
    'create_escrow',
    'release_payment',
    'submit_findings',
    'manage_system_settings',
    'view_audit_logs',
    'approve_services',
    'manage_disputes',
    'access_admin_panel',
    'moderate_content',
    'view_analytics',
    'manage_billing'
  ],
  moderator: [
    'view_all_audits',
    'moderate_content',
    'manage_disputes',
    'view_audit_logs'
  ],
  auditor: [
    'accept_audit',
    'submit_findings',
    'create_escrow',
    'view_audit_logs'
  ],
  project_owner: [
    'create_audit_request',
    'release_payment',
    'create_escrow'
  ],
  general: []
};

export function RBACProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      refreshPermissions();
    } else {
      setUserRoles([]);
      setLoading(false);
    }
  }, [user]);

  const refreshPermissions = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', user.id)
        .eq('is_active', true);

      if (error) throw error;

      const rolesWithPermissions = (data || []).map((role: unknown) => ({
        ...role,
        permissions: ROLE_PERMISSIONS[role.role as Role] || []
      }));

      setUserRoles(rolesWithPermissions);
    } catch (error) {
      console.error('Error fetching user roles:', error);
      setUserRoles([]);
    } finally {
      setLoading(false);
    }
  };

  const hasPermission = (permission: Permission): boolean => {
    if (!user) return false;
    
    return userRoles.some(role => 
      role.is_active && 
      role.permissions.includes(permission) &&
      (!role.expires_at || new Date(role.expires_at) > new Date())
    );
  };

  const hasRole = (role: Role): boolean => {
    if (!user) return false;
    
    return userRoles.some(userRole => 
      userRole.role === role && 
      userRole.is_active &&
      (!userRole.expires_at || new Date(userRole.expires_at) > new Date())
    );
  };

  const hasAnyRole = (roles: Role[]): boolean => {
    return roles.some(role => hasRole(role));
  };

  const hasAllPermissions = (permissions: Permission[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };

  const value: RBACContextType = {
    userRoles,
    hasPermission,
    hasRole,
    hasAnyRole,
    hasAllPermissions,
    refreshPermissions,
    loading
  };

  return <RBACContext.Provider value={value}>{children}</RBACContext.Provider>;
}

export const useRBAC = () => {
  const context = useContext(RBACContext);
  if (context === undefined) {
    throw new Error('useRBAC must be used within a RBACProvider');
  }
  return context;
};

// Higher-order component for permission-based rendering
export function withPermission<P extends object>(
  Component: React.ComponentType<P>,
  requiredPermission: Permission
) {
  return function PermissionGuardedComponent(props: P) {
    const { hasPermission } = useRBAC();
    
    if (!hasPermission(requiredPermission)) {
      return null;
    }
    
    return <Component {...props} />;
  };
}

// Higher-order component for role-based rendering
export function withRole<P extends object>(
  Component: React.ComponentType<P>,
  requiredRole: Role
) {
  return function RoleGuardedComponent(props: P) {
    const { hasRole } = useRBAC();
    
    if (!hasRole(requiredRole)) {
      return null;
    }
    
    return <Component {...props} />;
  };
}
