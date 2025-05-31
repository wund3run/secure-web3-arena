
import { UserBehaviorProfile } from '@/types/user-profiling';

export const getUserSegment = (
  behaviorProfile: UserBehaviorProfile | null,
  userType?: string
): string => {
  if (!behaviorProfile) return 'first_time_visitor';
  
  const { visitCount, engagementScore, completedActions } = behaviorProfile;
  
  // First time visitors
  if (visitCount <= 1) return 'first_time_visitor';
  
  // Explorer segment
  if (visitCount <= 5 && engagementScore < 30) return 'explorer';
  
  // Returning clients
  if (userType === 'project_owner' && completedActions.includes('audit_request_created')) {
    return 'returning_client';
  }
  
  // Active auditors
  if (userType === 'auditor' && completedActions.includes('audit_completed')) {
    return 'active_auditor';
  }
  
  // Power users
  if (visitCount > 20 && engagementScore > 70) return 'power_user';
  
  return 'returning_visitor';
};
