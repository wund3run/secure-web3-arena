
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  Eye, 
  MousePointer, 
  Clock, 
  TrendingUp,
  Target,
  Smartphone,
  Monitor,
  Tablet,
  Globe
} from 'lucide-react';

export function UserExperienceOptimizer() {
  const [uxMetrics] = useState({
    userSatisfaction: 87.3,
    taskCompletionRate: 94.2,
    averageSessionTime: 12.5,
    bounceRate: 23.8,
    conversionRate: 8.7,
    accessibilityScore: 91.2
  });

  const [deviceBreakdown] = useState([
    { device: 'Desktop', percentage: 68.2, users: 2847 },
    { device: 'Mobile', percentage: 24.1, users: 1006 },
    { device: 'Tablet', percentage: 7.7, users: 321 }
  ]);

  const [userFlows] = useState([
    { 
      flow: 'Audit Request', 
      completion: 89.4, 
      dropOff: 'Payment Info', 
      improvement: '+5.2%' 
    },
    { 
      flow: 'Auditor Signup', 
      completion: 76.8, 
      dropOff: 'Verification', 
      improvement: '+2.1%' 
    },
    { 
      flow: 'Profile Setup', 
      completion: 91.3, 
      dropOff: 'Skills Input', 
      improvement: '+7.8%' 
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">User Experience Optimizer</h2>
          <p className="text-muted-foreground">
            Comprehensive UX analytics and optimization insights
          </p>
        </div>
        <Badge variant="default" className="bg-green-100 text-green-800">
          <Target className="h-3 w-3 mr-1" />
          {uxMetrics.userSatisfaction}% Satisfaction
        </Badge>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="overview">UX Overview</TabsTrigger>
          <TabsTrigger value="flows">User Flows</TabsTrigger>
          <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
          <TabsTrigger value="optimization">Optimization</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  User Satisfaction
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uxMetrics.userSatisfaction}%</div>
                <div className="text-xs text-muted-foreground mt-1">+3.2% from last month</div>
                <Progress value={uxMetrics.userSatisfaction} className="mt-2" />
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
                <div className="text-2xl font-bold">{uxMetrics.taskCompletionRate}%</div>
                <div className="text-xs text-muted-foreground mt-1">+1.8% from last month</div>
                <Progress value={uxMetrics.taskCompletionRate} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Session Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uxMetrics.averageSessionTime}m</div>
                <div className="text-xs text-muted-foreground mt-1">+2.1m from last month</div>
                <Progress value={(uxMetrics.averageSessionTime / 20) * 100} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Bounce Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uxMetrics.bounceRate}%</div>
                <div className="text-xs text-muted-foreground mt-1">-4.3% from last month</div>
                <Progress value={100 - uxMetrics.bounceRate} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uxMetrics.conversionRate}%</div>
                <div className="text-xs text-muted-foreground mt-1">+0.9% from last month</div>
                <Progress value={uxMetrics.conversionRate * 10} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Accessibility Score
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{uxMetrics.accessibilityScore}%</div>
                <div className="text-xs text-muted-foreground mt-1">+2.7% from last month</div>
                <Progress value={uxMetrics.accessibilityScore} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deviceBreakdown.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {item.device === 'Desktop' && <Monitor className="h-4 w-4" />}
                        {item.device === 'Mobile' && <Smartphone className="h-4 w-4" />}
                        {item.device === 'Tablet' && <Tablet className="h-4 w-4" />}
                        <span className="font-medium">{item.device}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {item.users.toLocaleString()} users
                        </span>
                        <div className="flex items-center gap-2">
                          <Progress value={item.percentage} className="w-20 h-2" />
                          <span className="text-sm font-medium w-12">
                            {item.percentage}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="flows">
          <Card>
            <CardHeader>
              <CardTitle>User Flow Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {userFlows.map((flow, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{flow.flow}</h3>
                      <Badge variant="outline" className="text-green-700">
                        {flow.improvement}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completion Rate</span>
                        <span>{flow.completion}%</span>
                      </div>
                      <Progress value={flow.completion} className="h-2" />
                      <div className="text-xs text-muted-foreground">
                        Main drop-off point: {flow.dropOff}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility">
          <Card>
            <CardHeader>
              <CardTitle>Accessibility Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-green-800 mb-2">Strengths</h4>
                    <ul className="text-sm space-y-1">
                      <li>✅ Proper heading hierarchy</li>
                      <li>✅ Alt text for images</li>
                      <li>✅ Keyboard navigation</li>
                      <li>✅ Color contrast ratios</li>
                    </ul>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-2">Improvements</h4>
                    <ul className="text-sm space-y-1">
                      <li>⚠️ Form field labels</li>
                      <li>⚠️ Focus indicators</li>
                      <li>⚠️ Screen reader support</li>
                      <li>⚠️ Skip navigation links</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="optimization">
          <Card>
            <CardHeader>
              <CardTitle>Optimization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50">
                  <h4 className="font-medium text-blue-900 mb-2">High Priority</h4>
                  <p className="text-sm text-blue-800 mb-2">
                    Optimize mobile audit request form - 34% of users abandon on mobile devices
                  </p>
                  <Button size="sm" variant="outline">Implement Fix</Button>
                </div>
                
                <div className="p-4 border rounded-lg bg-green-50">
                  <h4 className="font-medium text-green-900 mb-2">Medium Priority</h4>
                  <p className="text-sm text-green-800 mb-2">
                    Add progress indicators to multi-step forms to reduce drop-off by ~15%
                  </p>
                  <Button size="sm" variant="outline">Implement Fix</Button>
                </div>
                
                <div className="p-4 border rounded-lg bg-yellow-50">
                  <h4 className="font-medium text-yellow-900 mb-2">Low Priority</h4>
                  <p className="text-sm text-yellow-800 mb-2">
                    Improve loading states for better perceived performance
                  </p>
                  <Button size="sm" variant="outline">Implement Fix</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
