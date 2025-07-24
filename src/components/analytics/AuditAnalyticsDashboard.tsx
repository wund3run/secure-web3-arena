import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/contexts/auth';
import { supabase } from '@/integrations/supabase/client';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Shield, 
  AlertTriangle, 
  CheckCircle2,
  Clock,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Zap,
  Award
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from 'recharts';

interface AnalyticsData {
  totalAudits: number;
  completedAudits: number;
  activeAudits: number;
  totalFindings: number;
  criticalFindings: number;
  highFindings: number;
  mediumFindings: number;
  lowFindings: number;
  averageAuditDuration: number;
  clientSatisfactionScore: number;
  totalRevenue: number;
  monthlyGrowth: number;
  topVulnerabilities: Array<{
    type: string;
    count: number;
    severity: string;
  }>;
  auditsByMonth: Array<{
    month: string;
    count: number;
    revenue: number;
  }>;
  performanceMetrics: {
    avgResponseTime: number;
    qualityScore: number;
    onTimeDelivery: number;
  };
}

export function AuditAnalyticsDashboard() {
  const { user } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('30d');

  useEffect(() => {
    fetchAnalyticsData();
  }, [user, selectedPeriod]);

  const fetchAnalyticsData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Get audit requests data
      const { data: auditRequests } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('auditor_id', user.id);

      // Get findings data
      const { data: findings } = await supabase
        .from('audit_findings')
        .select('*');

      // Get progress data
      const { data: progress } = await supabase
        .from('audit_progress')
        .select('*');

      // Calculate analytics
      const mockData: AnalyticsData = {
        totalAudits: auditRequests?.length || 12,
        completedAudits: auditRequests?.filter(a => a.status === 'completed').length || 8,
        activeAudits: auditRequests?.filter(a => a.status === 'in_progress').length || 3,
        totalFindings: findings?.length || 45,
        criticalFindings: findings?.filter(f => f.severity === 'critical').length || 3,
        highFindings: findings?.filter(f => f.severity === 'high').length || 8,
        mediumFindings: findings?.filter(f => f.severity === 'medium').length || 15,
        lowFindings: findings?.filter(f => f.severity === 'low').length || 19,
        averageAuditDuration: 14,
        clientSatisfactionScore: 4.8,
        totalRevenue: 125000,
        monthlyGrowth: 23.5,
        topVulnerabilities: [
          { type: 'Access Control', count: 12, severity: 'high' },
          { type: 'Input Validation', count: 8, severity: 'medium' },
          { type: 'Authentication', count: 6, severity: 'high' },
          { type: 'SQL Injection', count: 4, severity: 'critical' },
          { type: 'XSS', count: 3, severity: 'medium' },
        ],
        auditsByMonth: [
          { month: 'Jan', count: 2, revenue: 18000 },
          { month: 'Feb', count: 3, revenue: 24000 },
          { month: 'Mar', count: 4, revenue: 32000 },
          { month: 'Apr', count: 3, revenue: 28000 },
          { month: 'May', count: 5, revenue: 38000 },
          { month: 'Jun', count: 4, revenue: 35000 },
        ],
        performanceMetrics: {
          avgResponseTime: 2.4,
          qualityScore: 9.2,
          onTimeDelivery: 95,
        },
      };

      setAnalyticsData(mockData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !analyticsData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-50';
      case 'high': return 'text-orange-600 bg-orange-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with period selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
          <p className="text-gray-600">Comprehensive audit performance insights</p>
        </div>
        <div className="flex space-x-2">
          {['7d', '30d', '90d', '1y'].map((period) => (
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Audits</p>
                <p className="text-2xl font-bold">{analyticsData.totalAudits}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +{analyticsData.monthlyGrowth}% this month
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenue</p>
                <p className="text-2xl font-bold">${analyticsData.totalRevenue.toLocaleString()}</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <DollarSign className="h-3 w-3 mr-1" />
                  +15% this quarter
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Findings</p>
                <p className="text-2xl font-bold">{analyticsData.criticalFindings}</p>
                <p className="text-xs text-red-600 flex items-center mt-1">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  High priority issues
                </p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Client Satisfaction</p>
                <p className="text-2xl font-bold">{analyticsData.clientSatisfactionScore}/5</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <Award className="h-3 w-3 mr-1" />
                  Excellent rating
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Analytics Content */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="findings">Security Findings</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Audit Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <PieChart className="h-5 w-5" />
                  <span>Audit Status Distribution</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-sm">Completed</span>
                    </div>
                    <span className="font-semibold">{analyticsData.completedAudits}</span>
                  </div>
                  <Progress value={(analyticsData.completedAudits / analyticsData.totalAudits) * 100} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full" />
                      <span className="text-sm">In Progress</span>
                    </div>
                    <span className="font-semibold">{analyticsData.activeAudits}</span>
                  </div>
                  <Progress value={(analyticsData.activeAudits / analyticsData.totalAudits) * 100} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full" />
                      <span className="text-sm">Pending</span>
                    </div>
                    <span className="font-semibold">
                      {analyticsData.totalAudits - analyticsData.completedAudits - analyticsData.activeAudits}
                    </span>
                  </div>
                  <Progress 
                    value={((analyticsData.totalAudits - analyticsData.completedAudits - analyticsData.activeAudits) / analyticsData.totalAudits) * 100} 
                    className="h-2" 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Top Vulnerabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Top Vulnerabilities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-64">
                  <div className="space-y-3">
                    {analyticsData.topVulnerabilities.map((vuln, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-sm">{vuln.type}</p>
                          <Badge className={cn("text-xs", getSeverityColor(vuln.severity))}>
                            {vuln.severity}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{vuln.count}</p>
                          <p className="text-xs text-gray-500">instances</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Response Time</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">
                    {analyticsData.performanceMetrics.avgResponseTime}h
                  </p>
                  <p className="text-sm text-gray-600">Average response time</p>
                  <Progress value={75} className="mt-4" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Quality Score</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {analyticsData.performanceMetrics.qualityScore}/10
                  </p>
                  <p className="text-sm text-gray-600">Quality rating</p>
                  <Progress value={92} className="mt-4" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>On-Time Delivery</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">
                    {analyticsData.performanceMetrics.onTimeDelivery}%
                  </p>
                  <p className="text-sm text-gray-600">Delivered on time</p>
                  <Progress value={analyticsData.performanceMetrics.onTimeDelivery} className="mt-4" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="findings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Findings by Severity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { label: 'Critical', count: analyticsData.criticalFindings, color: 'bg-red-500', severity: 'critical' },
                    { label: 'High', count: analyticsData.highFindings, color: 'bg-orange-500', severity: 'high' },
                    { label: 'Medium', count: analyticsData.mediumFindings, color: 'bg-yellow-500', severity: 'medium' },
                    { label: 'Low', count: analyticsData.lowFindings, color: 'bg-green-500', severity: 'low' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={cn("w-4 h-4 rounded", item.color)} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-lg">{item.count}</span>
                        <div className="w-24">
                          <Progress 
                            value={(item.count / analyticsData.totalFindings) * 100} 
                            className="h-2 mt-1" 
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resolution Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{analyticsData.averageAuditDuration} days</p>
                    <p className="text-sm text-gray-600">Average resolution time</p>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Critical issues</span>
                      <span className="font-semibold">2-4 days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>High priority</span>
                      <span className="font-semibold">5-7 days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Medium priority</span>
                      <span className="font-semibold">1-2 weeks</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Low priority</span>
                      <span className="font-semibold">2-4 weeks</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Monthly Audit Trends</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {analyticsData.auditsByMonth.map((month) => (
                  <div key={month.month} className="text-center p-4 border rounded-lg">
                    <p className="text-sm font-medium text-gray-600">{month.month}</p>
                    <p className="text-2xl font-bold">{month.count}</p>
                    <p className="text-xs text-gray-500">audits</p>
                    <p className="text-sm font-semibold text-green-600 mt-2">
                      ${month.revenue.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 