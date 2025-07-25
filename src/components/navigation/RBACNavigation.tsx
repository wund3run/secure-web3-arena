import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, MessageCircle, BarChart3, Users, HelpCircle, Briefcase, Settings, 
         Lock, User, Zap, FileText, Award, Bell, BookOpen, Activity } from 'lucide-react';
import { useRBAC } from '@/contexts/RBACContext';
import { cn } from '@/lib/utils';

import { UserRole } from '@/contexts/RBACContext';

interface NavItem {
  path: string;
  label: string;
  icon: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
  requiredPermission?: string;
  childItems?: NavItem[];
}

export default function RBACNavigation() {
  const location = useLocation();
  const { user, isAuthenticated, isAuthorized, hasPermission } = useRBAC();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navItems: NavItem[] = [
    {
      path: '/dashboard',
      label: 'Dashboard',
      icon: <Activity className="h-5 w-5" />
    },
    {
      path: '/marketplace',
      label: 'Marketplace',
      icon: <Briefcase className="h-5 w-5" />
    },
    {
      path: '/tools/ai',
      label: 'AI Tools',
      icon: <Zap className="h-5 w-5" />
    },
    {
      path: '/analytics',
      label: 'Analytics',
      icon: <BarChart3 className="h-5 w-5" />,
      requiredRole: ['admin', 'auditor'],
      childItems: [
        {
          path: '/analytics/dashboard',
          label: 'Overview',
          icon: <Activity className="h-5 w-5" />,
          requiredRole: ['admin', 'auditor']
        },
        {
          path: '/analytics/live',
          label: 'Live Data',
          icon: <Activity className="h-5 w-5" />,
          requiredRole: 'admin'
        },
        {
          path: '/analytics/auditor',
          label: 'Auditor Metrics',
          icon: <Award className="h-5 w-5" />,
          requiredRole: ['admin', 'auditor']
        }
      ]
    },
    {
      path: '/auditor/dashboard',
      label: 'Auditor Dashboard',
      icon: <Shield className="h-5 w-5" />,
      requiredRole: ['admin', 'auditor']
    },
    {
      path: '/security',
      label: 'Security',
      icon: <Lock className="h-5 w-5" />,
      childItems: [
        {
          path: '/security/compliance',
          label: 'Compliance',
          icon: <FileText className="h-5 w-5" />,
          requiredRole: 'admin'
        },
        {
          path: '/security/insights',
          label: 'Security Insights',
          icon: <Activity className="h-5 w-5" />,
          requiredRole: ['admin', 'auditor']
        }
      ]
    },
    {
      path: '/admin',
      label: 'Admin',
      icon: <Settings className="h-5 w-5" />,
      requiredRole: 'admin',
      childItems: [
        {
          path: '/admin/dashboard',
          label: 'Admin Dashboard',
          icon: <Activity className="h-5 w-5" />,
          requiredRole: 'admin'
        },
        {
          path: '/admin/analytics',
          label: 'Analytics Dashboard',
          icon: <BarChart3 className="h-5 w-5" />,
          requiredRole: 'admin'
        },
        {
          path: '/admin/users',
          label: 'User Management',
          icon: <Users className="h-5 w-5" />,
          requiredRole: 'admin'
        }
      ]
    },
    {
      path: '/learn',
      label: 'Learn',
      icon: <BookOpen className="h-5 w-5" />
    },
    {
      path: '/community',
      label: 'Community',
      icon: <MessageCircle className="h-5 w-5" />
    },
    {
      path: '/support',
      label: 'Help & Support',
      icon: <HelpCircle className="h-5 w-5" />
    }
  ];

  // Filter navigation items based on user permissions
  const filterNavItems = (items: NavItem[]): NavItem[] => {
    return items.filter(item => {
      // If not authenticated, only show public items
      if (!isAuthenticated) {
        return !item.requiredRole && !item.requiredPermission;
      }
      
      // Check role requirement
      const roleCheck = item.requiredRole 
        ? isAuthorized(item.requiredRole as UserRole | UserRole[]) 
        : true;
        
      // Check permission requirement
      const permissionCheck = item.requiredPermission 
        ? hasPermission(item.requiredPermission) 
        : true;
        
      // Process child items recursively
      if (item.childItems) {
        item = {
          ...item,
          childItems: filterNavItems(item.childItems)
        };
      }
      
      return roleCheck && permissionCheck;
    });
  };
  
  const authorizedNavItems = filterNavItems(navItems);
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  return (
    <div className="bg-gray-800 text-white">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <div className="h-16 px-4 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center">
            <Link to="/" className="flex items-center mr-8">
              <Shield className="h-8 w-8 text-purple-500" />
              <span className="ml-2 text-xl font-bold">Hawkly</span>
            </Link>
            
            <div className="flex space-x-1">
              {authorizedNavItems.map((item) => (
                <div key={item.path} className="relative group">
                  <Link
                    to={item.path}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium flex items-center",
                      isActive(item.path)
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white"
                    )}
                  >
                    {item.icon}
                    <span className="ml-2">{item.label}</span>
                  </Link>
                  
                  {item.childItems && item.childItems.length > 0 && (
                    <div className="absolute z-10 left-0 mt-1 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                      <div className="py-1">
                        {item.childItems.map((childItem) => (
                          <Link
                            key={childItem.path}
                            to={childItem.path}
                            className={cn(
                              "block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 flex items-center",
                              isActive(childItem.path) && "bg-gray-700 text-white"
                            )}
                          >
                            {childItem.icon}
                            <span className="ml-2">{childItem.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center">
                <Link
                  to="/profile"
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                >
                  <User className="h-5 w-5 mr-2" />
                  <span>{user?.name}</span>
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-purple-700">
                    {user?.role}
                  </span>
                </Link>
                <Link
                  to="/notifications"
                  className="ml-3 p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <Bell className="h-5 w-5" />
                </Link>
              </div>
            ) : (
              <Link
                to="/auth"
                className="px-4 py-2 rounded-md text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-700">
          <Link to="/" className="flex items-center">
            <Shield className="h-8 w-8 text-purple-500" />
            <span className="ml-2 text-xl font-bold">Hawkly</span>
          </Link>
          
          <div className="flex items-center">
            {isAuthenticated && (
              <Link
                to="/notifications"
                className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 mr-2"
              >
                <Bell className="h-5 w-5" />
              </Link>
            )}
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-b border-gray-700">
            {authorizedNavItems.map((item) => (
              <div key={item.path}>
                <Link
                  to={item.path}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium flex items-center",
                    isActive(item.path)
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  )}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Link>
                
                {item.childItems && item.childItems.length > 0 && (
                  <div className="pl-4 space-y-1 mt-1">
                    {item.childItems.map((childItem) => (
                      <Link
                        key={childItem.path}
                        to={childItem.path}
                        className={cn(
                          "block px-3 py-2 rounded-md text-sm font-medium flex items-center",
                          isActive(childItem.path)
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:bg-gray-700 hover:text-white"
                        )}
                      >
                        {childItem.icon}
                        <span className="ml-2">{childItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {isAuthenticated ? (
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white flex items-center"
              >
                <User className="h-5 w-5 mr-2" />
                <span>{user?.name}</span>
                <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-purple-700">
                  {user?.role}
                </span>
              </Link>
            ) : (
              <Link
                to="/auth"
                className="block w-full px-3 py-2 rounded-md text-center font-medium text-white bg-purple-600 hover:bg-purple-700"
              >
                Sign In
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
