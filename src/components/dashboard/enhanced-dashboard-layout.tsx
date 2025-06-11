
import React from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  DollarSign, 
  FileText, 
  Shield, 
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardStats {
  totalProjects: number;
  activeAudits: number;
  completedAudits: number;
  totalEarnings?: number;
  securityScore?: number;
  responseTime?: string;
}

interface EnhancedDashboardLayoutProps {
  userType: 'project_owner' | 'auditor' | 'admin';
  stats: DashboardStats;
  recentActivity: any[];
  children?: React.ReactNode;
}

export function EnhancedDashboardLayout({ 
  userType, 
  stats, 
  recentActivity,
  children 
}: EnhancedDashboardLayoutProps) {
  const { userProfile } = useAuth();

  const getWelcomeMessage = () => {
    const name = userProfile?.display_name || userProfile?.full_name || 'there';
    switch (userType) {
      case 'auditor':
        return `Welcome back, ${name}! Ready to secure some smart contracts?`;
      case 'project_owner':
        return `Hello ${name}! Let's keep your Web3 projects secure.`;
      case 'admin':
        return `Admin Dashboard - ${name}`;
      default:
        return `Welcome, ${name}!`;
    }
  };

  const getQuickActions = () => {
    switch (userType) {
      case 'auditor':
        return [
          { label: 'Browse Projects', href: '/marketplace', icon: FileText },
          { label: 'Update Availability', href: '/profile', icon: Clock },
          { label: 'View Earnings', href: '/earnings', icon: DollarSign },
        ];
      case 'project_owner':
        return [
          { label: 'Request Audit', href: '/request-audit', icon: Shield },
          { label: 'Find Auditors', href: '/marketplace', icon: Users },
          { label: 'View Reports', href: '/audits', icon: FileText },
        ];
      default:
        return [];
    }
  };

  const getStatsCards = () => {
    const baseStats = [
      {
        title: 'Active Projects',
        value: stats.activeAudits,
        icon: Activity,
        color: 'text-blue-500',
        description: 'Currently in progress'
      },
      {
        title: 'Completed',
        value: stats.completedAudits,
        icon: CheckCircle,
        color: 'text-green-500',
        description: 'Successfully finished'
      }
    ];

    if (userType === 'auditor') {
      return [
        ...baseStats,
        {
          title: 'Total Earnings',
          value: `$${stats.totalEarnings?.toLocaleString() || '0'}`,
          icon: DollarSign,
          color: 'text-emerald-500',
          description: 'Lifetime earnings'
        },
        {
          title: 'Response Time',
          value: stats.responseTime || '< 24h',
          icon: Clock,
          color: 'text-orange-500',
          description: 'Average response'
        }
      ];
    }

    if (userType === 'project_owner') {
      return [
        ...baseStats,
        {
          title: 'Security Score',
          value: `${stats.securityScore || 85}/100`,
          icon: Shield,
          color: 'text-purple-500',
          description: 'Overall security rating'
        },
        {
          title: 'Total Projects',
          value: stats.totalProjects,
          icon: TrendingUp,
          color: 'text-indigo-500',
          description: 'All time projects'
        }
      ];
    }

    return baseStats;
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{getWelcomeMessage()}</h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your {userType === 'auditor' ? 'auditing business' : 'projects'} today.
          </p>
        </div>
        <Badge variant="secondary" className="ml-4">
          {userType === 'auditor' ? 'Security Expert' : 'Project Owner'}
        </Badge>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Quick Actions
          </CardTitle>
          <CardDescription>
            Jump into your most common tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {getQuickActions().map((action, index) => (
              <Button
                key={index}
                variant="outline"
                asChild
                className="h-auto p-4 flex flex-col items-center space-y-2"
              >
                <Link to={action.href}>
                  <action.icon className="h-6 w-6" />
                  <span className="font-medium">{action.label}</span>
                </Link>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {getStatsCards().map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Indicators for Auditors */}
      {userType === 'auditor' && stats.securityScore && (
        <Card>
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
            <CardDescription>
              Complete your profile to get more audit opportunities
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Profile Strength</span>
                <span>{stats.securityScore}%</span>
              </div>
              <Progress value={stats.securityScore} className="h-2" />
            </div>
            {stats.securityScore < 90 && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <AlertTriangle className="h-4 w-4" />
                <span>Add certifications and portfolio items to improve your profile</span>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Custom Children Content */}
      {children}

      {/* Recent Activity */}
      {recentActivity.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest interactions and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentActivity.slice(0, 5).map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                  <div className="h-2 w-2 bg-blue-500 rounded-full" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-muted-foreground">{activity.description}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.timestamp}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
