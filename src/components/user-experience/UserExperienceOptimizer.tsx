
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Eye, 
  Mouse, 
  Clock, 
  Star, 
  TrendingUp,
  RefreshCw,
  Heart,
  Target
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface UXMetrics {
  userEngagement: number;
  taskCompletion: number;
  userSatisfaction: number;
  pageViews: number;
  sessionDuration: number;
  bounceRate: number;
}

export function UserExperienceOptimizer() {
  const [metrics, setMetrics] = useState<UXMetrics>({
    userEngagement: 78,
    taskCompletion: 85,
    userSatisfaction: 4.2,
    pageViews: 1247,
    sessionDuration: 5.7,
    bounceRate: 32
  });

  const [userJourneyData, setUserJourneyData] = useState([
    { step: 'Landing', users: 1000, completion: 95 },
    { step: 'Browse', users: 950, completion: 80 },
    { step: 'Request', users: 760, completion: 70 },
    { step: 'Payment', users: 532, completion: 85 },
    { step: 'Complete', users: 452, completion: 100 }
  ]);

  const [satisfactionData, setSatisfactionData] = useState([
    { name: 'Very Satisfied', value: 45, color: '#22c55e' },
    { name: 'Satisfied', value: 35, color: '#84cc16' },
    { name: 'Neutral', value: 15, color: '#eab308' },
    { name: 'Dissatisfied', value: 5, color: '#f97316' }
  ]);

  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshMetrics = async () => {
    setIsRefreshing(true);
    
    setTimeout(() => {
      setMetrics({
        userEngagement: 75 + Math.random() * 20,
        taskCompletion: 80 + Math.random() * 15,
        userSatisfaction: 4.0 + Math.random() * 0.8,
        pageViews: 1200 + Math.random() * 100,
        sessionDuration: 5.0 + Math.random() * 2,
        bounceRate: 25 + Math.random() * 15
      });
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    const interval = setInterval(refreshMetrics, 45000);
    return () => clearInterval(interval);
  }, []);

  const getUXScore = () => {
    const score = (
      (metrics.userEngagement / 100) * 25 +
      (metrics.taskCompletion / 100) * 25 +
      (metrics.userSatisfaction / 5) * 25 +
      (Math.max(0, 100 - metrics.bounceRate) / 100) * 25
    );
    return Math.round(score);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Experience Optimizer</h2>
          <p className="text-muted-foreground">
            Analyze and optimize user experience across the platform
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-blue-100 text-blue-800">
            UX Score: {getUXScore()}
          </Badge>
          <Button onClick={refreshMetrics} disabled={isRefreshing} variant="outline">
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="journey">User Journey</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  User Engagement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.userEngagement.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground mt-1">Monthly active users</div>
                <Progress value={metrics.userEngagement} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Task Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.taskCompletion.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground mt-1">Successfully completed tasks</div>
                <Progress value={metrics.taskCompletion} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  User Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.userSatisfaction.toFixed(1)}/5</div>
                <div className="text-xs text-muted-foreground mt-1">Average rating</div>
                <Progress value={(metrics.userSatisfaction / 5) * 100} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Page Views
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.pageViews.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground mt-1">This month</div>
                <div className="text-xs text-green-600 mt-1">+12% from last month</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Session Duration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.sessionDuration.toFixed(1)}m</div>
                <div className="text-xs text-muted-foreground mt-1">Average session length</div>
                <div className="text-xs text-green-600 mt-1">+8% from last month</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Mouse className="h-4 w-4" />
                  Bounce Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metrics.bounceRate.toFixed(1)}%</div>
                <div className="text-xs text-muted-foreground mt-1">Single page visits</div>
                <Progress value={100 - metrics.bounceRate} className="mt-2" />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="journey">
          <Card>
            <CardHeader>
              <CardTitle>User Journey Funnel</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={userJourneyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="step" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="users" fill="#8884d8" name="Users" />
                </BarChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-5 gap-4 mt-4">
                {userJourneyData.map((step, index) => (
                  <div key={step.step} className="text-center">
                    <div className="text-lg font-bold">{step.users}</div>
                    <div className="text-xs text-muted-foreground">{step.step}</div>
                    <div className="text-xs text-green-600">{step.completion}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satisfaction">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={satisfactionData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {satisfactionData.map((entry, index) => (
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
                <CardTitle>Satisfaction Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Overall Rating</span>
                    <span>{metrics.userSatisfaction.toFixed(1)}/5</span>
                  </div>
                  <Progress value={(metrics.userSatisfaction / 5) * 100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Recommendation Rate</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Return User Rate</span>
                    <span>73%</span>
                  </div>
                  <Progress value={73} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="recommendations">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  UX Improvements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm">Simplify Navigation</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Reduce menu complexity and improve information architecture
                  </div>
                  <Badge variant="destructive" className="mt-2">High Priority</Badge>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm">Enhance Mobile Experience</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Optimize touch targets and improve mobile responsiveness
                  </div>
                  <Badge variant="secondary" className="mt-2">Medium Priority</Badge>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm">Add Progress Indicators</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Show users their progress through multi-step processes
                  </div>
                  <Badge variant="outline" className="mt-2">Low Priority</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Conversion Optimization
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm">Optimize CTA Placement</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Move primary actions above the fold for better visibility
                  </div>
                  <Badge variant="destructive" className="mt-2">High Impact</Badge>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm">Reduce Form Fields</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Minimize required fields in registration and request forms
                  </div>
                  <Badge variant="secondary" className="mt-2">Medium Impact</Badge>
                </div>
                <div className="p-3 border rounded-lg">
                  <div className="font-medium text-sm">Add Social Proof</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    Display testimonials and reviews prominently
                  </div>
                  <Badge variant="outline" className="mt-2">Low Impact</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
