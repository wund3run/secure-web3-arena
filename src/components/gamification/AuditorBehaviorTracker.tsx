import React, { useEffect, useRef } from 'react';
import { GamificationService, XPAction, XP_VALUES } from '@/services/gamificationService';
import { useGamificationNotifications } from './GamificationNotifications';
import { useAuth } from '@/contexts/auth';

interface AuditorBehaviorTrackerProps {
  children: React.ReactNode;
}

// Behavior tracking events
interface BehaviorEvent {
  type: 'audit_action' | 'tool_usage' | 'learning' | 'community' | 'platform_engagement';
  action: XPAction;
  metadata?: Record<string, any>;
  timestamp: number;
}

// Global behavior tracking service
class BehaviorTrackingService {
  private static instance: BehaviorTrackingService;
  private events: BehaviorEvent[] = [];
  private sessionStartTime: number = Date.now();
  private lastActivityTime: number = Date.now();
  private listeners: ((event: BehaviorEvent) => void)[] = [];

  static getInstance(): BehaviorTrackingService {
    if (!BehaviorTrackingService.instance) {
      BehaviorTrackingService.instance = new BehaviorTrackingService();
    }
    return BehaviorTrackingService.instance;
  }

  addListener(listener: (event: BehaviorEvent) => void) {
    this.listeners.push(listener);
  }

  removeListener(listener: (event: BehaviorEvent) => void) {
    this.listeners = this.listeners.filter(l => l !== listener);
  }

  trackEvent(type: BehaviorEvent['type'], action: XPAction, metadata?: Record<string, any>) {
    const event: BehaviorEvent = {
      type,
      action,
      metadata,
      timestamp: Date.now()
    };

    this.events.push(event);
    this.lastActivityTime = Date.now();
    
    // Notify listeners
    this.listeners.forEach(listener => listener(event));

    // Store in session storage for persistence
    this.persistEvents();
  }

  private persistEvents() {
    const sessionData = {
      events: this.events.slice(-100), // Keep last 100 events
      sessionStartTime: this.sessionStartTime,
      lastActivityTime: this.lastActivityTime
    };
    sessionStorage.setItem('auditor_behavior_session', JSON.stringify(sessionData));
  }

  private loadPersistedEvents() {
    const sessionData = sessionStorage.getItem('auditor_behavior_session');
    if (sessionData) {
      try {
        const parsed = JSON.parse(sessionData);
        this.events = parsed.events || [];
        this.sessionStartTime = parsed.sessionStartTime || Date.now();
        this.lastActivityTime = parsed.lastActivityTime || Date.now();
      } catch (error) {
        console.error('Error loading persisted behavior events:', error);
      }
    }
  }

  getSessionStats() {
    const now = Date.now();
    const sessionDuration = now - this.sessionStartTime;
    const timeSinceLastActivity = now - this.lastActivityTime;
    
    return {
      sessionDuration,
      timeSinceLastActivity,
      eventsCount: this.events.length,
      isActiveSession: timeSinceLastActivity < 5 * 60 * 1000, // 5 minutes
      events: this.events
    };
  }

  // Pattern detection methods
  detectEarlyBirdPattern(): boolean {
    const hour = new Date().getHours();
    return hour >= 6 && hour <= 9;
  }

  detectNightOwlPattern(): boolean {
    const hour = new Date().getHours();
    return hour >= 22 || hour <= 2;
  }

  detectWeekendWarriorPattern(): boolean {
    const day = new Date().getDay();
    return day === 0 || day === 6; // Sunday or Saturday
  }

  detectProductivitySpurt(): boolean {
    const recentEvents = this.events.filter(e => Date.now() - e.timestamp < 30 * 60 * 1000); // Last 30 minutes
    return recentEvents.length >= 10;
  }

  detectLearningStreak(): boolean {
    const learningEvents = this.events.filter(e => 
      e.type === 'learning' && Date.now() - e.timestamp < 24 * 60 * 60 * 1000
    );
    return learningEvents.length >= 5;
  }

  init() {
    this.loadPersistedEvents();
  }
}

