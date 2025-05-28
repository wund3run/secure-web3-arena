
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useAIMatching } from './useAIMatching';

export interface EnhancedAuditorProfile {
  id: string;
  name: string;
  expertise: string[];
  experience_years: number;
  rating: number;
  hourly_rate: number;
  availability: 'available' | 'busy' | 'unavailable';
  specializations: string[];
  past_audits: number;
  success_rate: number;
  // Enhanced fields
  workload_capacity: number;
  current_workload: number;
  timezone: string;
  languages: string[];
  certifications: string[];
  performance_score: number;
  response_time_avg: number; // in hours
  quality_rating: number;
  completion_rate: number;
  geographic_preferences: string[];
  preferred_project_sizes: string[];
  minimum_budget: number;
  maximum_concurrent_audits: number;
}

export interface EnhancedMatchingCriteria {
  blockchain: string;
  project_type: string;
  budget_range: [number, number];
  timeline: string;
  complexity: 'low' | 'medium' | 'high';
  specific_requirements: string[];
  // Enhanced criteria
  preferred_timezone?: string;
  required_certifications?: string[];
  language_preference?: string;
  urgency_level: 'low' | 'medium' | 'high' | 'urgent';
  project_size: 'small' | 'medium' | 'large' | 'enterprise';
  geographic_restrictions?: string[];
  quality_threshold: number; // minimum rating required
  experience_threshold: number; // minimum years required
}

export interface EnhancedMatchingResult {
  auditor: EnhancedAuditorProfile;
  match_score: number;
  compatibility_breakdown: {
    technical_fit: number;
    availability_score: number;
    experience_match: number;
    budget_compatibility: number;
    timezone_alignment: number;
    quality_score: number;
    workload_feasibility: number;
  };
  reasons: string[];
  concerns: string[];
  estimated_cost: number;
  estimated_timeline: string;
  confidence_level: 'low' | 'medium' | 'high';
  recommended_action: 'highly_recommended' | 'good_match' | 'consider' | 'not_recommended';
}

