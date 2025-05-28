
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  ShieldCheck,
  AlertTriangle,
  Clock,
  Star,
  Activity
} from 'lucide-react';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#8dd1e1'];

export const ComprehensiveAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('30d');

  // Mock data - in real implementation, this would come from API
  const auditMetrics = [
    { name: 'Jan', audits: 24, revenue: 48000, findings: 156 },
    { name: 'Feb', audits: 32, revenue: 64000, findings: 203 },
    { name: 'Mar', audits: 28, revenue: 56000, findings: 178 },
    { name: 'Apr', audits: 45, revenue: 90000, findings: 267 },
    { name: 'May', audits: 38, revenue: 76000, findings: 198 },
    { name: 'Jun', audits: 52, revenue: 104000, findings: 301 },
  ];

  const severityDistribution = [
    { name: 'Critical', value: 12, color: '#ef4444' },
    { name: 'High', value: 28, color: '#f97316' },
    { name: 'Medium', value: 45, color: '#eab308' },
    { name: 'Low', value: 67, color: '#22c55e' },
    { name: 'Info', value: 23, color: '#3b82f6' },
  ];

  const userGrowth = [
    { name: 'Week 1', clients: 45, auditors: 12 },
    { name: 'Week 2', clients: 52, auditors: 15 },
    { name: 'Week 3', clients: 48, auditors: 18 },
    { name: 'Week 4', clients: 61, auditors: 22 },
  ];

  const topAuditors = [
    { name: 'Sarah Chen', audits: 23, rating: 4.9, revenue: 46000 },
    { name: 'Marcus Rodriguez', audits: 19, rating: 4.8, revenue: 38000 },
    { name: 'Dr. Emily Watson', audits: 15, rating: 5.0, revenue: 52500 },
    { name: 'James Liu', audits: 17, rating: 4.7, revenue: 34000 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 days</SelectItem>
            <SelectItem value="30d">30 days</SelectItem>
            <SelectItem value="90d">90 days</SelectItem>
            <SelectItem value="1y">1 year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Audits</p>
                <p className="text-2xl font-bold">219</p>
                <p className="text-xs text-green-600">+12% from last month</p>
              </div>
              <ShieldCheck className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold">$438K</p>
                <p className="text-xs text-green-600">+18% from last month</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Users</p>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-xs text-green-600">+8% from last month</p>
              </div>
              <Users className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rating</p>
                <p className="text-2xl font-bold">4.8</p>
                <p className="text-xs text-green-600">+0.1 from last month</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid grid-cols-4 gap-2">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="audits">Audit Analytics</TabsTrigger>
          <TabsTrigger value="users">User Analytics</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={auditMetrics}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']} />
                    <Area type="monotone" dataKey="revenue" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Finding Severity Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={severityDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {severityDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="audits" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Audit Volume and Findings</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={auditMetrics}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="audits" fill="#8884d8" name="Audits Completed" />
                  <Bar dataKey="findings" fill="#82ca9d" name="Total Findings" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={userGrowth}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="clients" stroke="#8884d8" name="Clients" />
                    <Line type="monotone" dataKey="auditors" stroke="#82ca9d" name="Auditors" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performing Auditors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topAuditors.map((auditor, index) => (
                    <div key={auditor.name} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{auditor.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {auditor.audits} audits • {auditor.rating}⭐
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${auditor.revenue.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Avg. Completion Time</span>
                </div>
                <p className="text-2xl font-bold">5.2 days</p>
                <p className="text-sm text-green-600">-0.8 days from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  <span className="font-medium">Platform Uptime</span>
                </div>
                <p className="text-2xl font-bold">99.97%</p>
                <p className="text-sm text-green-600">Excellent reliability</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span className="font-medium">Critical Issues</span>
                </div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-red-600">+3 from last month</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
