
import { useState, useEffect, useCallback } from 'react';
import { UserBehaviorProfile } from '@/types/user-profiling';
import { saveBehaviorProfile } from './useLocalStorage';

export const useBehaviorTracking = (userId?: string) => {
  const [behaviorProfile, setBehaviorProfile] = useState<UserBehaviorProfile | null>(null);

  const trackBehavior = useCallback((action: string, page?: string) => {
    setBehaviorProfile(current => {
      if (!current) return current;
      
      const updated = {
        ...current,
        completedActions: [...new Set([...current.completedActions, action])],
        mostVisitedPages: page 
          ? [...new Set([...current.mostVisitedPages, page])]
          : current.mostVisitedPages,
        engagementScore: current.engagementScore + 1,
        lastVisit: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      saveBehaviorProfile(updated);
      return updated;
    });
  }, []);

  return {
    behaviorProfile,
    setBehaviorProfile,
    trackBehavior
  };
};
