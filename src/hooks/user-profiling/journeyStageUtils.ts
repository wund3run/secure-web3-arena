
import { UserJourneyProfile, UserJourneyStage, UserBehaviorProfile } from '@/types/user-profiling';

export function getRecommendedActions(stage: UserJourneyStage): string[] {
  switch (stage) {
    case 'visitor':
      return ['explore_services', 'view_how_it_works', 'read_testimonials'];
    case 'explorer':
      return ['view_auditor_profiles', 'check_pricing', 'read_case_studies'];
    case 'evaluator':
      return ['start_onboarding', 'contact_auditor', 'request_quote'];
    case 'engager':
      return ['complete_profile', 'submit_audit_request', 'schedule_consultation'];
    case 'converter':
      return ['leave_review', 'refer_friend', 'explore_additional_services'];
    case 'advocate':
      return ['join_beta_program', 'provide_feedback', 'become_affiliate'];
    case 'power_user':
      return ['access_advanced_features', 'mentor_new_users', 'suggest_improvements'];
    default:
      return [];
  }
}

export function getOpportunities(stage: UserJourneyStage): string[] {
  switch (stage) {
    case 'visitor':
      return ['personalized_welcome', 'guided_tour', 'free_consultation'];
    case 'explorer':
      return ['comparison_tool', 'expert_recommendations', 'live_chat_support'];
    case 'evaluator':
      return ['trial_offer', 'money_back_guarantee', 'testimonial_showcase'];
    default:
      return [];
  }
}

export function determineJourneyStage(
  behaviorProfile: UserBehaviorProfile | null,
  userId?: string
): UserJourneyProfile {
  const actions = behaviorProfile?.completedActions || [];
  const visitCount = behaviorProfile?.visitCount || 0;
  
  let stage: UserJourneyStage = 'visitor';
  let progressScore = 0;

  if (visitCount >= 5) {
    stage = 'explorer';
    progressScore = 20;
  }
  
  if (actions.includes('viewed_auditor_profile') || actions.includes('viewed_service_details')) {
    stage = 'evaluator';
    progressScore = 40;
  }
  
  if (actions.includes('started_onboarding') || actions.includes('contacted_provider')) {
    stage = 'engager';
    progressScore = 60;
  }
  
  if (actions.includes('completed_audit_request') || actions.includes('made_payment')) {
    stage = 'converter';
    progressScore = 80;
  }
  
  if (actions.filter(a => a.includes('completed')).length >= 3) {
    stage = 'advocate';
    progressScore = 90;
  }
  
  if (visitCount >= 50 && actions.length >= 20) {
    stage = 'power_user';
    progressScore = 100;
  }

  return {
    userId: userId || 'anonymous',
    currentStage: stage,
    stageHistory: [],
    nextRecommendedActions: getRecommendedActions(stage),
    progressScore,
    blockers: [],
    opportunities: getOpportunities(stage),
  };
}