export const useEnhancedAIMatching = () => {
  const baseMatching = useAIMatching();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detailedResults, setDetailedResults] = useState<EnhancedMatchingResult[]>([]);
  const [matchingInsights, setMatchingInsights] = useState<{
    total_auditors_evaluated: number;
    filtering_criteria_applied: string[];
    market_demand_level: 'low' | 'medium' | 'high';
    average_response_time: number;
    success_prediction: number;
  } | null>(null);

  const findEnhancedMatches = useCallback(async (
    criteria: EnhancedMatchingCriteria
  ): Promise<EnhancedMatchingResult[]> => {
    setIsAnalyzing(true);
    
    try {
      // Call the enhanced AI matching service
      const { data, error } = await supabase.functions.invoke('enhanced-ai-matching', {
        body: {
          criteria,
          include_performance_analytics: true,
          include_market_insights: true,
        },
      });

      if (error) throw error;

      const enhancedResults: EnhancedMatchingResult[] = data.matches.map((match: any) => {
        // Calculate compatibility breakdown
        const technicalFit = calculateTechnicalFit(match.auditor, criteria);
        const availabilityScore = calculateAvailabilityScore(match.auditor, criteria);
        const experienceMatch = calculateExperienceMatch(match.auditor, criteria);
        const budgetCompatibility = calculateBudgetCompatibility(match.auditor, criteria);
        const timezoneAlignment = calculateTimezoneAlignment(match.auditor, criteria);
        const qualityScore = match.auditor.quality_rating;
        const workloadFeasibility = calculateWorkloadFeasibility(match.auditor);

        const overallScore = (
          technicalFit * 0.25 +
          availabilityScore * 0.20 +
          experienceMatch * 0.15 +
          budgetCompatibility * 0.15 +
          timezoneAlignment * 0.10 +
          qualityScore * 0.10 +
          workloadFeasibility * 0.05
        );

        // Generate insights and concerns
        const reasons = generateMatchReasons(match.auditor, criteria, {
          technicalFit,
          availabilityScore,
          experienceMatch,
          budgetCompatibility,
          timezoneAlignment,
          qualityScore,
          workloadFeasibility,
        });

        const concerns = generateMatchConcerns(match.auditor, criteria);

        return {
          auditor: match.auditor,
          match_score: overallScore,
          compatibility_breakdown: {
            technical_fit: technicalFit,
            availability_score: availabilityScore,
            experience_match: experienceMatch,
            budget_compatibility: budgetCompatibility,
            timezone_alignment: timezoneAlignment,
            quality_score: qualityScore,
            workload_feasibility: workloadFeasibility,
          },
          reasons,
          concerns,
          estimated_cost: match.auditor.hourly_rate * estimateProjectHours(criteria),
          estimated_timeline: estimateTimeline(match.auditor, criteria),
          confidence_level: overallScore >= 0.8 ? 'high' : overallScore >= 0.6 ? 'medium' : 'low',
          recommended_action: getRecommendedAction(overallScore, concerns.length),
        };
      });

      const sortedResults = enhancedResults.sort((a, b) => b.match_score - a.match_score);
      
      setDetailedResults(sortedResults);
      setMatchingInsights(data.insights);
      
      toast.success(`Found ${sortedResults.length} potential matches with detailed analysis`);
      return sortedResults;
    } catch (error) {
      console.error('Enhanced AI matching failed:', error);
      toast.error('Failed to find enhanced matches');
      return [];
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  // Helper functions for scoring
  const calculateTechnicalFit = (auditor: EnhancedAuditorProfile, criteria: EnhancedMatchingCriteria): number => {
    let score = 0.5; // Base score

    // Blockchain expertise
    if (auditor.expertise.some(exp => exp.toLowerCase().includes(criteria.blockchain.toLowerCase()))) {
      score += 0.3;
    }

    // Project type alignment
    if (auditor.specializations.some(spec => spec.toLowerCase().includes(criteria.project_type.toLowerCase()))) {
      score += 0.2;
    }

    // Required certifications
    if (criteria.required_certifications?.length) {
      const certificationMatch = criteria.required_certifications.filter(cert =>
        auditor.certifications.includes(cert)
      ).length / criteria.required_certifications.length;
      score += certificationMatch * 0.2;
    }

    return Math.min(score, 1.0);
  };

  const calculateAvailabilityScore = (auditor: EnhancedAuditorProfile, criteria: EnhancedMatchingCriteria): number => {
    if (auditor.availability === 'unavailable') return 0;
    if (auditor.availability === 'available') return 1.0;
    
    // For 'busy' auditors, check workload capacity
    const workloadRatio = auditor.current_workload / auditor.workload_capacity;
    return Math.max(0, 1 - workloadRatio);
  };

  const calculateExperienceMatch = (auditor: EnhancedAuditorProfile, criteria: EnhancedMatchingCriteria): number => {
    const experienceRatio = auditor.experience_years / Math.max(criteria.experience_threshold, 1);
    return Math.min(experienceRatio, 1.0);
  };

  const calculateBudgetCompatibility = (auditor: EnhancedAuditorProfile, criteria: EnhancedMatchingCriteria): number => {
    const estimatedCost = auditor.hourly_rate * estimateProjectHours(criteria);
    const [minBudget, maxBudget] = criteria.budget_range;
    
    if (estimatedCost < minBudget) return 0.5; // Suspiciously low
    if (estimatedCost > maxBudget) return 0; // Over budget
    if (estimatedCost <= maxBudget * 0.8) return 1.0; // Well within budget
    return 0.7; // At upper limit
  };

  const calculateTimezoneAlignment = (auditor: EnhancedAuditorProfile, criteria: EnhancedMatchingCriteria): number => {
    if (!criteria.preferred_timezone) return 0.8; // Neutral if no preference
    
    // Simplified timezone matching (in real implementation, use proper timezone library)
    const timezoneMatch = auditor.timezone === criteria.preferred_timezone;
    return timezoneMatch ? 1.0 : 0.3;
  };

  const calculateWorkloadFeasibility = (auditor: EnhancedAuditorProfile): number => {
    if (auditor.current_workload >= auditor.maximum_concurrent_audits) return 0;
    
    const workloadRatio = auditor.current_workload / auditor.maximum_concurrent_audits;
    return 1 - workloadRatio;
  };

  const estimateProjectHours = (criteria: EnhancedMatchingCriteria): number => {
    const baseHours = {
      'small': 40,
      'medium': 80,
      'large': 160,
      'enterprise': 320,
    };
    
    const complexityMultiplier = {
      'low': 0.8,
      'medium': 1.0,
      'high': 1.5,
    };
    
    return (baseHours[criteria.project_size] || 80) * complexityMultiplier[criteria.complexity];
  };

  const estimateTimeline = (auditor: EnhancedAuditorProfile, criteria: EnhancedMatchingCriteria): string => {
    const hours = estimateProjectHours(criteria);
    const workingHoursPerDay = 6; // Assuming 6 productive hours per day
    const days = Math.ceil(hours / workingHoursPerDay);
    
    if (auditor.availability === 'busy') {
      return `${Math.ceil(days * 1.5)} days`;
    }
    
    return `${days} days`;
  };

  const generateMatchReasons = (
    auditor: EnhancedAuditorProfile,
    criteria: EnhancedMatchingCriteria,
    scores: any
  ): string[] => {
    const reasons = [];
    
    if (scores.technicalFit > 0.8) {
      reasons.push(`Strong technical expertise in ${criteria.blockchain}`);
    }
    
    if (auditor.rating >= 4.8) {
      reasons.push(`Excellent rating (${auditor.rating}/5.0)`);
    }
    
    if (auditor.success_rate > 0.95) {
      reasons.push(`High success rate (${(auditor.success_rate * 100).toFixed(1)}%)`);
    }
    
    if (scores.availabilityScore === 1.0) {
      reasons.push('Currently available');
    }
    
    if (auditor.response_time_avg < 2) {
      reasons.push('Fast response time');
    }
    
    return reasons;
  };

  const generateMatchConcerns = (
    auditor: EnhancedAuditorProfile,
    criteria: EnhancedMatchingCriteria
  ): string[] => {
    const concerns = [];
    
    if (auditor.current_workload / auditor.workload_capacity > 0.8) {
      concerns.push('High current workload');
    }
    
    if (auditor.response_time_avg > 8) {
      concerns.push('Slower response time than average');
    }
    
    if (auditor.rating < criteria.quality_threshold) {
      concerns.push('Rating below quality threshold');
    }
    
    return concerns;
  };

  const getRecommendedAction = (score: number, concernCount: number): EnhancedMatchingResult['recommended_action'] => {
    if (score >= 0.85 && concernCount === 0) return 'highly_recommended';
    if (score >= 0.7 && concernCount <= 1) return 'good_match';
    if (score >= 0.5) return 'consider';
    return 'not_recommended';
  };

  return {
    ...baseMatching,
    isAnalyzing,
    detailedResults,
    matchingInsights,
    findEnhancedMatches,
  };
};
