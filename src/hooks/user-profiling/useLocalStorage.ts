
import { UserPreferences, UserBehaviorProfile } from '@/types/user-profiling';

const PREFERENCES_KEY = 'hawkly_user_preferences';
const BEHAVIOR_KEY = 'hawkly_user_behavior';

export const getLocalPreferences = (): UserPreferences | null => {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to load preferences from localStorage:', error);
    return null;
  }
};

export const savePreferences = (preferences: UserPreferences): void => {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.warn('Failed to save preferences to localStorage:', error);
  }
};

export const getBehaviorProfile = (): UserBehaviorProfile | null => {
  try {
    const stored = localStorage.getItem(BEHAVIOR_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.warn('Failed to load behavior profile from localStorage:', error);
    return null;
  }
};

export const saveBehaviorProfile = (profile: UserBehaviorProfile): void => {
  try {
    localStorage.setItem(BEHAVIOR_KEY, JSON.stringify(profile));
  } catch (error) {
    console.warn('Failed to save behavior profile to localStorage:', error);
  }
};