const AuditorBehaviorTracker: React.FC<AuditorBehaviorTrackerProps> = ({ children }) => {
  const { user } = useAuth();
  const {
    showXPGained,
    showLevelUp,
    showBadgeEarned,
    showStreakMilestone,
    showSurpriseReward
  } = useGamificationNotifications();
  
  const behaviorService = useRef(BehaviorTrackingService.getInstance());
  const lastPatternCheck = useRef(0);
  const sessionBonusAwarded = useRef(false);

  useEffect(() => {
    if (!user?.id) return;

    behaviorService.current.init();

    // Award daily login bonus
    const awardDailyLogin = async () => {
      try {
        await GamificationService.awardXP(user.id, XPAction.DAILY_LOGIN);
        showXPGained(XP_VALUES[XPAction.DAILY_LOGIN], 'Daily login bonus!');
        
        // Check for early bird or night owl bonus  
        if (behaviorService.current.detectEarlyBirdPattern()) {
          await GamificationService.awardXP(user.id, XPAction.EARLY_DELIVERY);
          showXPGained(XP_VALUES[XPAction.EARLY_DELIVERY], 'Early bird bonus! 🌅');
        }

        // Weekend warrior bonus
        if (behaviorService.current.detectWeekendWarriorPattern()) {
          await GamificationService.awardXP(user.id, XPAction.WEEKLY_GOALS_MET);
          showXPGained(XP_VALUES[XPAction.WEEKLY_GOALS_MET], 'Weekend warrior bonus! 💪');
        }

      } catch (error) {
        console.error('Error awarding daily login bonus:', error);
      }
    };

    // Award login bonus (debounced to once per session)
    if (!sessionBonusAwarded.current) {
      awardDailyLogin();
      sessionBonusAwarded.current = true;
    }

    // Behavior event listener
    const handleBehaviorEvent = async (event: BehaviorEvent) => {
      try {
        await GamificationService.awardXP(user.id, event.action, event.metadata);
        
        // Show appropriate notification based on action
        const xpAwarded = XP_VALUES[event.action];
        if (xpAwarded > 100) {
          showXPGained(xpAwarded, `Great work! ${getActionDescription(event.action)}`);
        }

        // Check for patterns periodically (every 5 minutes)
        const now = Date.now();
        if (now - lastPatternCheck.current > 5 * 60 * 1000) {
          checkForPatterns();
          lastPatternCheck.current = now;
        }

      } catch (error) {
        console.error('Error processing behavior event:', error);
      }
    };

    // Pattern detection and bonus awards
    const checkForPatterns = async () => {
      if (behaviorService.current.detectProductivitySpurt()) {
        await GamificationService.awardXP(user.id, XPAction.STREAK_MILESTONE);
        showSurpriseReward('Productivity Spurt! You\'re on fire! Keep up the great work!');
      }

      if (behaviorService.current.detectLearningStreak()) {
        await GamificationService.awardXP(user.id, XPAction.KNOWLEDGE_SHARING);
        showStreakMilestone(5);
      }
    };

    behaviorService.current.addListener(handleBehaviorEvent);

    // Global event tracking setup
    setupGlobalTracking();

    return () => {
      behaviorService.current.removeListener(handleBehaviorEvent);
    };
  }, [user?.id, showXPGained, showLevelUp, showBadgeEarned, showStreakMilestone, showSurpriseReward]);

  const setupGlobalTracking = () => {
    // Track page visibility changes
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        trackBehavior('platform_engagement', XPAction.DAILY_LOGIN);
      }
    };

    // Track form submissions
    const handleFormSubmit = (event: Event) => {
      const form = event.target as HTMLFormElement;
      const formId = form.id || form.className;
      
      if (formId.includes('audit')) {
        trackBehavior('audit_action', XPAction.AUDIT_COMPLETED);
      } else if (formId.includes('profile')) {
        trackBehavior('platform_engagement', XPAction.PROFILE_UPDATED);
      }
    };

    // Track important button clicks
    const handleButtonClick = (event: Event) => {
      const button = event.target as HTMLButtonElement;
      const buttonText = button.textContent?.toLowerCase() || '';
      const buttonId = button.id || button.className;

      // Learning/research activities
      if (buttonText.includes('learn') || buttonText.includes('documentation') || buttonText.includes('guide')) {
        trackBehavior('learning', XPAction.RESEARCH_CONTRIBUTION);
      }
      
      // Community engagement
      if (buttonText.includes('help') || buttonText.includes('forum') || buttonText.includes('answer')) {
        trackBehavior('community', XPAction.FORUM_CONTRIBUTION);
      }
    };

    // Track file uploads (audit deliverables)
    const handleFileUpload = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        trackBehavior('audit_action', XPAction.DELIVERABLE_SUBMITTED, { fileCount: input.files.length });
      }
    };

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('submit', handleFormSubmit);
    document.addEventListener('click', handleButtonClick);
    document.addEventListener('change', handleFileUpload);

    // Cleanup function
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('click', handleButtonClick);
      document.removeEventListener('change', handleFileUpload);
    };
  };

  const trackBehavior = (type: BehaviorEvent['type'], action: XPAction, metadata?: Record<string, any>) => {
    behaviorService.current.trackEvent(type, action, metadata);
  };

  const getActionDescription = (action: XPAction): string => {
    const descriptions: Record<XPAction, string> = {
      [XPAction.AUDIT_COMPLETED]: 'Audit completed successfully!',
      [XPAction.FINDING_REPORTED]: 'Finding documented!',
      [XPAction.CRITICAL_FINDING]: 'Critical issue discovered!',
      [XPAction.HIGH_FINDING]: 'High severity issue found!',
      [XPAction.MILESTONE_COMPLETED]: 'Milestone achieved!',
      [XPAction.DELIVERABLE_SUBMITTED]: 'Deliverable submitted!',
      [XPAction.PERFECT_AUDIT_SCORE]: 'Perfect audit score!',
      [XPAction.EARLY_DELIVERY]: 'Early delivery bonus!',
      [XPAction.CLIENT_SATISFACTION_HIGH]: 'Client satisfaction high!',
      [XPAction.ZERO_DEFECTS]: 'Zero defects achieved!',
      [XPAction.CERTIFICATION_EARNED]: 'Certification earned!',
      [XPAction.SKILL_ASSESSMENT_PASSED]: 'Skill assessment passed!',
      [XPAction.RESEARCH_CONTRIBUTION]: 'Research contribution made!',
      [XPAction.KNOWLEDGE_SHARING]: 'Knowledge shared with community!',
      [XPAction.DAILY_LOGIN]: 'Daily activity bonus!',
      [XPAction.WEEKLY_GOALS_MET]: 'Weekly goals completed!',
      [XPAction.STREAK_MILESTONE]: 'Streak milestone achieved!',
      [XPAction.PROFILE_UPDATED]: 'Profile enhancement!',
      [XPAction.MENTORSHIP_PROVIDED]: 'Mentorship provided!',
      [XPAction.PEER_REVIEW]: 'Peer review completed!',
      [XPAction.FORUM_CONTRIBUTION]: 'Forum contribution made!',
      [XPAction.BEST_PRACTICE_SHARED]: 'Best practice shared!',
      [XPAction.TOOL_IMPROVEMENT_SUGGESTED]: 'Tool improvement suggested!',
      [XPAction.AUTOMATION_IMPLEMENTED]: 'Automation implemented!',
      [XPAction.PROCESS_OPTIMIZATION]: 'Process optimized!',
      [XPAction.CLIENT_FEEDBACK_POSITIVE]: 'Positive client feedback!',
      [XPAction.REPEAT_CLIENT]: 'Repeat client secured!',
      [XPAction.REFERRAL_GENERATED]: 'Referral generated!'
    };

    return descriptions[action] || 'Great work!';
  };

  // Expose tracking functions to child components via context or ref
  React.useEffect(() => {
    // Make tracking functions available globally
    (window as any).trackAuditorBehavior = trackBehavior;
  }, []);

  return <>{children}</>;
};

