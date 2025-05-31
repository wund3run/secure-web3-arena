
import { UserPreferences, UserBehaviorProfile } from '@/types/user-profiling';

export function getLocalPreferences(): UserPreferences | null {
  try {
    const stored = localStorage.getItem('hawkly_user_preferences');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function getLocalBehaviorProfile(): UserBehaviorProfile | null {
  try {
    const stored = localStorage.getItem('hawkly_behavior_profile');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function savePreferences(preferences: UserPreferences): void {
  localStorage.setItem('hawkly_user_preferences', JSON.stringify(preferences));
}

export function saveBehaviorProfile(behaviorProfile: UserBehaviorProfile): void {
  localStorage.setItem('hawkly_behavior_profile', JSON.stringify(behaviorProfile));
}
