
import { User } from '@supabase/supabase-js';
import { UserProfile } from '../types';

export const getUserType = (
  user: User | null,
  userProfile?: UserProfile | null
): 'auditor' | 'project_owner' | 'admin' | 'general' | 'visitor' => {
  if (!user) return 'visitor';
  
  // Check userProfile first
  if (userProfile?.user_type) {
    return userProfile.user_type;
  }
  
  // Fall back to user metadata
  return user.user_metadata?.user_type || 'general';
};

export const getDisplayName = (
  user: User | null,
  userProfile?: UserProfile | null
): string => {
  if (!user) return 'Guest';
  
  return userProfile?.display_name || 
         userProfile?.full_name || 
         user.email?.split('@')[0] || 
         'User';
};

export const getUserInitials = (
  user: User | null,
  userProfile?: UserProfile | null
): string => {
  const displayName = getDisplayName(user, userProfile);
  return displayName.split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};
