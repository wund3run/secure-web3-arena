
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  ComposedChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Activity,
  DollarSign,
  Users,
  Shield,
  Clock
} from 'lucide-react';

interface KPIData {
  id: string;
  name: string;
  value: number;
  target: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  category: string;
  unit: string;
  format: 'number' | 'percentage' | 'currency' | 'time';
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1'];

export const EnhancedKPIVisualizations = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const kpiData: KPIData[] = [
    {
      id: '1',
      name: 'Active Audits',
      value: 42,
      target: 50,
      change: 12.5,
      trend: 'up',
      category: 'operations',
      unit: '',
      format: 'number'
    },
    {
      id: '2',
      name: 'Average Completion Time',
      value: 8.5,
      target: 7,
      change: -5.2,
      trend: 'down',
      category: 'performance',
      unit: 'days',
      format: 'time'
    },
    {
      id: '3',
      name: 'Revenue Growth',
      value: 18.7,
      target: 20,
      change: 3.4,
      trend: 'up',
      category: 'financial',
      unit: '%',
      format: 'percentage'
    },
    {
      id: '4',
      name: 'User Satisfaction',
      value: 94.2,
      target: 95,
      change: 1.8,
      trend: 'up',
      category: 'quality',
      unit: '%',
      format: 'percentage'
    },
    {
      id: '5',
      name: 'Security Score',
      value: 97.8,
      target: 98,
      change: 0.5,
      trend: 'up',
      category: 'security',
      unit: '%',
      format: 'percentage'
    },
    {
      id: '6',
      name: 'Monthly Revenue',
      value: 145000,
      target: 150000,
      change: 8.3,
      trend: 'up',
      category: 'financial',
      unit: '$',
      format: 'currency'
    }
  ];

  const trendData = [
    { month: 'Jan', audits: 32, revenue: 120000, satisfaction: 92 },
    { month: 'Feb', revenue: 125000, audits: 38, satisfaction: 93 },
    { month: 'Mar', revenue: 132000, audits: 35, satisfaction: 94 },
    { month: 'Apr', revenue: 140000, audits: 42, satisfaction: 94.2 },
    { month: 'May', revenue: 145000, audits: 39, satisfaction: 95 },
  ];

  const categoryData = [
    { name: 'Smart Contracts', value: 45, color: '#8884d8' },
    { name: 'DeFi Protocols', value: 30, color: '#82ca9d' },
    { name: 'NFT Projects', value: 15, color: '#ffc658' },
    { name: 'Infrastructure', value: 10, color: '#ff7c7c' },
  ];

  const formatValue = (value: number, format: string, unit: string) => {
    switch (format) {
      case 'currency':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
      case 'percentage':
        return `${value.toFixed(1)}${unit}`;
      case 'time':
        return `${value} ${unit}`;
      default:
        return `${value.toLocaleString()}${unit}`;
    }
  };

  const getKPIIcon = (category: string) => {
    switch (category) {
      case 'operations': return <Activity className="h-5 w-5" />;
      case 'performance': return <Clock className="h-5 w-5" />;
      case 'financial': return <DollarSign className="h-5 w-5" />;
      case 'quality': return <Users className="h-5 w-5" />;
      case 'security': return <Shield className="h-5 w-5" />;
      default: return <Target className="h-5 w-5" />;
    }
  };

  const getTrendIcon = (trend: string, change: number) => {
    if (trend === 'up') return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (trend === 'down') return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Activity className="h-4 w-4 text-gray-500" />;
  };

  const getProgressColor = (value: number, target: number) => {
    const percentage = (value / target) * 100;
    if (percentage >= 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const filteredKPIs = selectedCategory === 'all' 
    ? kpiData 
    : kpiData.filter(kpi => kpi.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold">Enhanced KPI Dashboard</h2>
        <div className="flex items-center gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="operations">Operations</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="financial">Financial</SelectItem>
              <SelectItem value="quality">Quality</SelectItem>
              <SelectItem value="security">Security</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 Days</SelectItem>
              <SelectItem value="30d">30 Days</SelectItem>
              <SelectItem value="90d">90 Days</SelectItem>
              <SelectItem value="1y">1 Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredKPIs.map(kpi => (
          <Card key={kpi.id} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.name}</CardTitle>
              {getKPIIcon(kpi.category)}
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-2xl font-bold">
                  {formatValue(kpi.value, kpi.format, kpi.unit)}
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1">
                    {getTrendIcon(kpi.trend, kpi.change)}
                    <span className={kpi.change >= 0 ? 'text-green-600' : 'text-red-600'}>
                      {kpi.change >= 0 ? '+' : ''}{kpi.change.toFixed(1)}%
                    </span>
                  </div>
                  <span className="text-muted-foreground">
                    Target: {formatValue(kpi.target, kpi.format, kpi.unit)}
                  </span>
                </div>
                
                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress to Target</span>
                    <span>{((kpi.value / kpi.target) * 100).toFixed(0)}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-300 ${getProgressColor(kpi.value, kpi.target)}`}
                      style={{ width: `${Math.min((kpi.value / kpi.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                
                <Badge variant="outline" className="text-xs">
                  {kpi.category}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Enhanced Visualizations */}
      <Tabs defaultValue="trends" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
          <TabsTrigger value="comparison">KPI Comparison</TabsTrigger>
          <TabsTrigger value="distribution">Distribution</TabsTrigger>
          <TabsTrigger value="performance">Performance Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>KPI Trends Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ComposedChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" fill="#8884d8" fillOpacity={0.3} />
                  <Bar dataKey="audits" fill="#82ca9d" />
                  <Line type="monotone" dataKey="satisfaction" stroke="#ff7c7c" strokeWidth={3} />
                </ComposedChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="comparison" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>KPI vs Target Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={filteredKPIs.map(kpi => ({
                  name: kpi.name,
                  current: kpi.value,
                  target: kpi.target,
                  achievement: (kpi.value / kpi.target) * 100
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="current" fill="#8884d8" name="Current" />
                  <Bar dataKey="target" fill="#82ca9d" name="Target" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audit Category Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Achievement Matrix</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" data={
                  filteredKPIs.map(kpi => ({
                    name: kpi.name,
                    achievement: (kpi.value / kpi.target) * 100,
                    fill: (kpi.value / kpi.target) >= 1 ? '#82ca9d' : '#ff7c7c'
                  }))
                }>
                  <RadialBar dataKey="achievement" cornerRadius={10} fill="#8884d8" />
                  <Tooltip />
                </RadialBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
