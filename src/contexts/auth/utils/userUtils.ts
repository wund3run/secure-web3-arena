
import { User } from '@supabase/supabase-js';
import type { UserProfile } from '../types';

export const getUserType = (
  user: User | null,
  userProfile: UserProfile | null
): 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor' => {
  if (userProfile?.user_type) {
    return userProfile.user_type as 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor';
  }
  return user?.user_metadata?.user_type || 'project_owner';
};
