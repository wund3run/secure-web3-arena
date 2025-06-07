
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Brain, TrendingUp, Target, Zap, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface PredictionModel {
  id: string;
  name: string;
  accuracy: number;
  lastTrained: string;
  status: 'active' | 'training' | 'inactive';
}

interface OptimizationOpportunity {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  effort: 'low' | 'medium' | 'high';
  predictedOutcome: string;
  confidence: number;
  category: string;
}

export function PredictiveOptimization() {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [selectedModel, setSelectedModel] = useState('conversion');

  useEffect(() => {
    // Simulate AI model analysis
    const analyzeData = async () => {
      setIsAnalyzing(true);
      await new Promise(resolve => setTimeout(resolve, 2500));
      setIsAnalyzing(false);
    };

    analyzeData();
  }, [selectedModel]);

  const predictionModels: PredictionModel[] = [
    { id: 'conversion', name: 'Conversion Prediction', accuracy: 94.2, lastTrained: '2 hours ago', status: 'active' },
    { id: 'churn', name: 'Churn Risk Model', accuracy: 89.7, lastTrained: '1 day ago', status: 'active' },
    { id: 'engagement', name: 'Engagement Forecasting', accuracy: 91.8, lastTrained: '6 hours ago', status: 'active' },
    { id: 'revenue', name: 'Revenue Prediction', accuracy: 87.3, lastTrained: '4 hours ago', status: 'training' }
  ];

  const optimizationOpportunities: OptimizationOpportunity[] = [
    {
      id: 'ui-optimization',
      title: 'Landing Page CTA Optimization',
      description: 'AI predicts 23% conversion improvement with button color and placement changes',
      impact: 'high',
      effort: 'low',
      predictedOutcome: '+23% conversion rate',
      confidence: 0.89,
      category: 'ui'
    },
    {
      id: 'personalization',
      title: 'Personalized Service Recommendations',
      description: 'Machine learning suggests personalized auditor matching could increase satisfaction',
      impact: 'high',
      effort: 'medium',
      predictedOutcome: '+31% user satisfaction',
      confidence: 0.92,
      category: 'personalization'
    },
    {
      id: 'retention',
      title: 'User Retention Strategy',
      description: 'Predictive model identifies optimal timing for follow-up communications',
      impact: 'medium',
      effort: 'low',
      predictedOutcome: '+18% retention rate',
      confidence: 0.76,
      category: 'retention'
    },
    {
      id: 'pricing',
      title: 'Dynamic Pricing Optimization',
      description: 'AI-driven pricing strategy could increase revenue while maintaining competitiveness',
      impact: 'high',
      effort: 'high',
      predictedOutcome: '+15% revenue',
      confidence: 0.84,
      category: 'pricing'
    }
  ];

  const predictionData = [
    { month: 'Jan', actual: 85, predicted: 87, confidence: 92 },
    { month: 'Feb', actual: 92, predicted: 89, confidence: 89 },
    { month: 'Mar', actual: 88, predicted: 91, confidence: 94 },
    { month: 'Apr', actual: 96, predicted: 94, confidence: 91 },
    { month: 'May', actual: null, predicted: 98, confidence: 88 },
    { month: 'Jun', actual: null, predicted: 102, confidence: 85 },
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isAnalyzing) {
    return (
      <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <Brain className="h-8 w-8 text-purple-500 animate-pulse" />
            <div>
              <h3 className="text-xl font-semibold">Predictive Optimization Engine</h3>
              <p className="text-muted-foreground">Analyzing patterns and generating optimization strategies...</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Training ML models</span>
              <span className="text-sm text-purple-600">94%</span>
            </div>
            <Progress value={94} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Analyzing user behavior patterns</span>
              <span className="text-sm text-purple-600">87%</span>
            </div>
            <Progress value={87} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Generating optimization recommendations</span>
              <span className="text-sm text-purple-600">92%</span>
            </div>
            <Progress value={92} className="h-2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Model Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-500" />
            Predictive Models Status
          </CardTitle>
          <CardDescription>
            Machine learning models continuously analyze data to predict outcomes and suggest optimizations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {predictionModels.map((model) => (
              <div
                key={model.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedModel === model.id ? 'border-purple-300 bg-purple-50' : 'border-border hover:border-purple-200'
                }`}
                onClick={() => setSelectedModel(model.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{model.name}</h4>
                  <Badge variant={model.status === 'active' ? 'default' : 'secondary'} className="text-xs">
                    {model.status}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-purple-600">{model.accuracy}%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
                <div className="text-xs text-muted-foreground mt-1">
                  <Clock className="h-3 w-3 inline mr-1" />
                  {model.lastTrained}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Prediction Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Predictions vs Actual Results</CardTitle>
          <CardDescription>
            Comparing AI predictions with actual outcomes for model validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={predictionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="confidence" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.1} />
              <Line type="monotone" dataKey="actual" stroke="#3B82F6" strokeWidth={3} dot={{ fill: '#3B82F6' }} />
              <Line type="monotone" dataKey="predicted" stroke="#10B981" strokeWidth={2} strokeDasharray="5 5" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Optimization Opportunities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-green-500" />
            AI-Driven Optimization Opportunities
          </CardTitle>
          <CardDescription>
            Machine learning identified optimization opportunities ranked by predicted impact
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            {optimizationOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{opportunity.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {opportunity.description}
                      </p>
                    </div>
                    <div className="flex gap-1 ml-2">
                      <Badge className={getImpactColor(opportunity.impact)} variant="outline">
                        {opportunity.impact} impact
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Badge className={getEffortColor(opportunity.effort)} variant="secondary">
                        {opportunity.effort} effort
                      </Badge>
                      <span className="text-muted-foreground">•</span>
                      <span>{opportunity.category}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-green-600">
                        {opportunity.predictedOutcome}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(opportunity.confidence * 100)}% confidence
                      </span>
                    </div>
                    <Progress value={opportunity.confidence * 100} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {opportunity.confidence > 0.8 ? (
                        <CheckCircle className="h-3 w-3 text-green-500" />
                      ) : (
                        <AlertTriangle className="h-3 w-3 text-yellow-500" />
                      )}
                      {opportunity.confidence > 0.8 ? 'High confidence' : 'Medium confidence'}
                    </div>
                    <Button size="sm" variant="outline" className="h-7 text-xs">
                      <Zap className="h-3 w-3 mr-1" />
                      Implement
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Summary Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">4</div>
            <div className="text-sm text-muted-foreground">Active Models</div>
            <div className="text-xs text-green-600 mt-1">91% avg accuracy</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">12</div>
            <div className="text-sm text-muted-foreground">Opportunities Found</div>
            <div className="text-xs text-purple-600 mt-1">8 high impact</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">+27%</div>
            <div className="text-sm text-muted-foreground">Predicted Growth</div>
            <div className="text-xs text-blue-600 mt-1">Next quarter</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">89%</div>
            <div className="text-sm text-muted-foreground">Model Confidence</div>
            <div className="text-xs text-green-600 mt-1">Improving daily</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
