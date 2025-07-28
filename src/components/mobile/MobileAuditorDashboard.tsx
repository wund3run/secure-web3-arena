import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useAuth } from '@/contexts/auth';
import { useIsMobile } from '@/hooks/use-mobile';
import { 
  Menu,
  Search,
  Bell,
  MessageSquare,
  BarChart3,
  Shield,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Filter,
  TrendingUp,
  Users,
  DollarSign
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickStat {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ReactNode;
  color: string;
}

interface RecentActivity {
  id: string;
  type: 'message' | 'finding' | 'completion' | 'application';
  title: string;
  subtitle: string;
  timestamp: string;
  priority?: 'high' | 'medium' | 'low';
}

export function MobileAuditorDashboard() {
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [selectedTab, setSelectedTab] = useState('overview');

  // Mock data - in real implementation, this would come from hooks/API
  const quickStats: QuickStat[] = [
    {
      title: 'Active Audits',
      value: 3,
      change: '+1 this week',
      trend: 'up',
      icon: <Shield className="h-4 w-4" />,
      color: 'text-blue-600 bg-blue-50'
    },
    {
      title: 'Pending Reviews',
      value: 5,
      change: '-2 today',
      trend: 'down',
      icon: <Clock className="h-4 w-4" />,
      color: 'text-orange-600 bg-orange-50'
    },
    {
      title: 'This Month',
      value: '$12.5k',
      change: '+23%',
      trend: 'up',
      icon: <DollarSign className="h-4 w-4" />,
      color: 'text-green-600 bg-green-50'
    },
    {
      title: 'Satisfaction',
      value: '4.9★',
      change: 'Excellent',
      trend: 'up',
      icon: <TrendingUp className="h-4 w-4" />,
      color: 'text-purple-600 bg-purple-50'
    }
  ];

  const recentActivity: RecentActivity[] = [
    {
      id: '1',
      type: 'message',
      title: 'New message from TechCorp',
      subtitle: 'Regarding the DeFi protocol audit',
      timestamp: '5 min ago',
      priority: 'high'
    },
    {
      id: '2',
      type: 'finding',
      title: 'Critical finding identified',
      subtitle: 'Access control vulnerability in TokenSwap',
      timestamp: '1 hour ago',
      priority: 'high'
    },
    {
      id: '3',
      type: 'completion',
      title: 'Audit milestone completed',
      subtitle: 'Smart contract analysis phase finished',
      timestamp: '3 hours ago'
    },
    {
      id: '4',
      type: 'application',
      title: 'New audit opportunity',
      subtitle: 'NFT marketplace security review',
      timestamp: '1 day ago'
    }
  ];

  const getActivityIcon = (type: RecentActivity['type']) => {
    switch (type) {
      case 'message': return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'finding': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'completion': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'application': return <Plus className="h-4 w-4 text-purple-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-300 bg-gray-50';
    }
  };

  const MobileNavigation = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="grid grid-cols-5 h-16">
        {[
          { id: 'overview', icon: BarChart3, label: 'Overview' },
          { id: 'audits', icon: Shield, label: 'Audits' },
          { id: 'messages', icon: MessageSquare, label: 'Messages' },
          { id: 'analytics', icon: TrendingUp, label: 'Analytics' },
          { id: 'profile', icon: Users, label: 'Profile' }
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setSelectedTab(item.id)}
            className={cn(
              "flex flex-col items-center justify-center space-y-1 py-2",
              selectedTab === item.id 
                ? "text-blue-600 bg-blue-50" 
                : "text-gray-600 hover:text-gray-900"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const QuickActions = () => (
    <div className="grid grid-cols-2 gap-3 mb-6">
      <Button className="h-14 flex-col space-y-1" variant="outline">
        <Plus className="h-5 w-5" />
        <span className="text-xs">New Audit</span>
      </Button>
      <Button className="h-14 flex-col space-y-1" variant="outline">
        <MessageSquare className="h-5 w-5" />
        <span className="text-xs">Messages</span>
      </Button>
    </div>
  );

  if (!isMobile) {
    // Return regular desktop dashboard or redirect
    return (
      <div className="p-6">
        <p className="text-center text-gray-600">
          This is the mobile-optimized view. Please use the desktop dashboard on larger screens.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Mobile Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="py-6 space-y-4">
                  <div className="px-3">
                    <h2 className="text-lg font-semibold">Navigation</h2>
                  </div>
                  {/* Add navigation items here */}
                </div>
              </SheetContent>
            </Sheet>
            <div>
              <h1 className="text-lg font-semibold">Auditor Dashboard</h1>
              <p className="text-sm text-gray-600">Welcome back, {user?.email?.split('@')[0]}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="p-2 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <Search className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Quick Actions */}
        <QuickActions />

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          {quickStats.map((stat, index) => (
            <Card key={index} className="p-4">
              <div className="flex items-center justify-between mb-2">
                <div className={cn("p-2 rounded-lg", stat.color)}>
                  {stat.icon}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-gray-600">{stat.title}</p>
                </div>
              </div>
              <p className={cn(
                "text-xs font-medium",
                stat.trend === 'up' ? 'text-green-600' : 
                stat.trend === 'down' ? 'text-red-600' : 'text-gray-600'
              )}>
                {stat.change}
              </p>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity) => (
              <div 
                key={activity.id}
                className={cn(
                  "flex items-start space-x-3 p-3 rounded-lg border-l-4 cursor-pointer transition-colors",
                  getPriorityColor(activity.priority)
                )}
              >
                <div className="flex-shrink-0 mt-1">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {activity.title}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    {activity.subtitle}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {activity.timestamp}
                  </p>
                </div>
                {activity.priority === 'high' && (
                  <Badge variant="error" className="text-xs">
                    High
                  </Badge>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Current Audits - Mobile Optimized */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Current Audits</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-64">
              <div className="space-y-3">
                {[
                  { 
                    name: 'DeFi Protocol Security Review', 
                    client: 'TechCorp', 
                    progress: 75, 
                    deadline: '3 days left',
                    status: 'In Progress',
                    priority: 'high'
                  },
                  { 
                    name: 'Smart Contract Audit', 
                    client: 'StartupDAO', 
                    progress: 45, 
                    deadline: '1 week left',
                    status: 'Analysis',
                    priority: 'medium'
                  },
                  { 
                    name: 'NFT Marketplace Review', 
                    client: 'ArtBlock', 
                    progress: 20, 
                    deadline: '2 weeks left',
                    status: 'Planning',
                    priority: 'low'
                  }
                ].map((audit, index) => (
                  <div key={index} className="p-3 border rounded-lg space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{audit.name}</h4>
                        <p className="text-xs text-gray-600">{audit.client}</p>
                      </div>
                      <Badge 
                        variant={audit.priority === 'high' ? 'destructive' : 'secondary'}
                        className="text-xs"
                      >
                        {audit.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Progress</span>
                        <span>{audit.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${audit.progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500">{audit.deadline}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation />
    </div>
  );
} 