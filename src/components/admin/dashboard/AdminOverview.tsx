
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Shield, 
  TrendingUp, 
  DollarSign, 
  Activity, 
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function AdminOverview() {
  const platformStats = {
    totalUsers: 2350,
    activeAuditors: 127,
    projectOwners: 1890,
    admins: 8,
    activeAudits: 89,
    completedThisMonth: 156,
    revenue: 125430,
    growthRate: 8.2,
    systemUptime: 99.9,
    supportTickets: 23
  };

  const recentActivities = [
    {
      id: 1,
      type: 'user_registered',
      title: 'New User Registration',
      description: 'Alice Johnson joined as Project Owner',
      timestamp: '2 minutes ago',
      severity: 'info'
    },
    {
      id: 2,
      type: 'audit_completed',
      title: 'Audit Completed',
      description: 'DeFi Protocol V2 audit finished by CyberSec Labs',
      timestamp: '15 minutes ago',
      severity: 'success'
    },
    {
      id: 3,
      type: 'dispute_raised',
      title: 'Dispute Raised',
      description: 'Payment dispute for NFT Marketplace audit',
      timestamp: '1 hour ago',
      severity: 'warning'
    },
    {
      id: 4,
      type: 'system_alert',
      title: 'System Alert',
      description: 'High CPU usage detected on audit processing server',
      timestamp: '2 hours ago',
      severity: 'error'
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'user_registered':
        return <Users className="h-4 w-4 text-blue-600" />;
      case 'audit_completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'dispute_raised':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'system_alert':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return <Activity className="h-4 w-4 text-gray-600" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    const variants = {
      info: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={variants[severity as keyof typeof variants] || variants.info}>
        {severity}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +180 from last month
            </p>
            <div className="mt-2 text-xs">
              <span className="text-blue-600">{platformStats.activeAuditors} auditors</span> · 
              <span className="text-green-600 ml-1">{platformStats.projectOwners} projects</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Audits</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.activeAudits}</div>
            <p className="text-xs text-muted-foreground">
              {platformStats.completedThisMonth} completed this month
            </p>
            <div className="mt-2">
              <Progress value={75} className="h-1" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${platformStats.revenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{platformStats.growthRate}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{platformStats.systemUptime}%</div>
            <p className="text-xs text-muted-foreground">
              Uptime this month
            </p>
            <div className="mt-2">
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                Operational
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities and Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Platform Activity
                <Button variant="outline" size="sm" asChild>
                  <Link to="/admin/reports">View All</Link>
                </Button>
              </CardTitle>
              <CardDescription>
                Latest events and system activities across the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border bg-card">
                    <div className="mt-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-sm">{activity.title}</p>
                        {getSeverityBadge(activity.severity)}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{activity.description}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {activity.timestamp}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common administrative tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/admin/users">
                    <Users className="mr-2 h-4 w-4" />
                    Manage Users
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/admin/audits">
                    <Shield className="mr-2 h-4 w-4" />
                    Review Audits
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/admin/reports">
                    <FileText className="mr-2 h-4 w-4" />
                    Generate Reports
                  </Link>
                </Button>
                <Button className="w-full justify-start" variant="outline" asChild>
                  <Link to="/admin/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    System Settings
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Support Queue</CardTitle>
              <CardDescription>Pending support tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{platformStats.supportTickets}</div>
                <p className="text-sm text-muted-foreground mb-3">Open tickets</p>
                <Button size="sm" asChild>
                  <Link to="/admin/support">Manage Tickets</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
