
import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, User, FileText, Star, TrendingUp, ArrowRight } from 'lucide-react';
import { AdaptiveInterfaceProps } from './types';

interface Recommendation {
  id: string;
  type: 'auditor' | 'resource' | 'action' | 'feature';
  title: string;
  description: string;
  confidence: number;
  metadata?: any;
  actionUrl?: string;
  actionLabel?: string;
}

export function PersonalizedRecommendations({ 
  userSegment, 
  userType, 
  preferences, 
  behaviorProfile 
}: AdaptiveInterfaceProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    generateRecommendations();
  }, [userSegment, userType, behaviorProfile]);

  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const generated = getRecommendationsForUser();
    setRecommendations(generated);
    setIsLoading(false);
  };

  const getRecommendationsForUser = (): Recommendation[] => {
    const recs: Recommendation[] = [];

    // Recommendations based on user segment
    if (userSegment === 'new_user') {
      recs.push({
        id: '1',
        type: 'action',
        title: 'Complete Your Profile',
        description: 'Adding more details helps us match you with the right auditors',
        confidence: 0.95,
        actionUrl: '/profile/edit',
        actionLabel: 'Complete Profile'
      });

      recs.push({
        id: '2',
        type: 'resource',
        title: 'Security Audit Guide',
        description: 'Learn the basics of smart contract security auditing',
        confidence: 0.88,
        actionUrl: '/resources/guide',
        actionLabel: 'Read Guide'
      });
    }

    if (userSegment === 'power_user' || userSegment === 'champion') {
      recs.push({
        id: '3',
        type: 'feature',
        title: 'Try Advanced Analytics',
        description: 'Get deeper insights into your audit performance',
        confidence: 0.92,
        actionUrl: '/analytics/advanced',
        actionLabel: 'Explore Analytics'
      });
    }

    // Role-specific recommendations
    if (userType === 'project_owner') {
      recs.push({
        id: '4',
        type: 'auditor',
        title: 'Top Rated Auditors',
        description: 'Discover highly-rated auditors in your technology stack',
        confidence: 0.89,
        metadata: { category: 'ethereum', rating: 4.8 },
        actionUrl: '/auditors/recommended',
        actionLabel: 'View Auditors'
      });
    }

    if (userType === 'auditor') {
      recs.push({
        id: '5',
        type: 'action',
        title: 'Update Availability',
        description: 'Keep your availability current to receive more opportunities',
        confidence: 0.85,
        actionUrl: '/profile/availability',
        actionLabel: 'Update Now'
      });
    }

    // Behavior-based recommendations
    if (behaviorProfile && behaviorProfile.preferredPages.includes('/marketplace')) {
      recs.push({
        id: '6',
        type: 'feature',
        title: 'Saved Searches',
        description: 'Save your marketplace searches to get notified of new matches',
        confidence: 0.78,
        actionUrl: '/marketplace?setup_alerts=true',
        actionLabel: 'Setup Alerts'
      });
    }

    return recs.slice(0, 4); // Limit to 4 recommendations
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'auditor':
        return <User className="h-4 w-4" />;
      case 'resource':
        return <FileText className="h-4 w-4" />;
      case 'action':
        return <TrendingUp className="h-4 w-4" />;
      case 'feature':
        return <Star className="h-4 w-4" />;
      default:
        return <Lightbulb className="h-4 w-4" />;
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'bg-green-500';
    if (confidence >= 0.8) return 'bg-blue-500';
    if (confidence >= 0.7) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  if (!behaviorProfile || behaviorProfile.visitCount < 2) {
    return null; // Don't show recommendations for new visitors
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-primary" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted/60 rounded w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="p-3 border rounded-lg hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-start gap-3">
                  <div className="text-muted-foreground mt-1">
                    {getRecommendationIcon(rec.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{rec.title}</h4>
                      <div className="flex items-center gap-1">
                        <div 
                          className={`w-2 h-2 rounded-full ${getConfidenceColor(rec.confidence)}`}
                          title={`${Math.round(rec.confidence * 100)}% confidence`}
                        />
                        <Badge variant="outline" className="text-xs">
                          {rec.type}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">
                      {rec.description}
                    </p>
                    {rec.actionUrl && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs p-0 h-auto hover:no-underline group-hover:text-primary"
                        asChild
                      >
                        <a href={rec.actionUrl}>
                          {rec.actionLabel}
                          <ArrowRight className="h-3 w-3 ml-1" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
