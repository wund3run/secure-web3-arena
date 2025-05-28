
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNotifications } from '@/contexts/NotificationContext';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Bell, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

export const NotificationAnalytics = () => {
  const { notifications } = useNotifications();

  // Calculate analytics
  const categoryStats = notifications.reduce((acc, notification) => {
    acc[notification.category] = (acc[notification.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const typeStats = notifications.reduce((acc, notification) => {
    acc[notification.type] = (acc[notification.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryStats).map(([category, count]) => ({
    category: category.charAt(0).toUpperCase() + category.slice(1),
    count
  }));

  const pieData = Object.entries(typeStats).map(([type, count]) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: count
  }));

  const colors = {
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6'
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'error': return <XCircle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications by Category
          </CardTitle>
          <CardDescription>
            Distribution of notifications across different categories
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>
            Breakdown by notification type and severity
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(typeStats).map(([type, count]) => (
              <div key={type} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getIcon(type)}
                  <span className="capitalize">{type}</span>
                </div>
                <Badge variant="outline" style={{ color: colors[type as keyof typeof colors] }}>
                  {count}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Summary Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">{notifications.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">{typeStats.success || 0}</div>
              <div className="text-sm text-muted-foreground">Success</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">{typeStats.error || 0}</div>
              <div className="text-sm text-muted-foreground">Errors</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">{typeStats.warning || 0}</div>
              <div className="text-sm text-muted-foreground">Warnings</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
