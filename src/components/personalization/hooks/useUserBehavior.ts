
import { useState, useEffect } from 'react';
import { analyticsTracker } from '@/utils/analytics-tracker';
import { UserBehavior, UserSegment } from '../types';

export function useUserBehavior() {
  const [userBehavior, setUserBehavior] = useState<UserBehavior | null>(null);
  const [userSegment, setUserSegment] = useState<UserSegment>('new');

  const loadUserBehavior = (): UserBehavior => {
    try {
      const stored = localStorage.getItem('hawkly_user_behavior');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load user behavior:', error);
    }
    
    return {
      pageViews: [],
      timeSpent: {},
      interactions: [],
      lastVisit: new Date().toISOString()
    };
  };

  const determineUserSegment = (behavior: UserBehavior): UserSegment => {
    if (!behavior.pageViews.length) return 'new';
    
    const totalPageViews = behavior.pageViews.length;
    const totalTimeSpent = Object.values(behavior.timeSpent).reduce((sum, time) => sum + time, 0);
    const hasInteractions = behavior.interactions.length > 0;
    
    if (totalPageViews > 50 && totalTimeSpent > 3600000) return 'enterprise'; // 1+ hour
    if (totalPageViews > 20 && hasInteractions) return 'power';
    if (totalPageViews > 5) return 'returning';
    
    return 'new';
  };

  useEffect(() => {
    const behavior = loadUserBehavior();
    setUserBehavior(behavior);
    
    const segment = determineUserSegment(behavior);
    setUserSegment(segment);
    
    analyticsTracker.track('personalization', 'content_generated', { segment });
  }, []);

  return {
    userBehavior,
    userSegment
  };
}
