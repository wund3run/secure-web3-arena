import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, TrendingUp, Target, Zap, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";

interface SmartRecommendation {
  id: string;
  title: string;
  description: string;
  confidence: number;
  impact: "high" | "medium" | "low";
  category: "optimization" | "security" | "growth" | "efficiency";
  actionUrl: string;
  aiReasoning: string;
  expectedOutcome: string;
  timeToImplement: string;
  predictedROI?: number;
}

interface IntelligentRecommendationEngineProps {
  userType: "project_owner" | "auditor" | "admin";
  userBehaviorData?: any;
}

export function IntelligentRecommendationEngine({ 
  userType, 
  userBehaviorData 
}: IntelligentRecommendationEngineProps) {
  const [recommendations, setRecommendations] = useState<SmartRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [activeTab, setActiveTab] = useState("priority");

  useEffect(() => {
    // Simulate AI analysis
    const analyzeUserBehavior = async () => {
      setIsAnalyzing(true);
      
      // Simulate API call to AI recommendation service
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const smartRecommendations = generateSmartRecommendations(userType, userBehaviorData);
      setRecommendations(smartRecommendations);
      setIsAnalyzing(false);
    };

    analyzeUserBehavior();
  }, [userType, userBehaviorData]);

  const generateSmartRecommendations = (userType: string, behaviorData?: any): SmartRecommendation[] => {
    const baseRecommendations: Record<string, SmartRecommendation[]> = {
      project_owner: [
        {
          id: "ai-audit-matching",
          title: "AI-Optimized Auditor Matching",
          description: "Our AI has identified 3 auditors with 94% compatibility for your DeFi project",
          confidence: 94,
          impact: "high",
          category: "optimization",
          actionUrl: "/marketplace?ai-match=true",
          aiReasoning: "Based on your project complexity, previous audit history, and auditor success rates",
          expectedOutcome: "23% faster audit completion, 15% higher satisfaction rate",
          timeToImplement: "5 minutes",
          predictedROI: 4.2
        },
        {
          id: "security-risk-prevention",
          title: "Proactive Security Risk Assessment",
          description: "Early vulnerability patterns detected - schedule preventive audit now",
          confidence: 87,
          impact: "high",
          category: "security",
          actionUrl: "/security-assessment",
          aiReasoning: "Code patterns similar to 12 previously audited projects with critical vulnerabilities",
          expectedOutcome: "Prevent potential $500K+ in security breaches",
          timeToImplement: "15 minutes",
          predictedROI: 8.7
        },
        {
          id: "cost-optimization",
          title: "Smart Budget Optimization",
          description: "Adjust audit scope to save 18% on costs while maintaining security coverage",
          confidence: 79,
          impact: "medium",
          category: "efficiency",
          actionUrl: "/audit-scope-optimizer",
          aiReasoning: "Similar projects achieved equal security with reduced scope in non-critical areas",
          expectedOutcome: "18% cost reduction, same security level",
          timeToImplement: "10 minutes",
          predictedROI: 3.4
        }
      ],
      auditor: [
        {
          id: "skill-enhancement",
          title: "Personalized Skill Development Path",
          description: "AI-curated learning path to increase your earning potential by 32%",
          confidence: 91,
          impact: "high",
          category: "growth",
          actionUrl: "/skill-development",
          aiReasoning: "Analysis of top-earning auditors with similar backgrounds shows key skill gaps",
          expectedOutcome: "32% higher hourly rates within 3 months",
          timeToImplement: "2 hours/week",
          predictedROI: 5.8
        },
        {
          id: "optimal-project-selection",
          title: "Smart Project Selection Algorithm",
          description: "5 high-value projects identified that match your expertise perfectly",
          confidence: 88,
          impact: "high",
          category: "optimization",
          actionUrl: "/recommended-projects",
          aiReasoning: "Projects align with your success patterns and expertise areas",
          expectedOutcome: "40% higher project completion rate",
          timeToImplement: "Immediate",
          predictedROI: 6.2
        },
        {
          id: "efficiency-tools",
          title: "Automated Workflow Enhancement",
          description: "AI-powered tools to reduce audit time by 25% while improving quality",
          confidence: 82,
          impact: "medium",
          category: "efficiency",
          actionUrl: "/workflow-automation",
          aiReasoning: "Workflow analysis shows repetitive tasks that can be automated",
          expectedOutcome: "25% faster audits, improved consistency",
          timeToImplement: "30 minutes setup",
          predictedROI: 4.1
        }
      ],
      admin: [
        {
          id: "platform-optimization",
          title: "Platform Performance Optimization",
          description: "AI detected bottlenecks - implement fixes to improve user satisfaction by 19%",
          confidence: 93,
          impact: "high",
          category: "optimization",
          actionUrl: "/platform-optimization",
          aiReasoning: "User behavior analysis shows friction points in key conversion flows",
          expectedOutcome: "19% user satisfaction increase, 12% conversion improvement",
          timeToImplement: "2 hours",
          predictedROI: 7.3
        },
        {
          id: "user-retention",
          title: "Predictive User Retention Strategy",
          description: "AI identified at-risk users - implement retention strategies to reduce churn by 28%",
          confidence: 86,
          impact: "high",
          category: "growth",
          actionUrl: "/retention-strategy",
          aiReasoning: "Behavioral patterns indicate users likely to churn in next 30 days",
          expectedOutcome: "28% churn reduction, $150K annual revenue protection",
          timeToImplement: "1 hour",
          predictedROI: 9.4
        }
      ]
    };

    return baseRecommendations[userType] || [];
  };

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

  const getCategoryIcon = (category: string) => {
    const icons = {
      optimization: Target,
      security: Shield,
      growth: TrendingUp,
      efficiency: Zap
    };
    const Icon = icons[category as keyof typeof icons] || Brain;
    return <Icon className="h-4 w-4" />;
  };

  const sortedRecommendations = [...recommendations].sort((a, b) => {
    if (activeTab === "priority") return b.confidence - a.confidence;
    if (activeTab === "impact") {
      const impactOrder = { high: 3, medium: 2, low: 1 };
      return impactOrder[b.impact] - impactOrder[a.impact];
    }
    if (activeTab === "roi" && a.predictedROI && b.predictedROI) {
      return b.predictedROI - a.predictedROI;
    }
    return 0;
  });

  if (isAnalyzing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 animate-pulse" />
            AI Recommendation Engine
          </CardTitle>
          <CardDescription>
            Analyzing your behavior patterns and generating personalized recommendations...
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <span className="text-sm">Processing user behavior data...</span>
            </div>
            <Progress value={75} className="h-2" />
            <div className="text-xs text-muted-foreground">
              Analyzing 15+ data points to generate optimal recommendations
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          AI-Powered Smart Recommendations
        </CardTitle>
        <CardDescription>
          Personalized insights and actions based on advanced behavioral analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="priority">By Confidence</TabsTrigger>
            <TabsTrigger value="impact">By Impact</TabsTrigger>
            <TabsTrigger value="roi">By ROI</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-4">
            {sortedRecommendations.map((recommendation) => (
              <div
                key={recommendation.id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      {getCategoryIcon(recommendation.category)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{recommendation.title}</h4>
                        <Badge variant={getImpactColor(recommendation.impact)}>
                          {recommendation.impact} impact
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Brain className="h-3 w-3" />
                          {recommendation.confidence}% confidence
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {recommendation.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="font-medium">AI Reasoning:</span>
                          <p className="text-muted-foreground mt-1">{recommendation.aiReasoning}</p>
                        </div>
                        <div>
                          <span className="font-medium">Expected Outcome:</span>
                          <p className="text-muted-foreground mt-1">{recommendation.expectedOutcome}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span>⏱️ {recommendation.timeToImplement}</span>
                        {recommendation.predictedROI && (
                          <span>📈 {recommendation.predictedROI}x ROI</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button size="sm" asChild>
                      <Link to={recommendation.actionUrl}>
                        Take Action
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Confidence Score</span>
                    <span className="font-medium">{recommendation.confidence}%</span>
                  </div>
                  <Progress value={recommendation.confidence} className="h-1 mt-1" />
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
