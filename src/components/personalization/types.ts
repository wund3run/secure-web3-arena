
import React from 'react';

export interface UserBehavior {
  pageViews: string[];
  timeSpent: Record<string, number>;
  interactions: string[];
  lastVisit: string;
  userType?: string;
}

export interface PersonalizedContent {
  hero: {
    title: string;
    subtitle: string;
    cta: string;
  };
  features: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
    priority: number;
  }>;
  recommendations: Array<{
    type: string;
    content: string;
    action: string;
  }>;
}

export type UserSegment = 'new' | 'returning' | 'power' | 'enterprise';
