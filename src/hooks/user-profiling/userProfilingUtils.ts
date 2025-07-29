
import { UserBehaviorProfile } from '@/types/user-profiling';

export const getUserSegment = (
  behaviorProfile: UserBehaviorProfile | null, 
  userType?: string
): string => {
  if (!behaviorProfile) return 'first_time_visitor';
  
  const { visitCount, engagementScore, completedActions } = behaviorProfile;
  
  // Determine segment based on behavior patterns
  if (visitCount === 1) return 'first_time_visitor';
  if (visitCount < 5) return 'browsing_prospect';
  if (completedActions.includes('audit_request_created')) return 'returning_client';
  if (userType === 'auditor' && engagementScore > 50) return 'active_auditor';
  if (visitCount > 20 && engagementScore > 100) return 'power_user';
  
  return 'returning_visitor';
};
