
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lightbulb, TrendingUp, Users, Target } from 'lucide-react';
import { AdaptiveInterfaceProps } from './types';

export function PersonalizedRecommendations({ 
  userSegment, 
  userType, 
  preferences, 
  behaviorProfile 
}: AdaptiveInterfaceProps) {
  
  const getRecommendations = () => {
    const recommendations = [];
    
    switch (userSegment) {
      case 'new_user':
        recommendations.push({
          id: 'complete-profile',
          title: 'Complete Your Profile',
          description: 'Add more details to get better matches',
          icon: Users,
          priority: 'high',
          action: 'Complete Now'
        });
        break;
        
      case 'regular_user':
        recommendations.push({
          id: 'explore-features',
          title: 'Try Advanced Features',
          description: 'Discover powerful tools to improve your workflow',
          icon: TrendingUp,
          priority: 'medium',
          action: 'Explore'
        });
        break;
        
      case 'power_user':
        recommendations.push({
          id: 'api-access',
          title: 'API Integration',
          description: 'Automate your workflow with our API',
          icon: Target,
          priority: 'low',
          action: 'Learn More'
        });
        break;
        
      case 'at_risk':
        recommendations.push({
          id: 'special-offer',
          title: 'Welcome Back Offer',
          description: 'Special discount on your next audit',
          icon: Lightbulb,
          priority: 'high',
          action: 'Claim Offer'
        });
        break;
    }
    
    return recommendations;
  };

  const recommendations = getRecommendations();
  
  if (recommendations.length === 0) return null;

  return (
    <Card className="adaptive-recommendations">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Personalized for You
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec) => {
          const IconComponent = rec.icon;
          return (
            <div key={rec.id} className="flex items-center justify-between p-3 border rounded-lg">
              <div className="flex items-center gap-3">
                <IconComponent className="h-4 w-4 text-primary" />
                <div>
                  <h4 className="font-medium">{rec.title}</h4>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={rec.priority === 'high' ? 'default' : 'secondary'}>
                  {rec.priority}
                </Badge>
                <Button size="sm" variant="outline">
                  {rec.action}
                </Button>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
