import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp,
  Brain,
  Target,
  BarChart3,
  LineChart,
  PieChart,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  Activity,
  Zap,
  RefreshCw,
  Download,
  Calendar,
  Award,
  Bug
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface PredictiveInsight {
  id: string;
  type: 'risk' | 'opportunity' | 'trend' | 'anomaly';
  title: string;
  description: string;
  confidence: number;
  impact: 'high' | 'medium' | 'low';
  timeline: string;
  recommendation: string;
}

interface TrendAnalysis {
  metric: string;
  current_value: number;
  predicted_value: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  confidence: number;
  change_percentage: number;
}

interface RiskPrediction {
  id: string;
  risk_type: string;
  probability: number;
  severity: 'critical' | 'high' | 'medium' | 'low';
  predicted_date: string;
  mitigation_steps: string[];
}

interface PredictiveAnalyticsProps {
  className?: string;
}

export function PredictiveAnalytics({ className }: PredictiveAnalyticsProps) {
  const [activeTab, setActiveTab] = useState('insights');
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [trends, setTrends] = useState<TrendAnalysis[]>([]);
  const [risks, setRisks] = useState<RiskPrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);

  const mockInsights: PredictiveInsight[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'Emerging Vulnerability Pattern',
      description: 'AI model detects potential for 30% increase in DeFi protocol audit requests based on market trends',
      confidence: 92,
      impact: 'high',
      timeline: 'Next 30 days',
      recommendation: 'Scale DeFi auditing team by 2-3 senior auditors'
    },
    {
      id: '2',
      type: 'risk',
      title: 'Auditor Capacity Risk',
      description: 'Current booking trends suggest 85% utilization rate may lead to delayed deliveries',
      confidence: 78,
      impact: 'medium',
      timeline: 'Next 14 days',
      recommendation: 'Implement waitlist system and expand contractor network'
    },
    {
      id: '3',
      type: 'trend',
      title: 'Client Retention Improvement',
      description: 'ML analysis shows 23% improvement in client satisfaction with new reporting format',
      confidence: 89,
      impact: 'high',
      timeline: 'Past 60 days',
      recommendation: 'Standardize enhanced reporting across all audit types'
    }
  ];

  const mockTrends: TrendAnalysis[] = [
    {
      metric: 'Audit Requests',
      current_value: 145,
      predicted_value: 189,
      trend: 'increasing',
      confidence: 87,
      change_percentage: 30.3
    },
    {
      metric: 'Average Project Value',
      current_value: 45000,
      predicted_value: 52000,
      trend: 'increasing',
      confidence: 74,
      change_percentage: 15.6
    },
    {
      metric: 'Time to Completion',
      current_value: 14,
      predicted_value: 11,
      trend: 'decreasing',
      confidence: 81,
      change_percentage: -21.4
    },
    {
      metric: 'Client Satisfaction',
      current_value: 4.2,
      predicted_value: 4.6,
      trend: 'increasing',
      confidence: 92,
      change_percentage: 9.5
    }
  ];

  const mockRisks: RiskPrediction[] = [
    {
      id: '1',
      risk_type: 'Auditor Burnout',
      probability: 0.23,
      severity: 'medium',
      predicted_date: '2024-02-15',
      mitigation_steps: [
        'Redistribute workload across team',
        'Implement mandatory time-off policy',
        'Hire additional junior auditors'
      ]
    },
    {
      id: '2',
      risk_type: 'Market Volatility Impact',
      probability: 0.67,
      severity: 'high',
      predicted_date: '2024-01-30',
      mitigation_steps: [
        'Diversify service portfolio',
        'Implement flexible pricing model',
        'Build cash reserves'
      ]
    }
  ];

  const runAnalysis = useCallback(async () => {
    setIsLoading(true);
    setAnalysisProgress(0);
    
    try {
      // Simulate ML analysis progress
      for (let i = 0; i <= 100; i += 10) {
        setAnalysisProgress(i);
        await new Promise(resolve => setTimeout(resolve, 200));
      }
      
      setInsights(mockInsights);
      setTrends(mockTrends);
      setRisks(mockRisks);
      toast.success('AI analysis completed successfully');
    } catch (error) {
      toast.error('Failed to run predictive analysis');
    } finally {
      setIsLoading(false);
      setAnalysisProgress(0);
    }
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="h-5 w-5 text-green-600" />;
      case 'risk': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'trend': return <BarChart3 className="h-5 w-5 text-blue-600" />;
      case 'anomaly': return <Zap className="h-5 w-5 text-purple-600" />;
      default: return <Activity className="h-5 w-5" />;
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'border-green-200 bg-green-50';
      case 'risk': return 'border-red-200 bg-red-50';
      case 'trend': return 'border-blue-200 bg-blue-50';
      case 'anomaly': return 'border-purple-200 bg-purple-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'decreasing': return <TrendingUp className="h-4 w-4 text-red-600 rotate-180" />;
      case 'stable': return <Activity className="h-4 w-4 text-blue-600" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getRiskColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Brain className="h-8 w-8 text-primary" />
            Predictive Analytics
          </h2>
          <p className="text-muted-foreground">
            AI-powered insights and recommendations for strategic decision making
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={runAnalysis} disabled={isLoading}>
            <RefreshCw className={cn("h-4 w-4 mr-2", isLoading && "animate-spin")} />
            {isLoading ? 'Analyzing...' : 'Run Analysis'}
          </Button>
        </div>
      </div>

      {isLoading && (
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary animate-pulse" />
                <span className="text-sm font-medium">Running AI Analysis...</span>
              </div>
              <Progress value={analysisProgress} className="w-full" />
              <p className="text-xs text-muted-foreground">
                Processing data patterns and generating predictions...
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="trends">Trend Analysis</TabsTrigger>
          <TabsTrigger value="risks">Risk Predictions</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-6">
          {insights.length > 0 ? (
            <div className="space-y-4">
              {insights.map((insight) => (
                <Card key={insight.id} className={cn("transition-all hover:shadow-md", getInsightColor(insight.type))}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        {getInsightIcon(insight.type)}
                        <div>
                          <CardTitle className="text-lg">{insight.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {insight.type}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {insight.impact} impact
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {insight.confidence}% confidence
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">{insight.timeline}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-4">{insight.description}</p>
                    <div className="bg-white/50 p-3 rounded border">
                      <p className="text-sm font-medium mb-1">💡 Recommended Action:</p>
                      <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No AI insights available</p>
                <Button onClick={runAnalysis}>Run Predictive Analysis</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="trends" className="space-y-6">
          {trends.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {trends.map((trend, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{trend.metric}</CardTitle>
                      <div className="flex items-center gap-2">
                        {getTrendIcon(trend.trend)}
                        <Badge variant="outline" className="text-xs">
                          {trend.confidence}% confidence
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground">Current</label>
                        <p className="text-lg font-bold">
                          {trend.metric.includes('Value') ? formatCurrency(trend.current_value) : trend.current_value}
                          {trend.metric === 'Client Satisfaction' && '/5'}
                          {trend.metric === 'Time to Completion' && ' days'}
                        </p>
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Predicted</label>
                        <p className="text-lg font-bold">
                          {trend.metric.includes('Value') ? formatCurrency(trend.predicted_value) : trend.predicted_value}
                          {trend.metric === 'Client Satisfaction' && '/5'}
                          {trend.metric === 'Time to Completion' && ' days'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted rounded">
                      <span className="text-sm font-medium">Predicted Change</span>
                      <span className={cn(
                        "text-sm font-bold",
                        trend.change_percentage > 0 && trend.trend === 'increasing' ? "text-green-600" : 
                        trend.change_percentage < 0 && trend.trend === 'decreasing' ? "text-red-600" : 
                        "text-blue-600"
                      )}>
                        {trend.change_percentage > 0 ? '+' : ''}{trend.change_percentage.toFixed(1)}%
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <LineChart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No trend analysis available</p>
                <Button onClick={runAnalysis}>Run Trend Analysis</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="risks" className="space-y-6">
          {risks.length > 0 ? (
            <div className="space-y-4">
              {risks.map((risk) => (
                <Card key={risk.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3">
                        <AlertTriangle className="h-5 w-5 text-orange-500" />
                        {risk.risk_type}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge className={cn("text-white", getRiskColor(risk.severity))}>
                          {risk.severity}
                        </Badge>
                        <Badge variant="outline">
                          {(risk.probability * 100).toFixed(0)}% probability
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div>
                        <label className="text-xs text-muted-foreground">Predicted Date</label>
                        <p className="text-sm font-medium">
                          {new Date(risk.predicted_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex-1">
                        <label className="text-xs text-muted-foreground">Risk Probability</label>
                        <Progress value={risk.probability * 100} className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Mitigation Steps</label>
                      <div className="space-y-2">
                        {risk.mitigation_steps.map((step, index) => (
                          <div key={index} className="flex items-start gap-2 p-2 bg-muted rounded text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            {step}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">No risk predictions available</p>
                <Button onClick={runAnalysis}>Run Risk Analysis</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-blue-600" />
                  Team Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    Hire 2 senior DeFi auditors
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    Implement team rotation policy
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    Cross-train auditors in new technologies
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Revenue Growth
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    Increase DeFi audit pricing by 15%
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    Offer premium white-glove service
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    Launch subscription audit services
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-600" />
                  Process Efficiency
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    Automate initial vulnerability scanning
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    Standardize reporting templates
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                    Implement peer review workflow
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Strategic Initiatives
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Short-term (30 days)</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border rounded text-sm">
                      <Award className="h-4 w-4 text-blue-500" />
                      Launch auditor certification program
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded text-sm">
                      <Bug className="h-4 w-4 text-red-500" />
                      Implement automated vulnerability detection
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Long-term (90 days)</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 border rounded text-sm">
                      <BarChart3 className="h-4 w-4 text-green-500" />
                      Expand to Layer 2 protocols
                    </div>
                    <div className="flex items-center gap-2 p-2 border rounded text-sm">
                      <Users className="h-4 w-4 text-purple-500" />
                      Partner with security firms
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 