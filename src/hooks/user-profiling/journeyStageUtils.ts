
import { UserBehaviorProfile, UserJourneyProfile, UserJourneyStage } from '@/types/user-profiling';

export const determineJourneyStage = (
  behaviorProfile: UserBehaviorProfile | null,
  userId: string
): UserJourneyProfile => {
  if (!behaviorProfile) {
    return {
      userId,
      currentStage: 'visitor',
      stageHistory: [],
      nextRecommendedActions: ['explore_services', 'learn_about_audits'],
      progressScore: 0,
      blockers: [],
      opportunities: ['first_time_bonus', 'guided_tour']
    };
  }

  const { visitCount, completedActions, engagementScore } = behaviorProfile;
  
  let currentStage: UserJourneyStage = 'visitor';
  
  if (completedActions.includes('audit_completed') || completedActions.includes('multiple_audits')) {
    currentStage = 'advocate';
  } else if (completedActions.includes('audit_payment') || completedActions.includes('service_purchased')) {
    currentStage = 'converter';
  } else if (completedActions.includes('profile_completed') || completedActions.includes('communication_started')) {
    currentStage = 'engager';
  } else if (completedActions.includes('service_comparison') || completedActions.includes('auditor_reviewed')) {
    currentStage = 'evaluator';
  } else if (visitCount > 1 || engagementScore > 10) {
    currentStage = 'explorer';
  }

  const nextActions = getNextRecommendedActions(currentStage, completedActions);
  const opportunities = getOpportunities(currentStage, behaviorProfile);
  const blockers = getBlockers(currentStage, behaviorProfile);

  return {
    userId,
    currentStage,
    stageHistory: [],
    nextRecommendedActions: nextActions,
    progressScore: calculateProgressScore(currentStage, completedActions),
    blockers,
    opportunities
  };
};

const getNextRecommendedActions = (stage: UserJourneyStage, completedActions: string[]): string[] => {
  switch (stage) {
    case 'visitor':
      return ['explore_services', 'learn_about_security'];
    case 'explorer':
      return ['create_account', 'request_audit', 'browse_auditors'];
    case 'evaluator':
      return ['compare_services', 'read_reviews', 'contact_auditor'];
    case 'engager':
      return ['complete_profile', 'start_first_audit'];
    case 'converter':
      return ['leave_review', 'request_follow_up'];
    case 'advocate':
      return ['refer_others', 'become_auditor'];
    default:
      return [];
  }
};

const getOpportunities = (stage: UserJourneyStage, profile: UserBehaviorProfile): string[] => {
  const opportunities = [];
  
  if (stage === 'visitor') opportunities.push('welcome_bonus');
  if (stage === 'explorer') opportunities.push('guided_tour');
  if (profile.engagementScore > 50) opportunities.push('premium_features');
  if (profile.visitCount > 10) opportunities.push('loyalty_program');
  
  return opportunities;
};

const getBlockers = (stage: UserJourneyStage, profile: UserBehaviorProfile): string[] => {
  const blockers = [];
  
  if (stage === 'visitor' && profile.visitCount > 3) blockers.push('unclear_value_prop');
  if (stage === 'explorer' && profile.averageSessionDuration < 60) blockers.push('complex_interface');
  if (stage === 'evaluator' && !profile.completedActions.includes('account_created')) {
    blockers.push('registration_barrier');
  }
  
  return blockers;
};

const calculateProgressScore = (stage: UserJourneyStage, completedActions: string[]): number => {
  const stageScores = {
    visitor: 10,
    explorer: 25,
    evaluator: 45,
    engager: 65,
    converter: 85,
    advocate: 100,
    power_user: 100
  };
  
  const baseScore = stageScores[stage];
  const actionBonus = completedActions.length * 5;
  
  return Math.min(100, baseScore + actionBonus);
};
