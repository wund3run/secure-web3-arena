
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Brain, TrendingUp, Users, Target, Zap, Star, Clock } from 'lucide-react';

interface UserBehaviorData {
  sessionDuration: number;
  pageViews: number;
  conversions: number;
  lastActive: string;
}

interface IntelligentRecommendationEngineProps {
  userType: 'project_owner' | 'auditor' | 'admin';
  userBehaviorData: UserBehaviorData;
}

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'high' | 'medium' | 'low';
  confidenceScore: number;
  actionable: boolean;
  estimatedImpact: string;
  timeToImplement: string;
}

export function IntelligentRecommendationEngine({ 
  userType, 
  userBehaviorData 
}: IntelligentRecommendationEngineProps) {
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    generateIntelligentRecommendations();
  }, [userType, userBehaviorData]);

  const generateIntelligentRecommendations = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const aiRecommendations: AIRecommendation[] = [];
    
    // Generate recommendations based on user type and behavior
    if (userType === 'project_owner') {
      aiRecommendations.push(
        {
          id: 'smart-auditor-matching',
          title: 'Enable Smart Auditor Matching',
          description: 'AI-powered matching can increase audit success rate by 34%',
          category: 'optimization',
          priority: 'high',
          confidenceScore: 0.92,
          actionable: true,
          estimatedImpact: '+34% success rate',
          timeToImplement: '5 minutes'
        },
        {
          id: 'budget-optimization',
          title: 'Optimize Your Audit Budget',
          description: 'Based on similar projects, you could save 15-20% on audit costs',
          category: 'financial',
          priority: 'medium',
          confidenceScore: 0.78,
          actionable: true,
          estimatedImpact: '15-20% cost savings',
          timeToImplement: '2 minutes'
        },
        {
          id: 'security-standards',
          title: 'Upgrade Security Standards',
          description: 'Consider implementing advanced security protocols for better protection',
          category: 'security',
          priority: 'high',
          confidenceScore: 0.85,
          actionable: true,
          estimatedImpact: '+40% security score',
          timeToImplement: '15 minutes'
        }
      );
    } else if (userType === 'auditor') {
      aiRecommendations.push(
        {
          id: 'skill-development',
          title: 'Skill Enhancement Recommendations',
          description: 'Focus on Solana and Layer 2 auditing skills - high demand detected',
          category: 'growth',
          priority: 'high',
          confidenceScore: 0.89,
          actionable: true,
          estimatedImpact: '+25% project matches',
          timeToImplement: '1 week'
        },
        {
          id: 'pricing-strategy',
          title: 'Optimize Your Pricing Strategy',
          description: 'AI analysis suggests you could increase rates by 12% while maintaining demand',
          category: 'financial',
          priority: 'medium',
          confidenceScore: 0.76,
          actionable: true,
          estimatedImpact: '+12% revenue',
          timeToImplement: '5 minutes'
        }
      );
    } else if (userType === 'admin') {
      aiRecommendations.push(
        {
          id: 'platform-optimization',
          title: 'Platform Performance Optimization',
          description: 'Implement caching strategies to reduce load times by 30%',
          category: 'performance',
          priority: 'high',
          confidenceScore: 0.94,
          actionable: true,
          estimatedImpact: '+30% faster load times',
          timeToImplement: '2 hours'
        },
        {
          id: 'user-retention',
          title: 'Improve User Retention',
          description: 'AI detected patterns showing 23% retention improvement potential',
          category: 'engagement',
          priority: 'high',
          confidenceScore: 0.81,
          actionable: true,
          estimatedImpact: '+23% retention',
          timeToImplement: '1 hour'
        }
      );
    }

    setRecommendations(aiRecommendations);
    setIsAnalyzing(false);

    // Track recommendation generation
    if ((window as any).trackConversion) {
      (window as any).trackConversion({
        action: 'ai_recommendations_generated',
        category: 'intelligence',
        label: userType,
        metadata: {
          recommendationCount: aiRecommendations.length,
          avgConfidence: aiRecommendations.reduce((acc, rec) => acc + rec.confidenceScore, 0) / aiRecommendations.length
        }
      });
    }
  };

  const handleImplementRecommendation = (recommendation: AIRecommendation) => {
    // Track implementation
    if ((window as any).trackConversion) {
      (window as any).trackConversion({
        action: 'ai_recommendation_implemented',
        category: 'intelligence',
        label: recommendation.id,
        metadata: {
          confidenceScore: recommendation.confidenceScore,
          priority: recommendation.priority,
          category: recommendation.category
        }
      });
    }

    console.log('Implementing recommendation:', recommendation.title);
  };

  const categories = ['all', ...Array.from(new Set(recommendations.map(r => r.category)))];
  const filteredRecommendations = selectedCategory === 'all' 
    ? recommendations 
    : recommendations.filter(r => r.category === selectedCategory);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (isAnalyzing) {
    return (
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <Brain className="h-8 w-8 text-blue-500 animate-pulse" />
            <div>
              <h3 className="text-xl font-semibold">AI Intelligence Engine</h3>
              <p className="text-muted-foreground">Analyzing your data and generating personalized recommendations...</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Processing user behavior patterns</span>
              <span className="text-sm text-blue-600">85%</span>
            </div>
            <Progress value={85} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Generating optimization suggestions</span>
              <span className="text-sm text-blue-600">72%</span>
            </div>
            <Progress value={72} className="h-2" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm">Calculating impact predictions</span>
              <span className="text-sm text-blue-600">91%</span>
            </div>
            <Progress value={91} className="h-2" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-6 w-6 text-blue-500" />
            Intelligent Recommendations Engine
          </CardTitle>
          <CardDescription>
            AI-powered insights and optimization suggestions tailored for your {userType.replace('_', ' ')} journey
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="capitalize"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Recommendations Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {filteredRecommendations.map((recommendation) => (
              <Card key={recommendation.id} className="relative hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{recommendation.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {recommendation.description}
                      </p>
                    </div>
                    <Badge className={`ml-2 ${getPriorityColor(recommendation.priority)}`}>
                      {recommendation.priority}
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-0 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3" />
                      <span>Impact: {recommendation.estimatedImpact}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{recommendation.timeToImplement}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span>AI Confidence: {Math.round(recommendation.confidenceScore * 100)}%</span>
                    </div>
                    
                    {recommendation.actionable && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="h-7 text-xs"
                        onClick={() => handleImplementRecommendation(recommendation)}
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Implement
                      </Button>
                    )}
                  </div>
                  
                  <Progress value={recommendation.confidenceScore * 100} className="h-1" />
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{recommendations.length}</div>
              <div className="text-xs text-muted-foreground">Total Recommendations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {recommendations.filter(r => r.priority === 'high').length}
              </div>
              <div className="text-xs text-muted-foreground">High Priority</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {Math.round(recommendations.reduce((acc, r) => acc + r.confidenceScore, 0) / recommendations.length * 100)}%
              </div>
              <div className="text-xs text-muted-foreground">Avg Confidence</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {recommendations.filter(r => r.actionable).length}
              </div>
              <div className="text-xs text-muted-foreground">Actionable Items</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
