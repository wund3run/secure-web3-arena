
import { User } from '@supabase/supabase-js';
import type { UserProfile } from '../types';

export const getUserType = (
  user: User | null,
  userProfile: UserProfile | null
): 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor' => {
  // Since user_type is no longer in profile, we'll use metadata as fallback
  // In a real implementation, you'd fetch from user_roles table
  if (user?.user_metadata?.user_type) {
    return user.user_metadata.user_type as 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor';
  }
  return user?.user_metadata?.user_type || 'project_owner';
};
