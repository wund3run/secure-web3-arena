
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PersonalizedContent } from '../types';

interface PersonalizedFeaturesProps {
  content: PersonalizedContent;
}

export function PersonalizedFeatures({ content }: PersonalizedFeaturesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {content.features.map((feature, index) => (
        <Card key={index}>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              {feature.icon}
              <CardTitle className="text-lg">{feature.title}</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
