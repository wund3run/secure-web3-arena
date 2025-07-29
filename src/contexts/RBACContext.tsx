import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Define user roles
export type UserRole = 'admin' | 'auditor' | 'projectOwner' | 'serviceProvider' | 'guest';

// Define user data structure
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  permissions: string[];
}

// Define access control context
interface RBACContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthorized: (requiredRole: UserRole | UserRole[]) => boolean;
  hasPermission: (permission: string) => boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const RBACContext = createContext<RBACContextType | undefined>(undefined);

// Define which routes require which roles
const roleBasedRoutes: Record<string, { roles: UserRole[], permissions?: string[] }> = {
  '/admin': { roles: ['admin'], permissions: ['admin.access'] },
  '/admin/dashboard': { roles: ['admin'], permissions: ['admin.dashboard.view'] },
  '/admin/users': { roles: ['admin'], permissions: ['admin.users.manage'] },
  '/admin/audits': { roles: ['admin'], permissions: ['admin.audits.manage'] },
  '/admin/disputes': { roles: ['admin'], permissions: ['admin.disputes.manage'] },
  '/admin/finance': { roles: ['admin'], permissions: ['admin.finance.manage'] },
  '/admin/providers': { roles: ['admin'], permissions: ['admin.providers.manage'] },
  '/admin/reports': { roles: ['admin'], permissions: ['admin.reports.view'] },
  '/admin/security': { roles: ['admin'], permissions: ['admin.security.manage'] },
  '/admin/services': { roles: ['admin'], permissions: ['admin.services.manage'] },
  '/admin/settings': { roles: ['admin'], permissions: ['admin.settings.manage'] },
  '/analytics': { roles: ['admin', 'auditor'], permissions: ['analytics.basic.view'] },
  '/analytics/dashboard': { roles: ['admin'], permissions: ['analytics.dashboard.view'] },
  '/analytics/live': { roles: ['admin'], permissions: ['analytics.live.view'] },
  '/analytics/production': { roles: ['admin'], permissions: ['analytics.production.view'] },
  '/security/compliance': { roles: ['admin'], permissions: ['security.compliance.manage'] },
  '/security/insights': { roles: ['admin', 'auditor'], permissions: ['security.insights.view'] },
  '/security/monitoring': { roles: ['admin'], permissions: ['security.monitoring.view'] },
  '/enterprise': { roles: ['admin', 'projectOwner'], permissions: ['enterprise.access'] },
};

// Mock user data for testing - would come from your authentication system in production
const mockUsers: Record<string, User> = {
  'admin@hawkly.io': {
    id: '1',
    name: 'Admin User',
    email: 'admin@hawkly.io',
    role: 'admin',
    permissions: [
      'admin.access', 'admin.dashboard.view', 'admin.users.manage',
      'admin.audits.manage', 'admin.disputes.manage', 'admin.finance.manage',
      'admin.providers.manage', 'admin.reports.view', 'admin.security.manage',
      'admin.services.manage', 'admin.settings.manage',
      'analytics.basic.view', 'analytics.dashboard.view', 'analytics.live.view',
      'analytics.production.view', 'security.compliance.manage', 'security.insights.view',
      'security.monitoring.view', 'enterprise.access'
    ]
  },
  'auditor@hawkly.io': {
    id: '2',
    name: 'Auditor User',
    email: 'auditor@hawkly.io',
    role: 'auditor',
    permissions: [
      'analytics.basic.view', 'security.insights.view'
    ]
  },
  'project@hawkly.io': {
    id: '3',
    name: 'Project Owner',
    email: 'project@hawkly.io',
    role: 'projectOwner',
    permissions: [
      'enterprise.access'
    ]
  }
};

// Provider component
export function RBACProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if user is authorized for current route
  const checkRouteAccess = () => {
    if (!user) return;

    // Find the most specific matching route
    const routePaths = Object.keys(roleBasedRoutes).sort((a, b) => b.length - a.length);
    const matchingRoute = routePaths.find(routePath => 
      location.pathname.startsWith(routePath)
    );

    if (matchingRoute) {
      const { roles, permissions = [] } = roleBasedRoutes[matchingRoute];
      const hasRole = roles.includes(user.role);
      const hasRequiredPermissions = permissions.every(permission => 
        user.permissions.includes(permission)
      );

      if (!hasRole || !hasRequiredPermissions) {
        // Redirect to unauthorized page
        navigate('/unauthorized', { 
          state: { from: location.pathname } 
        });
      }
    }
  };

  // Check for stored authentication
  useEffect(() => {
    const storedUser = localStorage.getItem('hawkly-user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('hawkly-user');
      }
    }
    setLoading(false);
  }, []);

  // Check route access whenever location or user changes
  useEffect(() => {
    if (!loading) {
      checkRouteAccess();
    }
  }, [location.pathname, user, loading]);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    // In production, replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockUser = mockUsers[email.toLowerCase()];
        if (mockUser && password === 'password') {  // Simplified for demo
          setUser(mockUser);
          localStorage.setItem('hawkly-user', JSON.stringify(mockUser));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 800);
    });
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('hawkly-user');
    navigate('/');
  };

  // Check if user has required role
  const isAuthorized = (requiredRole: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    if (Array.isArray(requiredRole)) {
      return requiredRole.includes(user.role);
    }
    return user.role === requiredRole;
  };

  // Check if user has specific permission
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    return user.permissions.includes(permission);
  };

  const contextValue: RBACContextType = {
    user,
    isAuthenticated: !!user,
    isAuthorized,
    hasPermission,
    login,
    logout,
    loading
  };

  return (
    <RBACContext.Provider value={contextValue}>
      {children}
    </RBACContext.Provider>
  );
}

// Custom hook for accessing the RBAC context
export function useRBAC() {
  const context = useContext(RBACContext);
  if (context === undefined) {
    throw new Error('useRBAC must be used within a RBACProvider');
  }
  return context;
}

// Route guard component for protecting routes
export function RequireAuth({ 
  children, 
  requiredRole 
}: { 
  children: ReactNode;
  requiredRole?: UserRole | UserRole[];
}) {
  const { isAuthenticated, isAuthorized, loading } = useRBAC();
  const navigate = useNavigate();
  const location = useLocation();

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login page
    navigate('/auth', { state: { from: location.pathname } });
    return null;
  }

  if (requiredRole && !isAuthorized(requiredRole)) {
    // Redirect to unauthorized page
    navigate('/unauthorized', { state: { from: location.pathname } });
    return null;
  }

  return <>{children}</>;
}

// Unauthorized page component
export function UnauthorizedPage() {
  const navigate = useNavigate();
  const { state } = useLocation() as { state: { from: string } | null };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="max-w-md w-full p-8 bg-gray-800 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold text-red-500 mb-4">Access Denied</h1>
        <p className="text-gray-300 mb-6">
          You don't have permission to access this page.
          {state?.from && <span> ({state.from})</span>}
        </p>
        <div className="flex flex-col space-y-4">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white transition"
          >
            Return to Home
          </button>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded-md text-white transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
