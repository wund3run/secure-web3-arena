
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import { usePersonalizedRecommendations } from './hooks/usePersonalizedRecommendations';
import { AdaptiveInterfaceProps } from './types';

export function PersonalizedRecommendations({ 
  userSegment, 
  userType, 
  preferences, 
  behaviorProfile,
  isAuthenticated 
}: AdaptiveInterfaceProps) {
  const { 
    getRecommendations, 
    getRecommendationPriority 
  } = usePersonalizedRecommendations({ userSegment, userType, preferences, behaviorProfile });

  const recommendations = getRecommendations();
  const priority = getRecommendationPriority();

  if (!recommendations.length) return null;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-4 w-4" />
          Recommended for You
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recommendations.slice(0, 3).map((recommendation, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <h4 className="font-medium">{recommendation.title}</h4>
                <p className="text-sm text-muted-foreground">{recommendation.description}</p>
                <div className="flex gap-1 mt-2">
                  {recommendation.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button variant="outline" size="sm" asChild>
                <a href={recommendation.href} className="flex items-center gap-1">
                  {recommendation.action}
                  <ArrowRight className="h-3 w-3" />
                </a>
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
