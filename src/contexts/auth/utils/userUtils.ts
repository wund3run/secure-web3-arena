
import { User } from '@supabase/supabase-js';
import { UserProfile } from '../types';

export function getUserType(user: User | null, userProfile: UserProfile | null): 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor' {
  if (!user) return 'visitor';
  
  // Check userProfile first
  if (userProfile?.user_type) {
    return userProfile.user_type;
  }
  
  // Fall back to user metadata
  return user.user_metadata?.user_type || 'project_owner';
}
