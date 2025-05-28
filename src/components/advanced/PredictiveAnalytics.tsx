
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, TrendingDown, AlertTriangle, Shield, 
  Brain, Target, Zap, BarChart3, Calendar, Clock 
} from "lucide-react";

interface PredictiveInsight {
  id: string;
  type: 'risk' | 'opportunity' | 'trend' | 'recommendation';
  title: string;
  description: string;
  confidence: number;
  impact: 'low' | 'medium' | 'high';
  timeframe: string;
  actionable: boolean;
  category: string;
}

interface MarketTrend {
  id: string;
  name: string;
  direction: 'up' | 'down' | 'stable';
  change: number;
  prediction: string;
  confidence: number;
}

export function PredictiveAnalytics() {
  const [insights, setInsights] = useState<PredictiveInsight[]>([]);
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading predictive analytics data
    setTimeout(() => {
      setInsights([
        {
          id: '1',
          type: 'risk',
          title: 'Increased DeFi Vulnerability Reports',
          description: 'Our AI models predict a 34% increase in DeFi-related vulnerabilities over the next quarter based on code complexity trends.',
          confidence: 87,
          impact: 'high',
          timeframe: 'Next 3 months',
          actionable: true,
          category: 'Security Trends'
        },
        {
          id: '2',
          type: 'opportunity',
          title: 'Cross-Chain Security Demand Surge',
          description: 'Market analysis indicates 250% growth in cross-chain protocol audits. Consider expanding cross-chain expertise.',
          confidence: 92,
          impact: 'high',
          timeframe: 'Next 6 months',
          actionable: true,
          category: 'Market Opportunity'
        },
        {
          id: '3',
          type: 'trend',
          title: 'ZK-Proof Security Focus',
          description: 'Zero-knowledge proof implementations showing 45% increase in security reviews. Early adoption recommended.',
          confidence: 78,
          impact: 'medium',
          timeframe: 'Next 12 months',
          actionable: true,
          category: 'Technology Trend'
        },
        {
          id: '4',
          type: 'recommendation',
          title: 'Audit Pricing Optimization',
          description: 'Based on market data, consider adjusting pricing for smart contract audits by 12% to optimize competitiveness.',
          confidence: 85,
          impact: 'medium',
          timeframe: 'Immediate',
          actionable: true,
          category: 'Business Strategy'
        }
      ]);

      setMarketTrends([
        {
          id: '1',
          name: 'Smart Contract Audits',
          direction: 'up',
          change: 23.5,
          prediction: 'Strong growth expected',
          confidence: 89
        },
        {
          id: '2',
          name: 'DeFi Protocol Reviews',
          direction: 'up',
          change: 45.2,
          prediction: 'Explosive growth likely',
          confidence: 94
        },
        {
          id: '3',
          name: 'NFT Security Audits',
          direction: 'down',
          change: -12.3,
          prediction: 'Decline expected',
          confidence: 76
        },
        {
          id: '4',
          name: 'Cross-Chain Bridges',
          direction: 'up',
          change: 67.8,
          prediction: 'Massive expansion',
          confidence: 91
        }
      ]);

      setIsLoading(false);
    }, 1500);
  }, []);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'risk': return <AlertTriangle className="h-5 w-5 text-orange-500" />;
      case 'opportunity': return <Target className="h-5 w-5 text-green-500" />;
      case 'trend': return <TrendingUp className="h-5 w-5 text-blue-500" />;
      case 'recommendation': return <Brain className="h-5 w-5 text-purple-500" />;
      default: return <BarChart3 className="h-5 w-5" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTrendIcon = (direction: string) => {
    switch (direction) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <TrendingUp className="h-4 w-4 text-gray-500" />;
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Predictive Analytics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
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
            <Brain className="h-5 w-5" />
            AI-Powered Predictive Analytics
          </CardTitle>
          <CardDescription>
            Advanced insights and predictions powered by machine learning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="insights" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="insights">Predictive Insights</TabsTrigger>
              <TabsTrigger value="trends">Market Trends</TabsTrigger>
            </TabsList>

            <TabsContent value="insights" className="space-y-4">
              {insights.map((insight) => (
                <Card key={insight.id} className="border-l-4 border-l-primary">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getInsightIcon(insight.type)}
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getImpactColor(insight.impact)}>
                          {insight.impact} impact
                        </Badge>
                        <Badge variant="secondary">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{insight.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {insight.timeframe}
                      </div>
                      <div className="flex items-center gap-1">
                        <Shield className="h-3 w-3" />
                        {insight.category}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Confidence Level</span>
                        <span>{insight.confidence}%</span>
                      </div>
                      <Progress value={insight.confidence} className="h-2" />
                    </div>

                    {insight.actionable && (
                      <Button size="sm" className="mt-3">
                        <Zap className="h-3 w-3 mr-1" />
                        Take Action
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="trends" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {marketTrends.map((trend) => (
                  <Card key={trend.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{trend.name}</CardTitle>
                        {getTrendIcon(trend.direction)}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">
                          {trend.change > 0 ? '+' : ''}{trend.change}%
                        </span>
                        <Badge variant={trend.direction === 'up' ? 'default' : 'destructive'}>
                          {trend.direction === 'up' ? 'Growth' : 'Decline'}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground">{trend.prediction}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Prediction Confidence</span>
                          <span>{trend.confidence}%</span>
                        </div>
                        <Progress value={trend.confidence} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