// Hook for components to track behavior
export const useAuditorBehaviorTracking = () => {
  const trackBehavior = (type: BehaviorEvent['type'], action: XPAction, metadata?: Record<string, any>) => {
    const service = BehaviorTrackingService.getInstance();
    service.trackEvent(type, action, metadata);
  };

  const trackAuditAction = (action: XPAction, metadata?: Record<string, any>) => {
    trackBehavior('audit_action', action, metadata);
  };

  const trackToolUsage = (toolName: string, metadata?: Record<string, any>) => {
    trackBehavior('tool_usage', XPAction.TOOL_IMPROVEMENT_SUGGESTED, { toolName, ...metadata });
  };

  const trackLearning = (action: XPAction, metadata?: Record<string, any>) => {
    trackBehavior('learning', action, metadata);
  };

  const trackCommunityEngagement = (action: XPAction, metadata?: Record<string, any>) => {
    trackBehavior('community', action, metadata);
  };

  const trackPlatformEngagement = (action: XPAction, metadata?: Record<string, any>) => {
    trackBehavior('platform_engagement', action, metadata);
  };

  return {
    trackBehavior,
    trackAuditAction,
    trackToolUsage,
    trackLearning,
    trackCommunityEngagement,
    trackPlatformEngagement
  };
};

export default AuditorBehaviorTracker; 