
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity,
  Eye,
  MousePointer,
  Clock,
  Target,
  CheckCircle,
  Settings
} from 'lucide-react';

interface AnalyticsProvider {
  id: string;
  name: string;
  description: string;
  category: 'web' | 'business' | 'performance' | 'user';
  enabled: boolean;
  configured: boolean;
  features: string[];
  dataPoints: string[];
}

interface AnalyticsMetric {
  id: string;
  name: string;
  value: number;
  change: number;
  period: string;
  icon: React.ComponentType<any>;
  color: string;
}

export const AdvancedAnalyticsIntegration = () => {
  const [providers, setProviders] = useState<AnalyticsProvider[]>([]);
  const [metrics, setMetrics] = useState<AnalyticsMetric[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('web');
  const [isConfiguring, setIsConfiguring] = useState(false);

  const analyticsProviders: AnalyticsProvider[] = [
    {
      id: 'google-analytics',
      name: 'Google Analytics 4',
      description: 'Comprehensive web analytics and user behavior tracking',
      category: 'web',
      enabled: false,
      configured: false,
      features: ['Page views', 'User sessions', 'Conversion tracking', 'Custom events', 'Audience insights'],
      dataPoints: ['Users', 'Sessions', 'Bounce rate', 'Page views', 'Conversion rate']
    },
    {
      id: 'mixpanel',
      name: 'Mixpanel',
      description: 'Event-based analytics for product and user engagement',
      category: 'user',
      enabled: false,
      configured: false,
      features: ['Event tracking', 'Funnel analysis', 'Cohort analysis', 'A/B testing', 'Retention analysis'],
      dataPoints: ['Events', 'Active users', 'Retention rate', 'Feature adoption', 'User flows']
    },
    {
      id: 'amplitude',
      name: 'Amplitude',
      description: 'Product analytics for understanding user behavior',
      category: 'user',
      enabled: false,
      configured: false,
      features: ['User journey mapping', 'Behavioral cohorts', 'Predictive analytics', 'Revenue analytics'],
      dataPoints: ['User actions', 'Session length', 'Feature usage', 'User lifetime value']
    },
    {
      id: 'hotjar',
      name: 'Hotjar',
      description: 'Heatmaps and user session recordings',
      category: 'user',
      enabled: false,
      configured: false,
      features: ['Heatmaps', 'Session recordings', 'Surveys', 'Feedback widgets', 'Form analysis'],
      dataPoints: ['Click patterns', 'Scroll behavior', 'Form completion', 'User feedback']
    },
    {
      id: 'segment',
      name: 'Segment',
      description: 'Customer data platform for unified analytics',
      category: 'business',
      enabled: false,
      configured: false,
      features: ['Data collection', 'Customer profiles', 'Real-time streaming', 'Data governance'],
      dataPoints: ['Unified customer view', 'Data quality score', 'Integration health']
    },
    {
      id: 'new-relic',
      name: 'New Relic',
      description: 'Application performance monitoring and analytics',
      category: 'performance',
      enabled: false,
      configured: false,
      features: ['APM', 'Infrastructure monitoring', 'Browser monitoring', 'Alerts', 'Dashboards'],
      dataPoints: ['Response time', 'Throughput', 'Error rate', 'Apdex score', 'CPU usage']
    },
    {
      id: 'datadog',
      name: 'Datadog',
      description: 'Full-stack observability and analytics platform',
      category: 'performance',
      enabled: false,
      configured: false,
      features: ['Infrastructure monitoring', 'APM', 'Log management', 'Security monitoring'],
      dataPoints: ['System metrics', 'Application traces', 'Log events', 'Security events']
    }
  ];

  const sampleMetrics: AnalyticsMetric[] = [
    {
      id: 'daily-active-users',
      name: 'Daily Active Users',
      value: 1247,
      change: 12.5,
      period: 'vs yesterday',
      icon: Users,
      color: '#8884d8'
    },
    {
      id: 'conversion-rate',
      name: 'Conversion Rate',
      value: 3.24,
      change: -2.1,
      period: 'vs last week',
      icon: Target,
      color: '#82ca9d'
    },
    {
      id: 'revenue',
      name: 'Revenue',
      value: 15847,
      change: 8.7,
      period: 'vs last month',
      icon: DollarSign,
      color: '#ffc658'
    },
    {
      id: 'page-load-time',
      name: 'Avg Page Load Time',
      value: 1.8,
      change: -15.3,
      period: 'vs last week',
      icon: Clock,
      color: '#ff7c7c'
    }
  ];

  const userFlowData = [
    { step: 'Landing', users: 1000, conversion: 100 },
    { step: 'Sign Up', users: 450, conversion: 45 },
    { step: 'Onboarding', users: 380, conversion: 84.4 },
    { step: 'First Action', users: 290, conversion: 76.3 },
    { step: 'Active User', users: 220, conversion: 75.9 }
  ];

  const engagementData = [
    { name: 'Direct', value: 35, color: '#8884d8' },
    { name: 'Search', value: 28, color: '#82ca9d' },
    { name: 'Social', value: 20, color: '#ffc658' },
    { name: 'Email', value: 12, color: '#ff7c7c' },
    { name: 'Referral', value: 5, color: '#8dd1e1' }
  ];

  useEffect(() => {
    setProviders(analyticsProviders);
    setMetrics(sampleMetrics);
  }, []);

  const toggleProvider = async (providerId: string) => {
    setIsConfiguring(true);
    
    // Simulate configuration process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setProviders(prev => prev.map(provider => 
      provider.id === providerId 
        ? { ...provider, enabled: !provider.enabled, configured: !provider.enabled }
        : provider
    ));
    
    setIsConfiguring(false);
  };

  const configureAllProviders = async () => {
    setIsConfiguring(true);
    
    for (const provider of providers) {
      if (!provider.enabled) {
        await toggleProvider(provider.id);
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    setIsConfiguring(false);
  };

  const getCategoryProviders = (category: string) => {
    return providers.filter(provider => provider.category === category);
  };

  const getEnabledProviders = () => {
    return providers.filter(provider => provider.enabled);
  };

  const categories = [
    { id: 'web', name: 'Web Analytics', icon: TrendingUp },
    { id: 'user', name: 'User Analytics', icon: Users },
    { id: 'business', name: 'Business Intelligence', icon: DollarSign },
    { id: 'performance', name: 'Performance', icon: Activity }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold">Advanced Analytics Integration</h3>
          <p className="text-muted-foreground">Connect with leading analytics platforms for comprehensive insights</p>
        </div>
        <Button onClick={configureAllProviders} disabled={isConfiguring}>
          {isConfiguring ? 'Configuring...' : 'Enable All Analytics'}
        </Button>
      </div>

      {/* Analytics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <Card key={metric.id}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <Icon className="h-6 w-6 text-muted-foreground" style={{ color: metric.color }} />
                  <Badge variant={metric.change > 0 ? 'default' : 'destructive'} className="text-xs">
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </Badge>
                </div>
                <div className="mt-2">
                  <div className="text-2xl font-bold">
                    {typeof metric.value === 'number' && metric.id === 'revenue' ? '$' : ''}
                    {metric.value.toLocaleString()}
                    {metric.id === 'page-load-time' ? 's' : ''}
                    {metric.id === 'conversion-rate' ? '%' : ''}
                  </div>
                  <p className="text-xs text-muted-foreground">{metric.name}</p>
                  <p className="text-xs text-muted-foreground">{metric.period}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Dashboards */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>User Conversion Funnel</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={userFlowData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="step" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="users" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Traffic Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Provider Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Analytics Provider Configuration
            <Badge variant="outline">
              {getEnabledProviders().length}/{providers.length} Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-4 w-full">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {category.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="space-y-4">
                <div className="grid gap-4">
                  {getCategoryProviders(category.id).map((provider) => (
                    <Card key={provider.id} className={`${provider.enabled ? 'border-green-500' : 'border-gray-200'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-2 flex-1">
                            <div className="flex items-center gap-3">
                              <h4 className="font-semibold">{provider.name}</h4>
                              {provider.enabled && (
                                <Badge variant="default" className="bg-green-500">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Active
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{provider.description}</p>
                            
                            <div className="space-y-2">
                              <div>
                                <strong className="text-sm">Features:</strong>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {provider.features.map(feature => (
                                    <Badge key={feature} variant="outline" className="text-xs">
                                      {feature}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              
                              <div>
                                <strong className="text-sm">Data Points:</strong>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  {provider.dataPoints.map(dataPoint => (
                                    <Badge key={dataPoint} variant="secondary" className="text-xs">
                                      {dataPoint}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Switch
                              checked={provider.enabled}
                              onCheckedChange={() => toggleProvider(provider.id)}
                              disabled={isConfiguring}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>

          {getEnabledProviders().length > 0 && (
            <Alert className="mt-4">
              <TrendingUp className="h-4 w-4" />
              <AlertDescription>
                <strong>{getEnabledProviders().length} analytics providers</strong> are now collecting data. 
                You can view unified analytics in your dashboard within 24 hours.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
