import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { 
  Settings, 
  BarChart3, 
  Shield, 
  MessageSquare, 
  Bell, 
  Users, 
  Activity,
  FileText,
  Clock, 
  TrendingUp, 
  CheckCircle,
  User,
  Menu,
  X,
  ChevronRight,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/auth';
import { ConnectionTest } from '@/components/debug/ConnectionTest';
import { HawklyCard, SecurityBadge, ProgressIndicator, LiveMetric } from '@/components/ui/hawkly-components';
import { EnhancedRouteGuard } from '@/components/routing/EnhancedRouteGuard';
import { ProjectOwnerDashboard } from '@/components/dashboard/enhanced/ProjectOwnerDashboard';
import { EnhancedAuditorDashboard } from '@/components/dashboard/enhanced/EnhancedAuditorDashboard';
import { AdminDashboard } from '@/components/admin/AdminDashboard';
import { AuditProgressTracker } from '@/components/dashboard/enhanced/AuditProgressTracker';
import { RealtimeChatSystem } from '@/components/chat/RealtimeChatSystem';
import { EnhancedNotificationCenter } from '@/components/notifications/EnhancedNotificationCenter';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user, getUserType, loading } = useAuth();
  const [showDebug, setShowDebug] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  const userType = user ? getUserType() : 'guest';

  // Generate greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const renderDashboardContent = () => {
    switch (userType) {
      case 'project_owner':
        return <ProjectOwnerDashboard />;
      case 'auditor':
        return <EnhancedAuditorDashboard />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <ProjectOwnerDashboard />;
    }
  };

  // Custom sidebar navigation items
  const sidebarItems = [
    { icon: BarChart3, label: 'Dashboard', href: '/dashboard', active: true },
    { icon: Shield, label: 'Security Hub', href: '/security-hub', active: false },
    { icon: FileText, label: 'Audit Reports', href: '/audits', active: false },
    { icon: MessageSquare, label: 'Messages', href: '/messages', active: false },
    { icon: Users, label: 'Team', href: '/team', active: false },
    { icon: Settings, label: 'Settings', href: '/profile/settings', active: false }
  ];

  // Quick actions based on user type
  const quickActions = userType === 'project_owner' 
    ? [
        { label: 'Request Audit', href: '/request-audit', icon: Shield },
        { label: 'Find Auditors', href: '/marketplace', icon: Users },
        { label: 'View Reports', href: '/audits', icon: FileText },
      ]
    : [
        { label: 'Browse Projects', href: '/marketplace', icon: FileText },
        { label: 'Update Availability', href: '/profile', icon: Clock },
        { label: 'View Earnings', href: '/earnings', icon: Activity },
      ];

  return (
    <>
      <Helmet>
        <title>Dashboard | Hawkly</title>
        <meta name="description" content="Your comprehensive security management dashboard with real-time tracking and advanced features" />
      </Helmet>
      
      <div className="min-h-screen bg-[#0a0d16] flex">
        {/* Sidebar */}
        <div 
          className={`${
            sidebarOpen ? 'w-64' : 'w-20'
          } bg-[#1e2332] border-r border-[#23283e] transition-all duration-300 hidden md:block`}
        >
          <div className="p-4 flex justify-between items-center">
            <div className={`flex items-center ${!sidebarOpen && 'justify-center w-full'}`}>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a879ef] to-[#32d9fa] flex items-center justify-center text-white font-bold">
                H
              </div>
              {sidebarOpen && (
                <span className="ml-3 font-bold text-white">HAWKLY</span>
              )}
            </div>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-1 rounded-md hover:bg-[#272e43] text-[#8391ad]"
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
          
          <div className="mt-6">
            {sidebarItems.map((item, index) => (
              <Link
                key={index}
                to={item.href}
                className={`
                  flex items-center px-4 py-3 text-[#8391ad] hover:bg-[#272e43] hover:text-white
                  ${item.active ? 'bg-[#272e43] text-white border-l-2 border-[#a879ef]' : ''}
                `}
              >
                <item.icon size={20} className={`${!sidebarOpen ? 'mx-auto' : 'mr-3'}`} />
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </div>

          {sidebarOpen && (
            <div className="absolute bottom-4 left-4 right-4">
              <HawklyCard variant="glass" className="p-3">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-[#272e43] flex items-center justify-center text-[#a879ef]">
                    <User size={18} />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-white">
                      {user?.email?.split('@')[0] || 'User'}
                    </p>
                    <p className="text-xs text-[#8391ad]">
                      {userType.replace('_', ' ')}
                    </p>
                  </div>
                </div>
              </HawklyCard>
            </div>
          )}
        </div>
        
        {/* Mobile sidebar toggle button */}
        <div className="md:hidden fixed bottom-4 left-4 z-50">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-3 rounded-full bg-[#a879ef] text-white shadow-lg shadow-[#a879ef]/20"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        
        {/* Mobile sidebar (only visible when open) */}
        {sidebarOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-[#0a0d16]/80 backdrop-blur-sm">
            <div className="w-64 h-full bg-[#1e2332] border-r border-[#23283e]">
              <div className="p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#a879ef] to-[#32d9fa] flex items-center justify-center text-white font-bold">
                    H
                  </div>
                  <span className="ml-3 font-bold text-white">HAWKLY</span>
                </div>
                <button 
                  onClick={() => setSidebarOpen(false)} 
                  className="p-1 rounded-md hover:bg-[#272e43] text-[#8391ad]"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="mt-6">
                {sidebarItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.href}
                    className={`
                      flex items-center px-4 py-3 text-[#8391ad] hover:bg-[#272e43] hover:text-white
                      ${item.active ? 'bg-[#272e43] text-white border-l-2 border-[#a879ef]' : ''}
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon size={20} className="mr-3" />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* Main content */}
        <div className="flex-1 overflow-auto">
          <div className="container mx-auto px-4 py-6">
            <EnhancedRouteGuard 
              requiresAuth={true}
              allowedRoles={['auditor', 'project_owner', 'admin']}
              fallbackMessage="Please sign in to access your personalized dashboard"
            >
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-bold text-white">
                      {getGreeting()}, {user?.email?.split('@')[0] || 'User'}
                    </h1>
                    <p className="text-[#8391ad]">Welcome to your security dashboard</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="bg-[#272e43] border-[#23283e] text-[#8391ad] hover:text-white hover:border-[#a879ef]"
                      onClick={() => setShowDebug(!showDebug)}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      {showDebug ? 'Hide' : 'Show'} Debug
                    </Button>
                    
                    <SecurityBadge 
                      level={userType === 'admin' ? 'enterprise' : userType === 'auditor' ? 'advanced' : 'basic'} 
                      verified={true} 
                      size="md" 
                    />
                  </div>
                </div>
                
                {showDebug && (
                  <div className="mt-4 p-4 bg-[#1e2332] border border-[#23283e] rounded-xl">
                    <ConnectionTest />
                  </div>
                )}
              </div>
              
              {/* Quick Actions */}
              <div className="mb-8">
                <h2 className="text-lg font-medium text-white mb-3">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {quickActions.map((action, idx) => (
                    <Link to={action.href} key={idx}>
                      <HawklyCard variant="interactive" elevation="subtle" className="p-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#a879ef]/20 to-[#32d9fa]/20 flex items-center justify-center text-[#a879ef]">
                            <action.icon size={20} />
                          </div>
                          <span className="ml-3 font-medium text-white">{action.label}</span>
                          <ChevronRight className="h-5 w-5 text-[#8391ad] ml-auto" />
                        </div>
                      </HawklyCard>
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Dashboard Content Tabs */}
              <Tabs defaultValue="overview" className="mb-6">
                <TabsList className="bg-[#1e2332] border border-[#23283e]">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-[#a879ef]/10 data-[state=active]:text-[#a879ef]">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="audits" className="data-[state=active]:bg-[#a879ef]/10 data-[state=active]:text-[#a879ef]">
                    <Shield className="h-4 w-4 mr-2" />
                    Audit Progress
                  </TabsTrigger>
                  <TabsTrigger value="chat" className="data-[state=active]:bg-[#a879ef]/10 data-[state=active]:text-[#a879ef]">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Chat
                  </TabsTrigger>
                  <TabsTrigger value="notifications" className="data-[state=active]:bg-[#a879ef]/10 data-[state=active]:text-[#a879ef]">
                    <Bell className="h-4 w-4 mr-2" />
                    Notifications
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview">
                  <div className="space-y-6">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <HawklyCard className="p-4">
                        <LiveMetric 
                          label="Active Audits"
                          value={userType === 'project_owner' ? 3 : 5}
                          icon={Shield}
                          trend="up"
                        />
                      </HawklyCard>
                      
                      <HawklyCard className="p-4">
                        <LiveMetric 
                          label="Security Score"
                          value={userType === 'admin' ? 95 : 82}
                          format="percentage"
                          icon={TrendingUp}
                          trend="up"
                        />
                      </HawklyCard>
                      
                      <HawklyCard className="p-4">
                        <LiveMetric 
                          label={userType === 'auditor' ? "Monthly Earnings" : "Budget Allocated"}
                          value={userType === 'auditor' ? 18500 : 12000}
                          format="currency"
                          icon={Activity}
                          trend={userType === 'auditor' ? "up" : "stable"}
                        />
                      </HawklyCard>
                      
                      <HawklyCard className="p-4">
                        <LiveMetric 
                          label="Recent Activity"
                          value="12 Events"
                          icon={Clock}
                          animated={true}
                        />
                      </HawklyCard>
                    </div>
                    
                    {/* Role-specific Dashboard Content */}
                    {renderDashboardContent()}
                  </div>
                </TabsContent>
                
                <TabsContent value="audits">
                  <HawklyCard className="p-6">
                    <AuditProgressTracker />
                  </HawklyCard>
                </TabsContent>
                
                <TabsContent value="chat">
                  <HawklyCard className="p-6" variant="glass">
                    <RealtimeChatSystem />
                  </HawklyCard>
                </TabsContent>
                
                <TabsContent value="notifications">
                  <HawklyCard className="p-6">
                    <EnhancedNotificationCenter />
                  </HawklyCard>
                </TabsContent>
              </Tabs>
              
              {/* Security Alerts */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-lg font-medium text-white">Security Alerts</h2>
                  <Button variant="ghost" className="text-[#8391ad] hover:text-white">
                    View All
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <HawklyCard className="p-4 border-l-4 border-l-[#fc3574]">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-[#fc3574] mt-0.5" />
                      <div className="ml-3">
                        <h3 className="font-medium text-white">Critical Vulnerability Detected</h3>
                        <p className="text-sm text-[#8391ad]">
                          A critical vulnerability has been detected in your GameFi contract. Please review the audit report.
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-auto bg-transparent border-[#23283e] hover:border-[#fc3574] text-[#8391ad] hover:text-[#fc3574]"
                      >
                        Review
                      </Button>
                    </div>
                  </HawklyCard>
                  
                  <HawklyCard className="p-4 border-l-4 border-l-[#f6ad55]">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-[#f6ad55] mt-0.5" />
                      <div className="ml-3">
                        <h3 className="font-medium text-white">New Audit Comment</h3>
                        <p className="text-sm text-[#8391ad]">
                          An auditor has left a new comment on your MetaVerse NFT project. Requires your attention.
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-auto bg-transparent border-[#23283e] hover:border-[#f6ad55] text-[#8391ad] hover:text-[#f6ad55]"
                      >
                        View
                      </Button>
                    </div>
                  </HawklyCard>
                  
                  <HawklyCard className="p-4 border-l-4 border-l-[#2de08e]">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-[#2de08e] mt-0.5" />
                      <div className="ml-3">
                        <h3 className="font-medium text-white">Security Test Passed</h3>
                        <p className="text-sm text-[#8391ad]">
                          Your DeFi project has passed all security tests. No critical issues were found.
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="ml-auto bg-transparent border-[#23283e] hover:border-[#2de08e] text-[#8391ad] hover:text-[#2de08e]"
                      >
                        Details
                      </Button>
                    </div>
                  </HawklyCard>
                </div>
              </div>
            </EnhancedRouteGuard>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
