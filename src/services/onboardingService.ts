import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  optional?: boolean;
  priority: number;
}

export interface OnboardingProgress {
  isNewUser: boolean;
  hasProfile: boolean;
  hasApplications: boolean;
  hasCompletedAudits: boolean;
  progressPercentage: number;
  nextStep?: OnboardingStep;
}

export class OnboardingService {
  /**
   * Check comprehensive onboarding status for a new auditor
   */
  static async checkOnboardingStatus(userId: string): Promise<OnboardingProgress> {
    try {
      // Check if auditor profile exists and is complete
      const { data: profile, error: profileError } = await supabase
        .from('auditor_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching auditor profile:', profileError);
      }

      // Check if user has applied to any projects
      const { data: applications, error: appError } = await supabase
        .from('audit_proposals')
        .select('id')
        .eq('auditor_id', userId)
        .limit(1);

      if (appError) {
        console.error('Error fetching applications:', appError);
      }

      // Check if user has any completed audits
      const { data: completedAudits, error: auditError } = await supabase
        .from('audit_requests')
        .select('id')
        .eq('assigned_auditor_id', userId)
        .eq('status', 'completed')
        .limit(1);

      if (auditError) {
        console.error('Error fetching completed audits:', auditError);
      }

      const hasProfile = !!profile && !!profile.years_experience && profile.years_experience > 0;
      const hasApplications = (applications?.length || 0) > 0;
      const hasCompletedAudits = (completedAudits?.length || 0) > 0;
      const isNewUser = !hasProfile;

      // Calculate progress based on core onboarding steps
      const coreSteps = [
        { completed: hasProfile, weight: 60 }, // Profile completion is most important
        { completed: hasApplications, weight: 40 }, // First application
      ];

      const totalWeight = coreSteps.reduce((sum, step) => sum + step.weight, 0);
      const completedWeight = coreSteps
        .filter(step => step.completed)
        .reduce((sum, step) => sum + step.weight, 0);

      const progressPercentage = Math.round((completedWeight / totalWeight) * 100);

      // Determine next step
      let nextStep: OnboardingStep | undefined;
      if (!hasProfile) {
        nextStep = {
          id: 'profile',
          title: 'Complete Your Auditor Profile',
          description: 'Set up your expertise, experience, and availability',
          completed: false,
          priority: 1
        };
      } else if (!hasApplications) {
        nextStep = {
          id: 'apply',
          title: 'Apply to Your First Project',
          description: 'Submit a proposal for an audit project',
          completed: false,
          priority: 2
        };
      }

      return {
        isNewUser,
        hasProfile,
        hasApplications,
        hasCompletedAudits,
        progressPercentage,
        nextStep
      };

    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return {
        isNewUser: true,
        hasProfile: false,
        hasApplications: false,
        hasCompletedAudits: false,
        progressPercentage: 0
      };
    }
  }

  /**
   * Mark a specific onboarding step as completed
   */
  static async markStepCompleted(userId: string, stepId: string): Promise<void> {
    try {
      console.log(`Marking step ${stepId} as completed for user ${userId}`);
    } catch (error) {
      console.error('Error marking step as completed:', error);
    }
  }

  /**
   * Get onboarding metrics for analytics
   */
  static async getOnboardingMetrics(): Promise<{
    totalNewUsers: number;
    completedProfiles: number;
    firstApplications: number;
    conversionRate: number;
  }> {
    try {
      // Get all auditor profiles created in the last 30 days
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const { data: recentProfiles } = await supabase
        .from('auditor_profiles')
        .select('user_id, created_at')
        .gte('created_at', thirtyDaysAgo.toISOString());

      // Get applications from new users
      const userIds = recentProfiles?.map(p => p.user_id) || [];
      
      const { data: applications } = await supabase
        .from('audit_proposals')
        .select('auditor_id')
        .in('auditor_id', userIds);

      const uniqueApplicants = new Set(applications?.map(a => a.auditor_id) || []).size;

      return {
        totalNewUsers: recentProfiles?.length || 0,
        completedProfiles: recentProfiles?.length || 0,
        firstApplications: uniqueApplicants,
        conversionRate: recentProfiles?.length 
          ? Math.round((uniqueApplicants / recentProfiles.length) * 100) 
          : 0
      };

    } catch (error) {
      console.error('Error getting onboarding metrics:', error);
      return {
        totalNewUsers: 0,
        completedProfiles: 0,
        firstApplications: 0,
        conversionRate: 0
      };
    }
  }

  /**
   * Get personalized recommendations for auditors based on their profile
   */
  static async getPersonalizedRecommendations(userId: string): Promise<{
    recommendedProjects: string[];
    skillSuggestions: string[];
    learningPaths: string[];
  }> {
    try {
      const { data: profile } = await supabase
        .from('auditor_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (!profile) {
        return {
          recommendedProjects: [],
          skillSuggestions: [
            'Complete your auditor profile to get personalized recommendations',
            'Add your blockchain expertise and specializations',
            'Set your availability and hourly rates'
          ],
          learningPaths: []
        };
      }

      // Generate recommendations based on profile
      const recommendations = {
        recommendedProjects: this.getProjectRecommendations(profile),
        skillSuggestions: this.getSkillSuggestions(profile),
        learningPaths: this.getLearningPaths(profile)
      };

      return recommendations;

    } catch (error) {
      console.error('Error getting personalized recommendations:', error);
      return {
        recommendedProjects: [],
        skillSuggestions: [],
        learningPaths: []
      };
    }
  }

  private static getProjectRecommendations(profile: Tables<'auditor_profiles'>): string[] {
    const recommendations: string[] = [];
    
    if (profile.blockchain_expertise?.includes('Ethereum')) {
      recommendations.push('Ethereum DeFi Protocol Audit');
    }
    
    if (profile.specialization_tags?.includes('DeFi')) {
      recommendations.push('DeFi Yield Farming Contract Review');
    }
    
    if (profile.years_experience >= 3) {
      recommendations.push('Enterprise Smart Contract Security Review');
    } else {
      recommendations.push('Junior-Friendly NFT Contract Audit');
    }

    return recommendations.slice(0, 3);
  }

  private static getSkillSuggestions(profile: Tables<'auditor_profiles'>): string[] {
    const suggestions: string[] = [];
    
    if (!profile.specialization_tags?.includes('Formal Verification')) {
      suggestions.push('Learn formal verification techniques');
    }
    
    if (!profile.blockchain_expertise?.includes('Layer 2')) {
      suggestions.push('Expand to Layer 2 scaling solutions');
    }
    
    if (profile.years_experience < 2) {
      suggestions.push('Practice with more complex DeFi protocols');
    }

    return suggestions.slice(0, 3);
  }

  private static getLearningPaths(profile: Tables<'auditor_profiles'>): string[] {
    const paths: string[] = [];
    
    if (profile.years_experience < 1) {
      paths.push('Smart Contract Security Fundamentals');
    } else if (profile.years_experience < 3) {
      paths.push('Advanced Vulnerability Detection');
    } else {
      paths.push('Security Architecture & Design Patterns');
    }
    
    paths.push('AI-Powered Audit Tools Mastery');
    paths.push('Cross-Chain Security Considerations');

    return paths.slice(0, 3);
  }
} 