import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Key, Settings, CreditCard, Lock, Bell, LogOut, Users, 
         Database, Code, CheckCircle, AlertTriangle } from 'lucide-react';
import { useRBAC } from '@/contexts/RBACContext';
import { cn } from '@/lib/utils';

// Role badges with appropriate colors
const RoleBadge = ({ role }: { role: string }) => {
  let color = '';
  
  switch (role) {
    case 'admin':
      color = 'bg-red-600 text-white';
      break;
    case 'auditor':
      color = 'bg-blue-600 text-white';
      break;
    case 'projectOwner':
      color = 'bg-green-600 text-white';
      break;
    default:
      color = 'bg-gray-600 text-white';
  }
  
  return (
    <span className={cn('px-2 py-1 rounded-md text-xs font-medium', color)}>
      {role}
    </span>
  );
};

export default function UserProfilePage() {
  const { user, isAuthorized, hasPermission, logout } = useRBAC();
  const navigate = useNavigate();
  
  if (!user) {
    // Redirect to login if no user
    navigate('/auth');
    return null;
  }
  
  // Generate a menu based on user role
  const getProfileMenu = () => {
    // Common menu items for all users
    const commonMenuItems = [
      {
        icon: <User className="h-5 w-5" />,
        label: 'Personal Information',
        path: '/profile/personal'
      },
      {
        icon: <Lock className="h-5 w-5" />,
        label: 'Account Security',
        path: '/profile/security'
      },
      {
        icon: <Bell className="h-5 w-5" />,
        label: 'Notifications',
        path: '/profile/notifications'
      }
    ];
    
    // Auditor specific menu items
    const auditorMenuItems = isAuthorized(['auditor', 'admin']) ? [
      {
        icon: <Shield className="h-5 w-5" />,
        label: 'Auditor Profile',
        path: '/auditor/profile'
      },
      {
        icon: <CheckCircle className="h-5 w-5" />,
        label: 'Verification Status',
        path: '/auditor/verification'
      }
    ] : [];
    
    // Project Owner specific menu items
    const projectOwnerMenuItems = isAuthorized(['projectOwner', 'admin']) ? [
      {
        icon: <Database className="h-5 w-5" />,
        label: 'My Projects',
        path: '/projects'
      },
      {
        icon: <Code className="h-5 w-5" />,
        label: 'API Credentials',
        path: '/profile/api-credentials'
      },
      {
        icon: <CreditCard className="h-5 w-5" />,
        label: 'Billing & Payments',
        path: '/profile/billing'
      }
    ] : [];
    
    // Admin specific menu items
    const adminMenuItems = isAuthorized('admin') ? [
      {
        icon: <Users className="h-5 w-5" />,
        label: 'User Management',
        path: '/admin/users'
      },
      {
        icon: <Settings className="h-5 w-5" />,
        label: 'Platform Settings',
        path: '/admin/settings'
      },
      {
        icon: <AlertTriangle className="h-5 w-5" />,
        label: 'Security Alerts',
        path: '/admin/security'
      }
    ] : [];
    
    // Combine all menu items based on role
    return [
      ...commonMenuItems,
      ...auditorMenuItems,
      ...projectOwnerMenuItems,
      ...adminMenuItems
    ];
  };
  
  const profileMenu = getProfileMenu();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Profile Header */}
          <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-40 bg-gradient-to-r from-purple-700 to-blue-700">
              <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-gray-800/90 to-transparent"></div>
            </div>
            
            <div className="px-6 py-4 flex flex-col md:flex-row md:items-end md:justify-between relative">
              <div className="flex flex-col md:flex-row md:items-end">
                <div className="absolute md:relative -top-16 md:-top-12 flex items-center justify-center w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 p-1">
                  <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                    <User className="h-16 w-16 text-gray-400" />
                  </div>
                </div>
                
                <div className="mt-8 md:mt-0 md:ml-6">
                  <h1 className="text-2xl font-bold text-white">{user.name}</h1>
                  <div className="flex items-center mt-2 text-gray-300 text-sm">
                    <span className="mr-3">{user.email}</span>
                    <RoleBadge role={user.role} />
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 flex items-center text-sm font-medium text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
          
          {/* Profile Content */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="px-4 py-5">
                  <h2 className="text-lg font-medium text-white mb-4">Account</h2>
                  <nav className="space-y-2">
                    {profileMenu.map((item, index) => (
                      <a
                        key={index}
                        href={item.path}
                        className="flex items-center px-3 py-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white transition-colors"
                      >
                        {item.icon}
                        <span className="ml-3 text-sm">{item.label}</span>
                      </a>
                    ))}
                  </nav>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3">
              <div className="bg-gray-800 rounded-lg shadow-lg">
                <div className="px-6 py-5 border-b border-gray-700">
                  <h2 className="text-lg font-medium text-white">Profile Information</h2>
                </div>
                
                <div className="px-6 py-5">
                  {/* Role-based Permissions Section */}
                  <h3 className="text-md font-medium text-gray-200 mb-4">Your Permissions</h3>
                  
                  <div className="grid grid-cols-1 gap-4 mb-8">
                    {user.permissions.map((permission, index) => (
                      <div key={index} className="px-4 py-3 bg-gray-700/50 rounded-md">
                        <div className="flex items-center text-gray-200">
                          <Key className="h-4 w-4 mr-2 text-green-400" />
                          <span className="text-sm">{permission}</span>
                        </div>
                      </div>
                    ))}
                    {user.permissions.length === 0 && (
                      <div className="px-4 py-3 bg-gray-700/50 rounded-md">
                        <p className="text-sm text-gray-400">No specific permissions assigned.</p>
                      </div>
                    )}
                  </div>
                  
                  {/* Role-based Information */}
                  <h3 className="text-md font-medium text-gray-200 mb-4">Role Information</h3>
                  
                  <div className="p-4 mb-6 bg-gray-700/30 rounded-md">
                    {user.role === 'admin' && (
                      <div>
                        <p className="text-gray-300 mb-3">
                          <span className="font-medium">Admin Access:</span> You have full administrative access to the platform.
                        </p>
                        <div className="text-gray-400 text-sm">
                          <p className="mb-2">As an administrator, you can:</p>
                          <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>Manage all users and projects</li>
                            <li>Access platform analytics</li>
                            <li>Configure security settings</li>
                            <li>View and manage all audits</li>
                            <li>Access financial information</li>
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    {user.role === 'auditor' && (
                      <div>
                        <p className="text-gray-300 mb-3">
                          <span className="font-medium">Auditor Access:</span> You have access to auditor features.
                        </p>
                        <div className="text-gray-400 text-sm">
                          <p className="mb-2">As an auditor, you can:</p>
                          <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>View and participate in audit opportunities</li>
                            <li>Access audit tools and templates</li>
                            <li>Submit reports and findings</li>
                            <li>Track your performance and reputation</li>
                            <li>Communicate with project owners</li>
                          </ul>
                        </div>
                      </div>
                    )}
                    
                    {user.role === 'projectOwner' && (
                      <div>
                        <p className="text-gray-300 mb-3">
                          <span className="font-medium">Project Owner Access:</span> You can manage your projects and request audits.
                        </p>
                        <div className="text-gray-400 text-sm">
                          <p className="mb-2">As a project owner, you can:</p>
                          <ul className="list-disc list-inside space-y-1 pl-2">
                            <li>Create and manage projects</li>
                            <li>Request security audits</li>
                            <li>Review audit reports and findings</li>
                            <li>Communicate with auditors</li>
                            <li>Access project-specific analytics</li>
                          </ul>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Two-Factor Authentication Status */}
                  <div className="px-4 py-5 bg-yellow-600/20 rounded-md mb-6">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 pt-0.5">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-yellow-500">Two-factor authentication not enabled</h3>
                        <div className="mt-2 text-sm text-gray-400">
                          <p>
                            For added security, we recommend enabling two-factor authentication for your account.
                          </p>
                        </div>
                        <div className="mt-3">
                          <a href="/profile/security" className="text-sm font-medium text-yellow-500 hover:text-yellow-400">
                            Enable 2FA →
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
