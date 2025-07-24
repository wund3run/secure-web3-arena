
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  TrendingUp, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  DollarSign,
  Shield,
  FileText,
  Activity,
  BarChart3
} from 'lucide-react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Bar, BarChart } from 'recharts';

interface DashboardMetrics {
  totalRequests: number;
  activeRequests: number;
  completedAudits: number;
  averageCompletionTime: number;
  totalEarnings: number;
  successRate: number;
  recentActivity: Array<{
    id: string;
    type: string;
    message: string;
    timestamp: Date;
    status: 'success' | 'warning' | 'error' | 'info';
  }>;
  chartData: Array<{
    name: string;
    audits: number;
    earnings: number;
    requests: number;
  }>;
}

export function EnhancedDashboard() {
  const { user, getUserType, userProfile } = useAuth();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  const userType = getUserType();

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      // Simulate API call - replace with actual service call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockMetrics: DashboardMetrics = {
        totalRequests: userType === 'auditor' ? 47 : 12,
        activeRequests: userType === 'auditor' ? 3 : 2,
        completedAudits: userType === 'auditor' ? 44 : 10,
        averageCompletionTime: 5.2,
        totalEarnings: userType === 'auditor' ? 127000 : 45200,
        successRate: 98.5,
        recentActivity: [
          {
            id: '1',
            type: 'audit_completed',
            message: 'DeFi Protocol audit completed successfully',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
            status: 'success'
          },
          {
            id: '2',
            type: 'new_request',
            message: 'New audit request received',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
            status: 'info'
          },
          {
            id: '3',
            type: 'payment_received',
            message: 'Payment of $3,500 received',
            timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
            status: 'success'
          }
        ],
        chartData: [
          { name: 'Jan', audits: 4, earnings: 12000, requests: 6 },
          { name: 'Feb', audits: 6, earnings: 18000, requests: 8 },
          { name: 'Mar', audits: 8, earnings: 24000, requests: 10 },
          { name: 'Apr', audits: 7, earnings: 21000, requests: 9 },
          { name: 'May', audits: 9, earnings: 27000, requests: 12 },
          { name: 'Jun', audits: 11, earnings: 33000, requests: 14 }
        ]
      };
      
      setMetrics(mockMetrics);
      setLoading(false);
    };

    if (user) {
      fetchMetrics();
    }
  }, [user, userType]);

  if (loading || !metrics) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  const getMetricsCards = () => {
    if (userType === 'auditor') {
      return [
        {
          title: 'Active Projects',
          value: metrics.activeRequests.toString(),
          icon: <FileText className="h-4 w-4" />,
          change: '+12%',
          changeType: 'positive' as const
        },
        {
          title: 'Completed Audits',
          value: metrics.completedAudits.toString(),
          icon: <CheckCircle className="h-4 w-4" />,
          change: '+8%',
          changeType: 'positive' as const
        },
        {
          title: 'Total Earnings',
          value: `$${(metrics.totalEarnings / 1000).toFixed(0)}K`,
          icon: <DollarSign className="h-4 w-4" />,
          change: '+15%',
          changeType: 'positive' as const
        },
        {
          title: 'Success Rate',
          value: `${metrics.successRate}%`,
          icon: <Shield className="h-4 w-4" />,
          change: '+0.5%',
          changeType: 'positive' as const
        }
      ];
    } else {
      return [
        {
          title: 'Active Audits',
          value: metrics.activeRequests.toString(),
          icon: <Activity className="h-4 w-4" />,
          change: '+25%',
          changeType: 'positive' as const
        },
        {
          title: 'Completed',
          value: metrics.completedAudits.toString(),
          icon: <CheckCircle className="h-4 w-4" />,
          change: '+10%',
          changeType: 'positive' as const
        },
        {
          title: 'Total Spent',
          value: `$${(metrics.totalEarnings / 1000).toFixed(0)}K`,
          icon: <DollarSign className="h-4 w-4" />,
          change: '+18%',
          changeType: 'positive' as const
        },
        {
          title: 'Security Score',
          value: '96%',
          icon: <Shield className="h-4 w-4" />,
          change: '+2%',
          changeType: 'positive' as const
        }
      ];
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            {userType === 'auditor' ? 'Auditor Dashboard' : 'Project Dashboard'}
          </h1>
          <p className="text-muted-foreground">
            Welcome back, {userProfile?.full_name || user?.email || 'User'}
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          Last updated: {new Date().toLocaleTimeString()}
        </Badge>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getMetricsCards().map((metric, index) => (
          <Card key={index} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <div className="text-muted-foreground">{metric.icon}</div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className={`text-xs ${
                metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs for different views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
                <CardDescription>
                  {userType === 'auditor' ? 'Audits completed' : 'Security improvements'} over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={metrics.chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey={userType === 'auditor' ? 'audits' : 'requests'} 
                      stroke="#8884d8" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates and notifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {metrics.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' :
                        activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                      }`} />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.message}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.timestamp.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Monthly earnings breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={metrics.chartData}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
                    <Bar dataKey="earnings" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>Key performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Completion Rate</span>
                    <span>{metrics.successRate}%</span>
                  </div>
                  <Progress value={metrics.successRate} className="mt-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Avg. Response Time</span>
                    <span>{metrics.averageCompletionTime} days</span>
                  </div>
                  <Progress value={85} className="mt-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm">
                    <span>Client Satisfaction</span>
                    <span>4.9/5</span>
                  </div>
                  <Progress value={98} className="mt-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity Timeline</CardTitle>
              <CardDescription>Detailed activity log</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {metrics.recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 pb-4 border-b last:border-b-0">
                    <div className={`w-3 h-3 rounded-full mt-1 ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'warning' ? 'bg-yellow-500' :
                      activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium">{activity.message}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.timestamp.toLocaleString()}
                          </p>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {activity.type.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.averageCompletionTime} days</div>
                <p className="text-sm text-green-600">-15% improvement</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Growth Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+24%</div>
                <p className="text-sm text-green-600">This quarter</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  Client Retention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94%</div>
                <p className="text-sm text-green-600">+3% from last quarter</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
