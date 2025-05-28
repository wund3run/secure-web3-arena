
import React from 'react';
import { useAuth } from '@/contexts/auth/AuthContext';
import { PersonalizedRecommendations } from '@/components/recommendations/PersonalizedRecommendations';
import { useUserBehavior } from './hooks/useUserBehavior';
import { generatePersonalizedContent } from './utils/contentGenerator';
import { PersonalizedHero } from './components/PersonalizedHero';
import { PersonalizedFeatures } from './components/PersonalizedFeatures';

export function PersonalizationEngine() {
  const { user, getUserType } = useAuth();
  const { userBehavior, userSegment } = useUserBehavior();

  const personalizedContent = generatePersonalizedContent(userSegment, userBehavior || {
    pageViews: [],
    timeSpent: {},
    interactions: [],
    lastVisit: new Date().toISOString()
  });

  const userType = getUserType();

  return (
    <div className="space-y-6">
      <PersonalizedHero 
        content={personalizedContent}
        userSegment={userSegment}
        userBehavior={userBehavior}
      />

      <PersonalizedFeatures content={personalizedContent} />

      <PersonalizedRecommendations 
        userType={userType || 'general'} 
      />
    </div>
  );
}
