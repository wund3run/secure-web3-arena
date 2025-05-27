
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PersonalizedContent, UserBehavior, UserSegment } from '../types';

interface PersonalizedHeroProps {
  content: PersonalizedContent;
  userSegment: UserSegment;
  userBehavior: UserBehavior | null;
}

export function PersonalizedHero({ content, userSegment, userBehavior }: PersonalizedHeroProps) {
  return (
    <Card className="bg-gradient-to-r from-primary/10 via-primary/5 to-background">
      <CardHeader>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">
            Personalized for {userSegment} users
          </Badge>
          <Badge variant="outline">
            {userBehavior?.pageViews.length || 0} visits
          </Badge>
        </div>
        <CardTitle className="text-2xl">{content.hero.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground mb-4">{content.hero.subtitle}</p>
        <button className="bg-primary text-primary-foreground px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
          {content.hero.cta}
        </button>
      </CardContent>
    </Card>
  );
}
