
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Users, FileCheck, DollarSign, Shield } from 'lucide-react';

export function PlatformMetrics() {
  // Mock data - in real app this would come from API
  const metrics = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      trend: 'up',
      icon: Users,
      description: 'Active users this month'
    },
    {
      title: 'Audit Requests',
      value: '156',
      change: '+8%',
      trend: 'up',
      icon: FileCheck,
      description: 'Total requests this month'
    },
    {
      title: 'Revenue',
      value: '$127,430',
      change: '+23%',
      trend: 'up',
      icon: DollarSign,
      description: 'Platform fees collected'
    },
    {
      title: 'Security Score',
      value: '98.2%',
      change: '+0.5%',
      trend: 'up',
      icon: Shield,
      description: 'Platform security rating'
    }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-600' : 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const TrendIcon = getTrendIcon(metric.trend);
          const IconComponent = metric.icon;
          
          return (
            <Card key={metric.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <IconComponent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <div className={`flex items-center ${getTrendColor(metric.trend)}`}>
                    <TrendIcon className="h-3 w-3 mr-1" />
                    {metric.change}
                  </div>
                  <span>from last month</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: 'New audit request submitted', time: '2 minutes ago', type: 'audit' },
                { action: 'User verification completed', time: '15 minutes ago', type: 'user' },
                { action: 'Service approved', time: '1 hour ago', type: 'service' },
                { action: 'Payment processed', time: '2 hours ago', type: 'payment' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      {activity.type}
                    </Badge>
                    <span className="text-sm">{activity.action}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Platform performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { metric: 'Database Response Time', value: '45ms', status: 'good' },
                { metric: 'API Uptime', value: '99.9%', status: 'good' },
                { metric: 'Error Rate', value: '0.01%', status: 'good' },
                { metric: 'Active Connections', value: '847', status: 'good' },
              ].map((health, index) => (
                <div key={index} className="flex items-center justify-between py-2">
                  <span className="text-sm">{health.metric}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{health.value}</span>
                    <div className={`h-2 w-2 rounded-full ${
                      health.status === 'good' ? 'bg-green-500' : 'bg-red-500'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
