
import { UserPreferences, UserBehaviorProfile } from '@/types/user-profiling';

const PREFERENCES_KEY = 'hawkly_user_preferences';
const BEHAVIOR_KEY = 'hawkly_behavior_profile';

export const getLocalPreferences = (): UserPreferences | null => {
  try {
    const stored = localStorage.getItem(PREFERENCES_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading preferences:', error);
    return null;
  }
};

export const savePreferences = (preferences: UserPreferences): void => {
  try {
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving preferences:', error);
  }
};

export const getLocalBehaviorProfile = (): UserBehaviorProfile | null => {
  try {
    const stored = localStorage.getItem(BEHAVIOR_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    console.error('Error loading behavior profile:', error);
    return null;
  }
};

export const saveBehaviorProfile = (profile: UserBehaviorProfile): void => {
  try {
    localStorage.setItem(BEHAVIOR_KEY, JSON.stringify(profile));
  } catch (error) {
    console.error('Error saving behavior profile:', error);
  }
};
