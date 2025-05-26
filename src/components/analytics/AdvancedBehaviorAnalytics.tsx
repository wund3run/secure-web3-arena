
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { Eye, Clock, MousePointer, TrendingUp, Users, Zap, Brain, Target } from "lucide-react";

interface BehaviorMetric {
  name: string;
  value: number;
  change: number;
  trend: "up" | "down" | "stable";
}

interface UserJourneyStep {
  step: string;
  users: number;
  conversionRate: number;
  averageTime: number;
  dropoffReasons: string[];
}

interface HeatmapData {
  element: string;
  clicks: number;
  engagement: number;
  x: number;
  y: number;
}

export function AdvancedBehaviorAnalytics() {
  const [timeRange, setTimeRange] = useState("7d");
  const [activeMetric, setActiveMetric] = useState("engagement");

  // Mock data - in real implementation, this would come from analytics service
  const behaviorMetrics: BehaviorMetric[] = [
    { name: "User Engagement", value: 87, change: 12, trend: "up" },
    { name: "Session Duration", value: 245, change: -8, trend: "down" },
    { name: "Page Views/Session", value: 4.2, change: 15, trend: "up" },
    { name: "Bounce Rate", value: 23, change: -18, trend: "up" },
    { name: "Conversion Rate", value: 3.4, change: 22, trend: "up" },
    { name: "Feature Adoption", value: 68, change: 9, trend: "up" }
  ];

  const userJourneyData: UserJourneyStep[] = [
    {
      step: "Landing Page",
      users: 10000,
      conversionRate: 100,
      averageTime: 45,
      dropoffReasons: ["Load time", "Content relevance"]
    },
    {
      step: "Service Browse",
      users: 7500,
      conversionRate: 75,
      averageTime: 120,
      dropoffReasons: ["Overwhelming options", "Unclear pricing"]
    },
    {
      step: "Account Creation",
      users: 3750,
      conversionRate: 37.5,
      averageTime: 180,
      dropoffReasons: ["Complex form", "Email verification"]
    },
    {
      step: "First Purchase",
      users: 1875,
      conversionRate: 18.75,
      averageTime: 300,
      dropoffReasons: ["Payment issues", "Trust concerns"]
    },
    {
      step: "Return User",
      users: 1312,
      conversionRate: 13.12,
      averageTime: 200,
      dropoffReasons: ["Poor first experience", "Unmet expectations"]
    }
  ];

  const engagementTrendData = [
    { date: "Mon", engagement: 82, sessions: 1250, conversions: 45 },
    { date: "Tue", engagement: 85, sessions: 1380, conversions: 52 },
    { date: "Wed", engagement: 79, sessions: 1150, conversions: 38 },
    { date: "Thu", engagement: 91, sessions: 1520, conversions: 67 },
    { date: "Fri", engagement: 88, sessions: 1420, conversions: 58 },
    { date: "Sat", engagement: 76, sessions: 980, conversions: 34 },
    { date: "Sun", engagement: 83, sessions: 1100, conversions: 41 }
  ];

  const heatmapData: HeatmapData[] = [
    { element: "CTA Button", clicks: 1250, engagement: 85, x: 50, y: 30 },
    { element: "Navigation Menu", clicks: 890, engagement: 65, x: 20, y: 10 },
    { element: "Service Cards", clicks: 2340, engagement: 92, x: 60, y: 50 },
    { element: "Footer Links", clicks: 340, engagement: 25, x: 50, y: 90 },
    { element: "Search Bar", clicks: 780, engagement: 78, x: 80, y: 15 }
  ];

  const userSegmentData = [
    { name: "New Users", value: 35, color: "#8884d8" },
    { name: "Returning Users", value: 45, color: "#82ca9d" },
    { name: "Power Users", value: 20, color: "#ffc658" }
  ];

  const getTrendIcon = (trend: string) => {
    if (trend === "up") return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (trend === "down") return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
    return <div className="h-4 w-4 bg-gray-400 rounded-full" />;
  };

  const getTrendColor = (trend: string, change: number) => {
    if (trend === "up" && change > 0) return "text-green-600";
    if (trend === "down" || change < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Advanced Behavior Analytics
          </CardTitle>
          <CardDescription>
            AI-powered insights into user behavior patterns and optimization opportunities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="journey">User Journey</TabsTrigger>
              <TabsTrigger value="heatmap">Interaction Heatmap</TabsTrigger>
              <TabsTrigger value="segments">User Segments</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {behaviorMetrics.map((metric) => (
                  <Card key={metric.name}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">{metric.name}</span>
                        {getTrendIcon(metric.trend)}
                      </div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold">{metric.value}</span>
                        <span className={`text-sm ${getTrendColor(metric.trend, metric.change)}`}>
                          {metric.change > 0 ? "+" : ""}{metric.change}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Engagement Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Trends</CardTitle>
                  <CardDescription>Daily user engagement and conversion patterns</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={engagementTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="engagement" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                      <Area type="monotone" dataKey="conversions" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="journey" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Journey Analysis</CardTitle>
                  <CardDescription>Step-by-step conversion funnel with AI-identified optimization opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userJourneyData.map((step, index) => (
                      <div key={step.step} className="relative">
                        <div className="flex items-center gap-4 p-4 border rounded-lg">
                          <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-medium">
                            {index + 1}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-medium">{step.step}</h4>
                              <div className="flex items-center gap-4 text-sm">
                                <span>{step.users.toLocaleString()} users</span>
                                <Badge variant={step.conversionRate > 50 ? "default" : step.conversionRate > 25 ? "secondary" : "destructive"}>
                                  {step.conversionRate}% conversion
                                </Badge>
                              </div>
                            </div>
                            
                            <Progress value={step.conversionRate} className="h-2 mb-2" />
                            
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <div className="flex items-center gap-4">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {step.averageTime}s avg time
                                </span>
                              </div>
                              <div className="flex gap-2">
                                {step.dropoffReasons.map((reason) => (
                                  <Badge key={reason} variant="outline" className="text-xs">
                                    {reason}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {index < userJourneyData.length - 1 && (
                          <div className="flex justify-center py-2">
                            <div className="w-px h-4 bg-border"></div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="heatmap" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Interaction Heatmap</CardTitle>
                  <CardDescription>Visual representation of user engagement with different page elements</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Heatmap visualization placeholder */}
                      <div className="relative bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-lg border-2 border-dashed">
                        <div className="text-center text-muted-foreground mb-4">
                          <Eye className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm">Visual Heatmap Representation</p>
                          <p className="text-xs">(Interactive heatmap would be rendered here)</p>
                        </div>
                        
                        {heatmapData.map((item) => (
                          <div
                            key={item.element}
                            className="absolute bg-red-500 rounded-full opacity-60"
                            style={{
                              left: `${item.x}%`,
                              top: `${item.y}%`,
                              width: `${Math.max(item.clicks / 100, 10)}px`,
                              height: `${Math.max(item.clicks / 100, 10)}px`,
                              transform: 'translate(-50%, -50%)'
                            }}
                            title={`${item.element}: ${item.clicks} clicks`}
                          />
                        ))}
                      </div>
                      
                      {/* Interaction data */}
                      <div className="space-y-3">
                        <h4 className="font-medium">Element Interaction Data</h4>
                        {heatmapData.map((item) => (
                          <div key={item.element} className="flex items-center justify-between p-3 border rounded">
                            <div>
                              <span className="font-medium">{item.element}</span>
                              <div className="text-xs text-muted-foreground">
                                {item.clicks} clicks • {item.engagement}% engagement
                              </div>
                            </div>
                            <Progress value={item.engagement} className="w-20 h-2" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="segments" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Segments</CardTitle>
                    <CardDescription>AI-identified user behavior patterns</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={userSegmentData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {userSegmentData.map((entry, index) => (
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
                    <CardTitle>Segment Insights</CardTitle>
                    <CardDescription>AI-generated insights for each user segment</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="p-3 border rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="font-medium">New Users</span>
                          <Badge variant="outline">35%</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          High interest in learning resources, need more onboarding guidance
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="font-medium">Returning Users</span>
                          <Badge variant="outline">45%</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Active in marketplace, responsive to personalized recommendations
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="font-medium">Power Users</span>
                          <Badge variant="outline">20%</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          High engagement, contribute significantly to platform growth
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
