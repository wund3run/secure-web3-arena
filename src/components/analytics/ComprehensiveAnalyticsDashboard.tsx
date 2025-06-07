
import React from 'react';
import { ConversionFunnel } from './ConversionFunnel';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, DollarSign, Activity, Eye, Clock } from 'lucide-react';

export function ComprehensiveAnalyticsDashboard() {
  const overviewMetrics = [
    { name: 'Total Users', value: 15847, change: +12, icon: Users, color: 'text-blue-600' },
    { name: 'Revenue', value: 284750, change: +23, icon: DollarSign, color: 'text-green-600', prefix: '$' },
    { name: 'Active Sessions', value: 1247, change: +8, icon: Activity, color: 'text-purple-600' },
    { name: 'Page Views', value: 42583, change: +15, icon: Eye, color: 'text-orange-600' }
  ];

  const realtimeData = [
    { time: '10:00', users: 245, sessions: 189 },
    { time: '11:00', users: 267, sessions: 198 },
    { time: '12:00', users: 289, sessions: 234 },
    { time: '13:00', users: 312, sessions: 267 },
    { time: '14:00', users: 298, sessions: 245 },
    { time: '15:00', users: 334, sessions: 289 }
  ];

  const formatValue = (value: number, prefix?: string) => {
    if (prefix === '$') {
      return `$${(value / 1000).toFixed(0)}k`;
    }
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  return (
    <div className="space-y-6">
      {/* Overview Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {overviewMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`h-5 w-5 ${metric.color}`} />
                <Badge variant={metric.change > 0 ? 'default' : 'destructive'} className="text-xs">
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold">
                  {formatValue(metric.value, metric.prefix)}
                </div>
                <div className="text-sm text-muted-foreground">{metric.name}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Real-time Activity
          </CardTitle>
          <CardDescription>Live user activity and session data</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={realtimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" stroke="#3B82F6" strokeWidth={2} />
              <Line type="monotone" dataKey="sessions" stroke="#10B981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Conversion Funnel */}
      <ConversionFunnel />

      {/* Platform Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="text-center">
            <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
            <CardTitle>Response Time</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-blue-600">1.2s</div>
            <div className="text-sm text-muted-foreground">Average API Response</div>
            <Badge className="mt-2 bg-green-100 text-green-800">Excellent</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <TrendingUp className="h-8 w-8 mx-auto mb-2 text-green-500" />
            <CardTitle>Uptime</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-green-600">99.9%</div>
            <div className="text-sm text-muted-foreground">Last 30 Days</div>
            <Badge className="mt-2 bg-green-100 text-green-800">Stable</Badge>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-purple-500" />
            <CardTitle>Active Users</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-purple-600">1,247</div>
            <div className="text-sm text-muted-foreground">Currently Online</div>
            <Badge className="mt-2 bg-blue-100 text-blue-800">+12% vs yesterday</Badge>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
