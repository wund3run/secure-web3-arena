
import { useState } from 'react';
import { UserBehaviorProfile } from '@/types/user-profiling';
import { createDefaultBehaviorProfile } from './userProfilingUtils';
import { saveBehaviorProfile } from './useLocalStorage';

export function useBehaviorTracking(userId?: string) {
  const [behaviorProfile, setBehaviorProfile] = useState<UserBehaviorProfile | null>(null);

  const trackBehavior = (action: string, metadata?: Record<string, any>) => {
    const currentBehavior = behaviorProfile || createDefaultBehaviorProfile(userId);
    
    const updatedBehavior: UserBehaviorProfile = {
      ...currentBehavior,
      lastVisit: new Date().toISOString(),
      visitCount: currentBehavior.visitCount + 1,
      completedActions: [...currentBehavior.completedActions, action],
      updatedAt: new Date().toISOString(),
    };

    // Track page visit
    if (action === 'page_visit' && metadata?.page) {
      const page = metadata.page;
      const updatedPages = [...updatedBehavior.mostVisitedPages];
      if (!updatedPages.includes(page)) {
        updatedPages.push(page);
      }
      updatedBehavior.mostVisitedPages = updatedPages.slice(-10); // Keep last 10
    }

    setBehaviorProfile(updatedBehavior);
    saveBehaviorProfile(updatedBehavior);
  };

  return {
    behaviorProfile,
    setBehaviorProfile,
    trackBehavior,
  };
}
