import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Brain, 
  TrendingUp, 
  Target, 
  AlertTriangle, 
  BarChart3, 
  Calendar,
  DollarSign,
  Users,
  Clock,
  Zap
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface PredictionModel {
  id: string;
  name: string;
  accuracy: number;
  lastTrained: Date;
  predictions: number;
  category: 'demand' | 'pricing' | 'quality' | 'risk';
  confidence: number;
  status: 'active' | 'training' | 'needs_update';
}

interface Prediction {
  metric: string;
  current: number;
  predicted: number;
  change: number;
  confidence: number;
  timeframe: string;
  trend: 'up' | 'down' | 'stable';
}

export function AdvancedPredictiveAnalytics() {
  const [models, setModels] = useState<PredictionModel[]>([
    {
      id: '1',
      name: 'Audit Demand Forecasting',
      accuracy: 94.2,
      lastTrained: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
      predictions: 156,
      category: 'demand',
      confidence: 0.94,
      status: 'active'
    },
    {
      id: '2',
      name: 'Dynamic Pricing Model',
      accuracy: 89.7,
      lastTrained: new Date(Date.now() - 1000 * 60 * 60 * 24),
      predictions: 89,
      category: 'pricing',
      confidence: 0.89,
      status: 'active'
    },
    {
      id: '3',
      name: 'Quality Score Predictor',
      accuracy: 92.1,
      lastTrained: new Date(Date.now() - 1000 * 60 * 60 * 6),
      predictions: 234,
      category: 'quality',
      confidence: 0.92,
      status: 'training'
    }
  ]);

  const [predictions, setPredictions] = useState<Prediction[]>([
    {
      metric: 'Monthly Revenue',
      current: 45680,
      predicted: 52340,
      change: 14.6,
      confidence: 0.91,
      timeframe: 'Next 30 days',
      trend: 'up'
    },
    {
      metric: 'New Auditor Signups',
      current: 23,
      predicted: 31,
      change: 34.8,
      confidence: 0.87,
      timeframe: 'Next 7 days',
      trend: 'up'
    },
    {
      metric: 'Average Project Value',
      current: 2840,
      predicted: 2650,
      change: -6.7,
      confidence: 0.83,
      timeframe: 'Next 14 days',
      trend: 'down'
    },
    {
      metric: 'Platform Usage',
      current: 78.4,
      predicted: 81.2,
      change: 3.6,
      confidence: 0.95,
      timeframe: 'Next 7 days',
      trend: 'up'
    }
  ]);

  const [forecastData] = useState([
    { date: '2024-01', actual: 28000, predicted: 28500 },
    { date: '2024-02', actual: 32000, predicted: 31800 },
    { date: '2024-03', actual: 29500, predicted: 30200 },
    { date: '2024-04', actual: 35000, predicted: 34600 },
    { date: '2024-05', actual: 38000, predicted: 38400 },
    { date: '2024-06', actual: null, predicted: 42000 },
    { date: '2024-07', actual: null, predicted: 45500 },
    { date: '2024-08', actual: null, predicted: 48200 }
  ]);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'demand': return <TrendingUp className="h-4 w-4" />;
      case 'pricing': return <DollarSign className="h-4 w-4" />;
      case 'quality': return <Target className="h-4 w-4" />;
      case 'risk': return <AlertTriangle className="h-4 w-4" />;
      default: return <Brain className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'demand': return 'bg-blue-100 text-blue-800';
      case 'pricing': return 'bg-green-100 text-green-800';
      case 'quality': return 'bg-purple-100 text-purple-800';
      case 'risk': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'training': return 'bg-yellow-100 text-yellow-800';
      case 'needs_update': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      case 'stable': return <BarChart3 className="h-4 w-4 text-gray-600" />;
      default: return <BarChart3 className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Advanced Predictive Analytics</h2>
          <p className="text-muted-foreground">
            ML-powered insights and forecasting for strategic decision making
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="bg-purple-100 text-purple-800">
            <Brain className="h-3 w-3 mr-1" />
            {models.filter(m => m.status === 'active').length} Active Models
          </Badge>
          <Button variant="outline">
            <Zap className="h-4 w-4 mr-2" />
            Retrain Models
          </Button>
        </div>
      </div>

      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="predictions">Key Predictions</TabsTrigger>
          <TabsTrigger value="models">ML Models</TabsTrigger>
          <TabsTrigger value="forecasts">Revenue Forecast</TabsTrigger>
          <TabsTrigger value="insights">Strategic Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {predictions.map((prediction, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold">{prediction.metric}</h3>
                    {getTrendIcon(prediction.trend)}
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Current</span>
                      <span className="font-medium">
                        {prediction.metric.includes('Revenue') || prediction.metric.includes('Value') 
                          ? `$${prediction.current.toLocaleString()}`
                          : prediction.metric.includes('Usage')
                          ? `${prediction.current}%`
                          : prediction.current.toLocaleString()
                        }
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Predicted</span>
                      <span className="font-medium">
                        {prediction.metric.includes('Revenue') || prediction.metric.includes('Value')
                          ? `$${prediction.predicted.toLocaleString()}`
                          : prediction.metric.includes('Usage')
                          ? `${prediction.predicted}%`
                          : prediction.predicted.toLocaleString()
                        }
                      </span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Change</span>
                      <span className={`font-medium ${prediction.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {prediction.change > 0 ? '+' : ''}{prediction.change.toFixed(1)}%
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Confidence</span>
                        <span>{(prediction.confidence * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={prediction.confidence * 100} className="h-2" />
                    </div>
                    
                    <div className="text-xs text-muted-foreground">
                      Timeframe: {prediction.timeframe}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="models">
          <div className="space-y-4">
            {models.map((model) => (
              <Card key={model.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(model.category)}
                        <div>
                          <h3 className="font-semibold">{model.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {model.predictions} predictions made
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Badge className={getCategoryColor(model.category)}>
                        {model.category}
                      </Badge>
                      
                      <Badge className={getStatusColor(model.status)}>
                        {model.status.replace('_', ' ')}
                      </Badge>
                      
                      <div className="text-right">
                        <div className="text-sm font-medium">{model.accuracy}% Accuracy</div>
                        <div className="text-xs text-muted-foreground">
                          Last trained: {model.lastTrained.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Model Confidence</span>
                      <span>{(model.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <Progress value={model.confidence * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forecasts">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Revenue Forecast vs Actual
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value: number | string | unknown) => [`$${value?.toLocaleString?.()}`, '']} />
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    stackId="1"
                    stroke="#2563eb" 
                    fill="#3b82f6"
                    fillOpacity={0.6}
                    name="Actual Revenue"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="predicted" 
                    stackId="1"
                    stroke="#dc2626" 
                    fill="#ef4444"
                    fillOpacity={0.3}
                    strokeDasharray="5 5"
                    name="Predicted Revenue"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insights">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  Strategic Insights & Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg bg-blue-50">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-blue-900 mb-1">Growth Opportunity</h4>
                        <p className="text-sm text-blue-800 mb-2">
                          Our models predict a 34% increase in auditor signups next week. 
                          Consider launching the premium tier promotion to capitalize on this growth.
                        </p>
                        <Badge className="bg-blue-100 text-blue-800">High Confidence: 91%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-amber-50">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-amber-900 mb-1">Market Trend Alert</h4>
                        <p className="text-sm text-amber-800 mb-2">
                          Average project values are predicted to decrease by 6.7% in the next two weeks. 
                          This may indicate market saturation in lower-tier audits.
                        </p>
                        <Badge className="bg-amber-100 text-amber-800">Medium Confidence: 83%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-green-50">
                    <div className="flex items-start gap-3">
                      <Target className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-green-900 mb-1">Optimization Success</h4>
                        <p className="text-sm text-green-800 mb-2">
                          Platform usage is expected to increase by 3.6% following recent UX improvements. 
                          Continue focusing on user experience enhancements.
                        </p>
                        <Badge className="bg-green-100 text-green-800">High Confidence: 95%</Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 border rounded-lg bg-purple-50">
                    <div className="flex items-start gap-3">
                      <Brain className="h-5 w-5 text-purple-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-purple-900 mb-1">AI Model Recommendation</h4>
                        <p className="text-sm text-purple-800 mb-2">
                          The Quality Score Predictor model would benefit from additional training data. 
                          Consider implementing user feedback loops to improve accuracy.
                        </p>
                        <Badge className="bg-purple-100 text-purple-800">Action Required</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
