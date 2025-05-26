import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertTriangle, TrendingUp, Target, Zap, Users, Clock, DollarSign } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

interface OptimizationOpportunity {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  effort: "low" | "medium" | "high";
  category: "conversion" | "performance" | "engagement" | "retention";
  predictedImprovement: number;
  implementationTime: string;
  confidence: number;
  currentValue: number;
  projectedValue: number;
  aiInsight: string;
}

interface PredictiveModel {
  metric: string;
  currentTrend: number[];
  predictedTrend: number[];
  accuracy: number;
  factors: string[];
}

export function PredictiveOptimization() {
  const [optimizations, setOptimizations] = useState<OptimizationOpportunity[]>([]);
  const [predictiveModels, setPredictiveModels] = useState<PredictiveModel[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);

  useEffect(() => {
    // Simulate AI analysis
    const performPredictiveAnalysis = async () => {
      setIsAnalyzing(true);
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      setOptimizations([
        {
          id: "checkout-optimization",
          title: "Streamline Audit Request Flow",
          description: "Reduce form fields by 40% to increase completion rate",
          impact: "high",
          effort: "medium",
          category: "conversion",
          predictedImprovement: 34,
          implementationTime: "2 weeks",
          confidence: 89,
          currentValue: 23,
          projectedValue: 31,
          aiInsight: "Analysis of 10,000+ user sessions shows form abandonment at step 3 due to information overload"
        },
        {
          id: "load-time-optimization",
          title: "Optimize Critical Render Path",
          description: "Implement lazy loading to reduce initial load time by 45%",
          impact: "high",
          effort: "low",
          category: "performance",
          predictedImprovement: 45,
          implementationTime: "1 week",
          confidence: 92,
          currentValue: 3.2,
          projectedValue: 1.8,
          aiInsight: "Page load time directly correlates with 15% conversion rate decrease per additional second"
        },
        {
          id: "personalization-engine",
          title: "Dynamic Content Personalization",
          description: "AI-powered content adaptation based on user behavior",
          impact: "high",
          effort: "high",
          category: "engagement",
          predictedImprovement: 28,
          implementationTime: "6 weeks",
          confidence: 85,
          currentValue: 4.2,
          projectedValue: 5.4,
          aiInsight: "Personalized content shows 28% higher engagement in similar platforms"
        },
        {
          id: "notification-optimization",
          title: "Smart Notification Timing",
          description: "AI-optimized notification delivery based on user activity patterns",
          impact: "medium",
          effort: "low",
          category: "retention",
          predictedImprovement: 22,
          implementationTime: "3 days",
          confidence: 78,
          currentValue: 45,
          projectedValue: 55,
          aiInsight: "User activity patterns show optimal notification windows vary by 3-hour intervals"
        }
      ]);

      setPredictiveModels([
        {
          metric: "User Conversion Rate",
          currentTrend: [23, 25, 24, 26, 28, 27, 29],
          predictedTrend: [31, 33, 35, 37, 39, 41, 43],
          accuracy: 87,
          factors: ["Page load time", "Form complexity", "Trust signals", "User onboarding"]
        },
        {
          metric: "User Retention",
          currentTrend: [78, 76, 79, 81, 83, 85, 84],
          predictedTrend: [87, 89, 91, 93, 95, 97, 98],
          accuracy: 82,
          factors: ["Feature adoption", "Support interactions", "Satisfaction scores", "Engagement frequency"]
        }
      ]);

      setIsAnalyzing(false);
    };

    performPredictiveAnalysis();
  }, []);

  const getImpactColor = (impact: string): "default" | "destructive" | "secondary" | "outline" | "success" | "warning" => {
    switch (impact) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "outline";
    }
  };

  const getEffortColor = (effort: string): "default" | "destructive" | "secondary" | "outline" | "success" | "warning" => {
    switch (effort) {
      case "low":
        return "default";
      case "medium":
        return "secondary";
      case "high":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      conversion: Target,
      performance: Zap,
      engagement: Users,
      retention: Clock
    };
    const Icon = icons[category as keyof typeof icons] || TrendingUp;
    return <Icon className="h-4 w-4" />;
  };

  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 animate-pulse" />
            Predictive Optimization Engine
          </CardTitle>
          <CardDescription>
            AI is analyzing patterns and generating optimization predictions...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-sm">Running predictive models...</span>
            </div>
            <Progress value={85} className="h-2" />
            <div className="text-xs text-muted-foreground">
              Analyzing conversion patterns, user behavior, and performance metrics
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Predictive Optimization Engine
          </CardTitle>
          <CardDescription>
            AI-powered predictions and optimization opportunities based on data analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="opportunities" className="space-y-6">
            <TabsList className="grid grid-cols-2">
              <TabsTrigger value="opportunities">Optimization Opportunities</TabsTrigger>
              <TabsTrigger value="predictions">Predictive Models</TabsTrigger>
            </TabsList>

            <TabsContent value="opportunities" className="space-y-4">
              {optimizations.map((optimization) => (
                <Card key={optimization.id} className="border-l-4 border-l-primary">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          {getCategoryIcon(optimization.category)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold">{optimization.title}</h4>
                            <Badge variant={getImpactColor(optimization.impact)}>
                              {optimization.impact} impact
                            </Badge>
                            <Badge variant={getEffortColor(optimization.effort)}>
                              {optimization.effort} effort
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {optimization.description}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="text-center p-3 bg-muted/50 rounded">
                              <div className="text-2xl font-bold text-green-600">
                                +{optimization.predictedImprovement}%
                              </div>
                              <div className="text-xs text-muted-foreground">Predicted Improvement</div>
                            </div>
                            <div className="text-center p-3 bg-muted/50 rounded">
                              <div className="text-lg font-semibold">
                                {optimization.currentValue} → {optimization.projectedValue}
                              </div>
                              <div className="text-xs text-muted-foreground">Current → Projected</div>
                            </div>
                            <div className="text-center p-3 bg-muted/50 rounded">
                              <div className="text-lg font-semibold">{optimization.confidence}%</div>
                              <div className="text-xs text-muted-foreground">AI Confidence</div>
                            </div>
                          </div>
                          
                          <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg mb-4">
                            <div className="flex items-start gap-2">
                              <AlertTriangle className="h-4 w-4 text-blue-600 mt-0.5" />
                              <div>
                                <span className="text-sm font-medium text-blue-800 dark:text-blue-200">AI Insight:</span>
                                <p className="text-sm text-blue-700 dark:text-blue-300">{optimization.aiInsight}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <span>Implementation time: {optimization.implementationTime}</span>
                            <div className="flex items-center gap-1">
                              <span>Confidence:</span>
                              <Progress value={optimization.confidence} className="w-16 h-2" />
                              <span>{optimization.confidence}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <Button size="sm">
                          Implement
                        </Button>
                        <Button variant="outline" size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="predictions" className="space-y-6">
              {predictiveModels.map((model, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{model.metric} Prediction</span>
                      <Badge variant="secondary">{model.accuracy}% accuracy</Badge>
                    </CardTitle>
                    <CardDescription>
                      Predictive model showing current trends vs. optimized projections
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={model.currentTrend.map((value, idx) => ({
                          day: idx + 1,
                          current: value,
                          predicted: model.predictedTrend[idx]
                        }))}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="current" 
                            stroke="#8884d8" 
                            strokeDasharray="0"
                            name="Current Trend"
                          />
                          <Line 
                            type="monotone" 
                            dataKey="predicted" 
                            stroke="#82ca9d" 
                            strokeDasharray="5 5"
                            name="Predicted with Optimizations"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                      
                      <div>
                        <h5 className="font-medium mb-2">Key Influencing Factors:</h5>
                        <div className="flex flex-wrap gap-2">
                          {model.factors.map((factor) => (
                            <Badge key={factor} variant="outline">
                              {factor}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
