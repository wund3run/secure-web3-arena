
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Users, Shield, DollarSign, Activity } from 'lucide-react';

export function SystemAnalytics() {
  const monthlyData = [
    { month: 'Jan', users: 180, audits: 45, revenue: 12500 },
    { month: 'Feb', users: 220, audits: 52, revenue: 15200 },
    { month: 'Mar', users: 190, audits: 48, revenue: 14100 },
    { month: 'Apr', users: 280, audits: 68, revenue: 18900 },
    { month: 'May', users: 320, audits: 75, revenue: 21300 },
    { month: 'Jun', users: 350, audits: 82, revenue: 23800 }
  ];

  const userGrowthData = [
    { month: 'Jan', auditors: 98, projectOwners: 1420 },
    { month: 'Feb', auditors: 105, projectOwners: 1580 },
    { month: 'Mar', auditors: 110, projectOwners: 1650 },
    { month: 'Apr', auditors: 118, projectOwners: 1780 },
    { month: 'May', auditors: 124, projectOwners: 1850 },
    { month: 'Jun', auditors: 127, projectOwners: 1890 }
  ];

  const auditDistribution = [
    { name: 'Smart Contracts', value: 45, color: '#8884d8' },
    { name: 'DeFi Protocols', value: 30, color: '#82ca9d' },
    { name: 'NFT Projects', value: 15, color: '#ffc658' },
    { name: 'Cross-Chain', value: 10, color: '#ff7300' }
  ];

  const performanceMetrics = [
    {
      metric: 'Platform Uptime',
      value: 99.9,
      target: 99.5,
      status: 'excellent'
    },
    {
      metric: 'Average Response Time',
      value: 245,
      target: 300,
      status: 'good',
      unit: 'ms'
    },
    {
      metric: 'User Satisfaction',
      value: 4.8,
      target: 4.5,
      status: 'excellent',
      unit: '/5'
    },
    {
      metric: 'Audit Success Rate',
      value: 97.2,
      target: 95.0,
      status: 'excellent',
      unit: '%'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      excellent: 'bg-green-100 text-green-800',
      good: 'bg-blue-100 text-blue-800',
      warning: 'bg-yellow-100 text-yellow-800',
      critical: 'bg-red-100 text-red-800'
    };
    
    return (
      <Badge className={variants[status as keyof typeof variants] || variants.good}>
        {status}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">System Analytics</h2>
        <p className="text-muted-foreground">
          Comprehensive platform performance and usage analytics
        </p>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$125,430</div>
            <p className="text-xs text-muted-foreground">+8.2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,350</div>
            <p className="text-xs text-muted-foreground">+180 new this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Audits</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">82</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.9%</div>
            <p className="text-xs text-muted-foreground">Uptime this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Growth</CardTitle>
            <CardDescription>User registrations, audits, and revenue trends</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#8884d8" name="New Users" />
                <Bar dataKey="audits" fill="#82ca9d" name="Audits" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Type Growth</CardTitle>
            <CardDescription>Auditors vs Project Owners over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="auditors" stroke="#8884d8" name="Auditors" />
                <Line type="monotone" dataKey="projectOwners" stroke="#82ca9d" name="Project Owners" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Audit Distribution</CardTitle>
            <CardDescription>Types of projects being audited</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={auditDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {auditDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key performance indicators and targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{metric.metric}</span>
                    {getStatusBadge(metric.status)}
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={(metric.value / (metric.target * 1.2)) * 100} 
                      className="flex-1" 
                    />
                    <span className={`text-sm font-medium ${getStatusColor(metric.status)}`}>
                      {metric.value}{metric.unit || '%'}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Target: {metric.target}{metric.unit || '%'}
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
