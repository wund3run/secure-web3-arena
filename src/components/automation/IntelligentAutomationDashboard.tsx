
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bot, 
  Zap, 
  Brain, 
  Settings, 
  Play, 
  Pause, 
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Clock,
  Users,
  Target
} from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  successRate: number;
  executionCount: number;
  lastExecuted: Date;
  category: 'audit_assignment' | 'quality_check' | 'notification' | 'reporting';
  confidence: number;
}

export function IntelligentAutomationDashboard() {
  const [automationRules, setAutomationRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Smart Auditor Matching',
      description: 'Automatically match auditors to projects based on expertise and availability',
      isActive: true,
      successRate: 94.2,
      executionCount: 247,
      lastExecuted: new Date(Date.now() - 1000 * 60 * 15),
      category: 'audit_assignment',
      confidence: 0.94
    },
    {
      id: '2',
      name: 'Quality Score Automation',
      description: 'Auto-calculate project quality scores using ML analysis',
      isActive: true,
      successRate: 89.7,
      executionCount: 156,
      lastExecuted: new Date(Date.now() - 1000 * 60 * 30),
      category: 'quality_check',
      confidence: 0.89
    },
    {
      id: '3',
      name: 'Deadline Alert System',
      description: 'Intelligent notification system for project deadlines',
      isActive: true,
      successRate: 96.8,
      executionCount: 423,
      lastExecuted: new Date(Date.now() - 1000 * 60 * 5),
      category: 'notification',
      confidence: 0.97
    }
  ]);

  const [automationMetrics, setAutomationMetrics] = useState({
    totalAutomations: 826,
    activeRules: 12,
    averageEfficiency: 92.3,
    timeSaved: 156,
    errorReduction: 78.4
  });

  const toggleAutomation = (id: string) => {
    setAutomationRules(prev => 
      prev.map(rule => 
        rule.id === id ? { ...rule, isActive: !rule.isActive } : rule
      )
    );
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'audit_assignment': return <Users className="h-4 w-4" />;
      case 'quality_check': return <CheckCircle className="h-4 w-4" />;
      case 'notification': return <AlertTriangle className="h-4 w-4" />;
      case 'reporting': return <TrendingUp className="h-4 w-4" />;
      default: return <Bot className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'audit_assignment': return 'bg-blue-100 text-blue-800';
      case 'quality_check': return 'bg-green-100 text-green-800';
      case 'notification': return 'bg-yellow-100 text-yellow-800';
      case 'reporting': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Intelligent Automation Dashboard</h2>
          <p className="text-muted-foreground">
            AI-powered workflow automation and optimization
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-green-100 text-green-800">
            <Bot className="h-3 w-3 mr-1" />
            {automationMetrics.activeRules} Active Rules
          </Badge>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
        </div>
      </div>

      {/* Automation Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Automations</p>
                <p className="text-2xl font-bold">{automationMetrics.totalAutomations.toLocaleString()}</p>
              </div>
              <Zap className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Efficiency Rate</p>
                <p className="text-2xl font-bold">{automationMetrics.averageEfficiency}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Time Saved</p>
                <p className="text-2xl font-bold">{automationMetrics.timeSaved}h</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Error Reduction</p>
                <p className="text-2xl font-bold">{automationMetrics.errorReduction}%</p>
              </div>
              <Target className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Rules</p>
                <p className="text-2xl font-bold">{automationMetrics.activeRules}</p>
              </div>
              <Bot className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="rules" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="rules">Automation Rules</TabsTrigger>
          <TabsTrigger value="analytics">Performance Analytics</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="rules">
          <div className="space-y-4">
            {automationRules.map((rule) => (
              <Card key={rule.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(rule.category)}
                        <div>
                          <h3 className="font-semibold">{rule.name}</h3>
                          <p className="text-sm text-muted-foreground">{rule.description}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge className={getCategoryColor(rule.category)}>
                        {rule.category.replace('_', ' ')}
                      </Badge>
                      
                      <div className="text-right">
                        <div className="text-sm font-medium">{rule.successRate}% Success</div>
                        <div className="text-xs text-muted-foreground">
                          {rule.executionCount} executions
                        </div>
                      </div>
                      
                      <Button
                        variant={rule.isActive ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleAutomation(rule.id)}
                      >
                        {rule.isActive ? (
                          <>
                            <Pause className="h-3 w-3 mr-1" />
                            Active
                          </>
                        ) : (
                          <>
                            <Play className="h-3 w-3 mr-1" />
                            Inactive
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Confidence Score</span>
                      <span>{(rule.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={rule.confidence * 100} className="h-2" />
                    
                    <div className="text-xs text-muted-foreground">
                      Last executed: {rule.lastExecuted.toLocaleString()}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Performance Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Automation Efficiency Trends</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">This Week</span>
                      <div className="flex items-center gap-2">
                        <Progress value={94} className="w-20 h-2" />
                        <span className="text-sm font-medium">94%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Last Week</span>
                      <div className="flex items-center gap-2">
                        <Progress value={91} className="w-20 h-2" />
                        <span className="text-sm font-medium">91%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Last Month</span>
                      <div className="flex items-center gap-2">
                        <Progress value={88} className="w-20 h-2" />
                        <span className="text-sm font-medium">88%</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-3">Category Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Audit Assignment</span>
                      <Badge className="bg-blue-100 text-blue-800">Excellent</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Quality Checks</span>
                      <Badge className="bg-green-100 text-green-800">Good</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Notifications</span>
                      <Badge className="bg-green-100 text-green-800">Excellent</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Powered Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-blue-50">
                  <h4 className="font-medium text-blue-900 mb-2">Optimization Opportunity</h4>
                  <p className="text-sm text-blue-800">
                    The audit assignment automation could be 12% more efficient by incorporating 
                    real-time auditor availability data. Implementing this change could save an 
                    additional 18 hours per week.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-green-50">
                  <h4 className="font-medium text-green-900 mb-2">Success Pattern Detected</h4>
                  <p className="text-sm text-green-800">
                    Quality check automations show 23% higher success rates when triggered 
                    during business hours. Consider scheduling non-urgent checks accordingly.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-amber-50">
                  <h4 className="font-medium text-amber-900 mb-2">Attention Required</h4>
                  <p className="text-sm text-amber-800">
                    Notification automation confidence has decreased by 5% over the past week. 
                    Review recent rule changes and consider model retraining.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
