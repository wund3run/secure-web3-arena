import React from 'react';
import { useAuth } from '@/contexts/auth';
import { PersonalizedRecommendations } from '@/components/recommendations/PersonalizedRecommendations';
import { useUserBehavior } from './hooks/useUserBehavior';
import { generatePersonalizedContent } from './utils/contentGenerator';
import { PersonalizedHero } from './components/PersonalizedHero';
import { PersonalizedFeatures } from './components/PersonalizedFeatures';

export function PersonalizationEngine() {
  const { user } = useAuth();
  const { userBehavior, userSegment } = useUserBehavior();

  const personalizedContent = generatePersonalizedContent(userSegment, userBehavior || {
    pageViews: [],
    timeSpent: {},
    interactions: [],
    lastVisit: new Date().toISOString()
  });

  return (
    <div className="space-y-6">
      <PersonalizedHero 
        content={personalizedContent}
        userSegment={userSegment}
        userBehavior={userBehavior}
      />

      <PersonalizedFeatures content={personalizedContent} />

      <PersonalizedRecommendations 
        userType={(userBehavior?.userType as 'general' | 'auditor' | 'project_owner' | 'admin') || 'general'} 
      />
    </div>
  );
}
