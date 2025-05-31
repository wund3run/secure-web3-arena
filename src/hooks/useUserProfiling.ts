
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/auth';
import { UserPreferences, UserJourneyProfile } from '@/types/user-profiling';
import { toast } from 'sonner';
import { 
  getLocalPreferences, 
  getLocalBehaviorProfile, 
  savePreferences 
} from './user-profiling/useLocalStorage';
import { getUserSegment } from './user-profiling/userProfilingUtils';
import { determineJourneyStage } from './user-profiling/journeyStageUtils';
import { useBehaviorTracking } from './user-profiling/useBehaviorTracking';

export function useUserProfiling() {
  const { user, userProfile } = useAuth();
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [journeyProfile, setJourneyProfile] = useState<UserJourneyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const { behaviorProfile, setBehaviorProfile, trackBehavior } = useBehaviorTracking(user?.id);

  // Load user profiling data
  useEffect(() => {
    if (user) {
      loadUserProfilingData();
    } else {
      // For anonymous users, load from localStorage
      loadAnonymousProfile();
    }
  }, [user]);

  const loadUserProfilingData = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      // Load preferences from localStorage as fallback
      const localPrefs = getLocalPreferences();
      if (localPrefs) {
        setPreferences(localPrefs);
      }

      // Load behavior profile from localStorage
      const behaviorData = getLocalBehaviorProfile();
      if (behaviorData) {
        setBehaviorProfile(behaviorData);
      }

      // Determine journey stage
      const journeyData = determineJourneyStage(behaviorData, user.id);
      setJourneyProfile(journeyData);

    } catch (error) {
      console.error('Error loading user profiling data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadAnonymousProfile = () => {
    const localPrefs = getLocalPreferences();
    const behaviorData = getLocalBehaviorProfile();
    
    if (localPrefs) setPreferences(localPrefs);
    if (behaviorData) setBehaviorProfile(behaviorData);
    
    setLoading(false);
  };

  const updatePreferences = async (updates: Partial<UserPreferences>) => {
    const updatedPrefs: UserPreferences = {
      ...preferences,
      ...updates,
      id: preferences?.id || crypto.randomUUID(),
      userId: user?.id || 'anonymous',
      updatedAt: new Date().toISOString(),
      createdAt: preferences?.createdAt || new Date().toISOString(),
    } as UserPreferences;

    setPreferences(updatedPrefs);
    savePreferences(updatedPrefs);
    
    toast.success('Preferences updated successfully');
  };

  const getSegment = () => {
    return getUserSegment(behaviorProfile, userProfile?.user_type);
  };

  return {
    preferences,
    behaviorProfile,
    journeyProfile,
    loading,
    updatePreferences,
    trackBehavior,
    getUserSegment: getSegment,
    getRecommendedActions: () => journeyProfile?.nextRecommendedActions || [],
    getOpportunities: () => journeyProfile?.opportunities || [],
  };
}
