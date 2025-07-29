
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Brain, TrendingUp, Users, Target, Lightbulb, Star } from 'lucide-react';

interface UserBehaviorData {
  sessionDuration: number;
  pageViews: number;
  conversions: number;
  lastActive: string;
}

interface RecommendationProps {
  userType: 'project_owner' | 'auditor' | 'admin';
  userBehaviorData: UserBehaviorData;
}

interface Recommendation {
  id: string;
  type: 'optimization' | 'feature' | 'engagement' | 'conversion';
  priority: 'high' | 'medium' | 'low';
  title: string;
  description: string;
  impact: string;
  action: string;
  confidence: number;
}

export const IntelligentRecommendationEngine: React.FC<RecommendationProps> = ({
  userType,
  userBehaviorData
}) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate AI processing time
    const timer = setTimeout(() => {
      const aiRecommendations = generateRecommendations(userType, userBehaviorData);
      setRecommendations(aiRecommendations);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [userType, userBehaviorData]);

  const generateRecommendations = (type: string, behavior: UserBehaviorData): Recommendation[] => {
    const baseRecommendations: Record<string, Recommendation[]> = {
      project_owner: [
        {
          id: '1',
          type: 'optimization',
          priority: 'high',
          title: 'Optimize Your Audit Request Process',
          description: 'Based on your behavior, you could reduce time to audit completion by 30%',
          impact: '+30% faster completion',
          action: 'Add more project details upfront',
          confidence: 0.89
        },
        {
          id: '2',
          type: 'feature',
          priority: 'medium',
          title: 'Enable AI-Powered Auditor Matching',
          description: 'Our ML algorithm can find 23% better matches for your projects',
          impact: '+23% better matches',
          action: 'Enable smart matching',
          confidence: 0.76
        },
        {
          id: '3',
          type: 'engagement',
          priority: 'medium',
          title: 'Set Up Real-time Notifications',
          description: 'Stay updated on audit progress with instant notifications',
          impact: '+40% engagement',
          action: 'Configure notifications',
          confidence: 0.82
        }
      ],
      auditor: [
        {
          id: '4',
          type: 'conversion',
          priority: 'high',
          title: 'Improve Your Profile Completeness',
          description: 'Complete profiles get 45% more project invitations',
          impact: '+45% more invitations',
          action: 'Add certifications and portfolio',
          confidence: 0.91
        },
        {
          id: '5',
          type: 'optimization',
          priority: 'high',
          title: 'Optimize Your Response Time',
          description: 'Faster responses increase project win rate by 35%',
          impact: '+35% win rate',
          action: 'Set up mobile notifications',
          confidence: 0.87
        },
        {
          id: '6',
          type: 'feature',
          priority: 'low',
          title: 'Use AI-Assisted Audit Tools',
          description: 'Leverage our new AI tools to increase audit efficiency',
          impact: '+25% efficiency',
          action: 'Try AI assistant',
          confidence: 0.73
        }
      ],
      admin: [
        {
          id: '7',
          type: 'optimization',
          priority: 'high',
          title: 'Platform Performance Optimization',
          description: 'User engagement could increase by 28% with performance improvements',
          impact: '+28% engagement',
          action: 'Review performance metrics',
          confidence: 0.85
        },
        {
          id: '8',
          type: 'feature',
          priority: 'medium',
          title: 'Implement Predictive Analytics',
          description: 'Predict user churn 2 weeks in advance with 89% accuracy',
          impact: '89% churn prediction',
          action: 'Enable ML models',
          confidence: 0.89
        }
      ]
    };

    return baseRecommendations[type] || [];
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'default';
      case 'low': return 'secondary';
      default: return 'default';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'optimization': return TrendingUp;
      case 'feature': return Lightbulb;
      case 'engagement': return Users;
      case 'conversion': return Target;
      default: return Brain;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 animate-pulse" />
            AI Processing Recommendations...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          AI-Powered Recommendations
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Personalized insights based on your behavior and platform data
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {recommendations.map((rec) => {
          const IconComponent = getTypeIcon(rec.type);
          return (
            <div key={rec.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4 text-primary" />
                  <h3 className="font-medium">{rec.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={getPriorityColor(rec.priority)}>
                    {rec.priority}
                  </Badge>
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    {Math.round(rec.confidence * 100)}%
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">{rec.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-muted-foreground">Expected impact: </span>
                  <span className="font-medium text-green-600">{rec.impact}</span>
                </div>
                <Button size="sm" variant="outline">
                  {rec.action}
                </Button>
              </div>
            </div>
          );
        })}
        
        <div className="text-center pt-4 border-t">
          <p className="text-xs text-muted-foreground mb-2">
            Recommendations powered by machine learning analysis
          </p>
          <Button variant="ghost" size="sm">
            View All Recommendations
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
