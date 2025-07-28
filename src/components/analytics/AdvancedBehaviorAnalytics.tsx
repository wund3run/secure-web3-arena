
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart3, Users, Clock, MousePointer, Eye, TrendingUp } from 'lucide-react';

interface AnalyticsData {
  userEngagement: {
    averageSessionDuration: number;
    bounceRate: number;
    pageViewsPerSession: number;
    conversionRate: number;
  };
  userBehavior: {
    topPages: Array<{ page: string; views: number; time: number }>;
    clickHeatmap: Array<{ element: string; clicks: number; conversion: number }>;
    userFlow: Array<{ step: string; users: number; dropoff: number }>;
  };
  predictiveInsights: {
    churnRisk: number;
    lifetimeValue: number;
    nextBestAction: string;
    engagementScore: number;
  };
}

export const AdvancedBehaviorAnalytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    const timer = setTimeout(() => {
      setAnalyticsData({
        userEngagement: {
          averageSessionDuration: 420, // seconds
          bounceRate: 0.23,
          pageViewsPerSession: 4.7,
          conversionRate: 0.12
        },
        userBehavior: {
          topPages: [
            { page: '/marketplace', views: 2847, time: 187 },
            { page: '/request-audit', views: 1923, time: 256 },
            { page: '/dashboard', views: 1654, time: 312 },
            { page: '/auditor-profile', views: 892, time: 145 }
          ],
          clickHeatmap: [
            { element: 'Request Audit Button', clicks: 1245, conversion: 0.34 },
            { element: 'Browse Auditors', clicks: 987, conversion: 0.18 },
            { element: 'Pricing Info', clicks: 743, conversion: 0.09 },
            { element: 'Contact Support', clicks: 234, conversion: 0.67 }
          ],
          userFlow: [
            { step: 'Landing Page', users: 10000, dropoff: 0.15 },
            { step: 'Sign Up', users: 8500, dropoff: 0.22 },
            { step: 'Profile Setup', users: 6630, dropoff: 0.31 },
            { step: 'First Action', users: 4575, dropoff: 0.18 },
            { step: 'Active User', users: 3751, dropoff: 0.05 }
          ]
        },
        predictiveInsights: {
          churnRisk: 0.24,
          lifetimeValue: 1247,
          nextBestAction: 'Encourage profile completion',
          engagementScore: 0.78
        }
      });
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 animate-pulse" />
            Loading Analytics...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-6 bg-muted rounded w-1/3 mb-2"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!analyticsData) return null;

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Advanced Behavior Analytics
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Real-time insights into user behavior and engagement patterns
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="engagement" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="behavior">Behavior</TabsTrigger>
          <TabsTrigger value="flow">User Flow</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
        </TabsList>

        <TabsContent value="engagement">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg Session</p>
                    <p className="text-2xl font-bold">
                      {formatDuration(analyticsData.userEngagement.averageSessionDuration)}
                    </p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Bounce Rate</p>
                    <p className="text-2xl font-bold">
                      {(analyticsData.userEngagement.bounceRate * 100).toFixed(1)}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pages/Session</p>
                    <p className="text-2xl font-bold">
                      {analyticsData.userEngagement.pageViewsPerSession.toFixed(1)}
                    </p>
                  </div>
                  <Eye className="h-8 w-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Conversion</p>
                    <p className="text-2xl font-bold">
                      {(analyticsData.userEngagement.conversionRate * 100).toFixed(1)}%
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Pages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.userBehavior.topPages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{page.page}</p>
                        <p className="text-sm text-muted-foreground">
                          {page.views.toLocaleString()} views
                        </p>
                      </div>
                      <Badge variant="outline">
                        {formatDuration(page.time)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Click Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analyticsData.userBehavior.clickHeatmap.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{item.element}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {item.clicks} clicks
                          </span>
                          <Badge variant={item.conversion > 0.3 ? 'default' : 'secondary'}>
                            {(item.conversion * 100).toFixed(0)}%
                          </Badge>
                        </div>
                      </div>
                      <Progress value={item.conversion * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="flow">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">User Journey Flow</CardTitle>
              <p className="text-sm text-muted-foreground">
                Track how users move through your platform
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.userBehavior.userFlow.map((step, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{step.step}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {step.users.toLocaleString()} users
                          </span>
                          {step.dropoff > 0 && (
                            <Badge variant="error">
                              -{(step.dropoff * 100).toFixed(0)}% dropoff
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Progress value={100 - (step.dropoff * 100)} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Predictive Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Churn Risk</span>
                    <span className="text-sm text-muted-foreground">
                      {(analyticsData.predictiveInsights.churnRisk * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress 
                    value={analyticsData.predictiveInsights.churnRisk * 100} 
                    className="h-2"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Engagement Score</span>
                    <span className="text-sm text-muted-foreground">
                      {(analyticsData.predictiveInsights.engagementScore * 100).toFixed(0)}%
                    </span>
                  </div>
                  <Progress 
                    value={analyticsData.predictiveInsights.engagementScore * 100} 
                    className="h-2"
                  />
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Predicted Lifetime Value</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${analyticsData.predictiveInsights.lifetimeValue.toLocaleString()}
                  </p>
                </div>

                <div className="pt-4 border-t">
                  <p className="text-sm font-medium mb-2">Next Best Action</p>
                  <Badge variant="outline">
                    {analyticsData.predictiveInsights.nextBestAction}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h4 className="font-medium text-blue-900 dark:text-blue-100">
                      Improve Onboarding
                    </h4>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      31% dropoff in profile setup suggests simplification needed
                    </p>
                  </div>

                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h4 className="font-medium text-green-900 dark:text-green-100">
                      Optimize Call-to-Action
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Request Audit button has high conversion - promote more
                    </p>
                  </div>

                  <div className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg">
                    <h4 className="font-medium text-orange-900 dark:text-orange-100">
                      Engagement Campaign
                    </h4>
                    <p className="text-sm text-orange-700 dark:text-orange-300">
                      Target users with 24% churn risk for re-engagement
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
