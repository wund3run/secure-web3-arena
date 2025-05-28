
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  DollarSign,
  Star,
  Users,
  Activity,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/auth';
import { useDashboardData } from '@/hooks/useDashboardData';
import { formatDistanceToNow } from 'date-fns';

export function FunctionalDashboard() {
  const { getUserType } = useAuth();
  const { stats, recentActivity, loading } = useDashboardData();
  const userType = getUserType();

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-3 bg-gray-200 rounded w-2/3"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const getStatsCards = () => {
    if (userType === 'auditor') {
      return [
        {
          title: 'Active Audits',
          value: stats.activeAudits,
          change: '+1 from last month',
          icon: Shield,
          color: 'text-blue-600',
        },
        {
          title: 'Reputation Score',
          value: stats.averageRating?.toFixed(1) || '0.0',
          change: 'Based on client reviews',
          icon: Star,
          color: 'text-yellow-600',
        },
        {
          title: 'Completed Audits',
          value: stats.completedAudits,
          change: `+${Math.max(0, stats.completedAudits - 10)} this month`,
          icon: CheckCircle,
          color: 'text-green-600',
        },
        {
          title: 'Total Earnings',
          value: `$${stats.totalEarnings?.toLocaleString() || '0'}`,
          change: '+20.1% from last month',
          icon: DollarSign,
          color: 'text-green-600',
        },
      ];
    } else if (userType === 'project_owner') {
      return [
        {
          title: 'Active Projects',
          value: stats.activeAudits,
          change: `${stats.pendingAudits} pending review`,
          icon: Shield,
          color: 'text-blue-600',
        },
        {
          title: 'Security Score',
          value: `${stats.securityScore || 0}%`,
          change: '+5% improvement',
          icon: CheckCircle,
          color: 'text-green-600',
        },
        {
          title: 'Vulnerabilities Fixed',
          value: stats.vulnerabilitiesFixed || 0,
          change: 'This month',
          icon: AlertTriangle,
          color: 'text-orange-600',
        },
        {
          title: 'Total Audits',
          value: stats.totalAudits,
          change: 'All time',
          icon: Activity,
          color: 'text-purple-600',
        },
      ];
    } else if (userType === 'admin') {
      return [
        {
          title: 'Platform Users',
          value: '2,350',
          change: '+180 from last month',
          icon: Users,
          color: 'text-blue-600',
        },
        {
          title: 'Active Audits',
          value: stats.activeAudits,
          change: '+12% from last week',
          icon: Activity,
          color: 'text-green-600',
        },
        {
          title: 'Platform Revenue',
          value: `$${stats.totalEarnings?.toLocaleString() || '0'}`,
          change: '+8.2% from last month',
          icon: DollarSign,
          color: 'text-green-600',
        },
        {
          title: 'System Health',
          value: '99.9%',
          change: 'Uptime this month',
          icon: CheckCircle,
          color: 'text-green-600',
        },
      ];
    }
    return [];
  };

  const statsCards = getStatsCards();

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length > 0 ? (
                recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{activity.title}</p>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                    </div>
                    {activity.status && (
                      <Badge variant="outline" className="text-xs">
                        {activity.status}
                      </Badge>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-center py-4">
                  No recent activity
                </p>
              )}
              <Button variant="outline" size="sm" asChild className="w-full">
                <Link to="/audits">
                  View All Activity
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {userType === 'auditor' && (
                <>
                  <Button asChild className="w-full justify-start">
                    <Link to="/audits">
                      <Shield className="mr-2 h-4 w-4" />
                      Browse Available Audits
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/submit-service">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Submit Service Offering
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/dashboard/analytics">
                      <Activity className="mr-2 h-4 w-4" />
                      View Performance
                    </Link>
                  </Button>
                </>
              )}
              {userType === 'project_owner' && (
                <>
                  <Button asChild className="w-full justify-start">
                    <Link to="/request-audit">
                      <Shield className="mr-2 h-4 w-4" />
                      Request New Audit
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/marketplace">
                      <Users className="mr-2 h-4 w-4" />
                      Browse Auditors
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/dashboard/analytics">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Security Analytics
                    </Link>
                  </Button>
                </>
              )}
              {userType === 'admin' && (
                <>
                  <Button asChild className="w-full justify-start">
                    <Link to="/admin">
                      <Users className="mr-2 h-4 w-4" />
                      Admin Panel
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/admin/users">
                      <Activity className="mr-2 h-4 w-4" />
                      Manage Users
                    </Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full justify-start">
                    <Link to="/admin/reports">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      Platform Reports
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Overview for Active Audits */}
      {userType !== 'admin' && stats.activeAudits > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Active {userType === 'auditor' ? 'Audits' : 'Projects'} Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Mock progress data - in real app, fetch from audit_progress table */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>DeFi Protocol Security Review</span>
                  <span>75%</span>
                </div>
                <Progress value={75} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>NFT Marketplace Audit</span>
                  <span>45%</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Smart Contract Assessment</span>
                  <span>90%</span>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
