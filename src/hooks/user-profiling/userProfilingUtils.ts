
import { UserBehaviorProfile } from '@/types/user-profiling';

export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

export function createDefaultBehaviorProfile(userId?: string): UserBehaviorProfile {
  return {
    id: crypto.randomUUID(),
    userId: userId || 'anonymous',
    visitCount: 0,
    lastVisit: new Date().toISOString(),
    averageSessionDuration: 0,
    mostVisitedPages: [],
    completedActions: [],
    abandonedFunnels: [],
    deviceType: getDeviceType(),
    referralSource: document.referrer || 'direct',
    engagementScore: 0,
    conversionLikelihood: 0,
    preferredContent: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}

export function getUserSegment(
  behaviorProfile: UserBehaviorProfile | null,
  userType?: string
): string {
  if (!behaviorProfile) return 'new_visitor';
  
  const engagementScore = behaviorProfile.engagementScore;
  const visitCount = behaviorProfile.visitCount;
  
  if (userType === 'auditor' && engagementScore > 70) return 'active_auditor';
  if (userType === 'project_owner' && visitCount > 10) return 'returning_client';
  if (visitCount === 1) return 'first_time_visitor';
  if (visitCount > 5 && engagementScore < 30) return 'browsing_prospect';
  
  return 'general_user';
}
