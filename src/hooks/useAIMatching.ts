
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface MatchingScore {
  id: string;
  auditor_id: string;
  compatibility_score: number;
  expertise_match: number;
  availability_score: number;
  budget_compatibility: number;
  timeline_feasibility: number;
  reputation_weight: number;
  calculated_at: string;
  auditor_profile?: {
    full_name: string;
    bio: string;
    years_experience: number;
    blockchain_expertise: string[];
    specialization_tags: string[];
    hourly_rate_min: number;
    hourly_rate_max: number;
    average_rating: number;
    total_audits_completed: number;
  };
}

export interface AuditRequest {
  id: string;
  project_name: string;
  blockchain: string;
  budget: number;
  deadline: string;
  audit_scope: string;
  contract_count: number;
  lines_of_code: number;
}

export const useAIMatching = () => {
  const [loading, setLoading] = useState(false);
  const [matchingResults, setMatchingResults] = useState<MatchingScore[]>([]);

  const calculateMatchingScore = useCallback(async (auditRequestId: string) => {
    setLoading(true);
    try {
      // Fetch audit request details
      const { data: auditRequest, error: auditError } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('id', auditRequestId)
        .single();

      if (auditError) throw auditError;

      // Fetch available auditors
      const { data: auditors, error: auditorsError } = await supabase
        .from('auditor_profiles')
        .select(`
          *,
          extended_profiles(full_name, bio)
        `)
        .eq('availability_status', 'available')
        .lt('current_audit_count', 'max_concurrent_audits');

      if (auditorsError) throw auditorsError;

      const scores: MatchingScore[] = [];

      for (const auditor of auditors || []) {
        // Calculate expertise match
        const blockchainMatch = auditor.blockchain_expertise?.includes(auditRequest.blockchain) ? 1.0 : 0.3;
        const experienceScore = Math.min(auditor.years_experience / 5, 1.0);
        const expertiseMatch = (blockchainMatch + experienceScore) / 2;

        // Calculate availability score
        const capacityScore = (auditor.max_concurrent_audits - auditor.current_audit_count) / auditor.max_concurrent_audits;
        const availabilityScore = capacityScore;

        // Calculate budget compatibility
        const budgetMin = auditor.hourly_rate_min || 0;
        const budgetMax = auditor.hourly_rate_max || budgetMin * 2;
        const estimatedCost = (budgetMin + budgetMax) / 2 * 40;
        const budgetCompatibility = auditRequest.budget >= estimatedCost ? 1.0 : auditRequest.budget / estimatedCost;

        // Calculate timeline feasibility
        const avgCompletionTime = auditor.average_completion_time_days || 30;
        const requestedDays = Math.ceil((new Date(auditRequest.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        const timelineFeasibility = requestedDays >= avgCompletionTime ? 1.0 : requestedDays / avgCompletionTime;

        // Calculate reputation weight
        const successRate = auditor.success_rate || 1.0;
        const ratingScore = (auditor.hourly_rate_min || 0) > 0 ? 1.0 : 0.8;
        const reputationWeight = (successRate + ratingScore) / 2;

        // Calculate overall compatibility score
        const compatibilityScore = (
          expertiseMatch * 0.3 +
          availabilityScore * 0.2 +
          budgetCompatibility * 0.2 +
          timelineFeasibility * 0.15 +
          reputationWeight * 0.15
        );

        const score: MatchingScore = {
          id: `${auditRequestId}_${auditor.user_id}`,
          auditor_id: auditor.user_id,
          compatibility_score: compatibilityScore,
          expertise_match: expertiseMatch,
          availability_score: availabilityScore,
          budget_compatibility: budgetCompatibility,
          timeline_feasibility: timelineFeasibility,
          reputation_weight: reputationWeight,
          calculated_at: new Date().toISOString(),
          auditor_profile: {
            full_name: auditor.extended_profiles?.full_name || 'Anonymous Auditor',
            bio: auditor.extended_profiles?.bio || '',
            years_experience: auditor.years_experience,
            blockchain_expertise: auditor.blockchain_expertise || [],
            specialization_tags: auditor.specialization_tags || [],
            hourly_rate_min: auditor.hourly_rate_min || 0,
            hourly_rate_max: auditor.hourly_rate_max || 0,
            average_rating: 4.5,
            total_audits_completed: auditor.total_audits_completed || 0,
          }
        };

        scores.push(score);

        // Store in database using correct column names
        await supabase
          .from('ai_matching_scores')
          .upsert({
            audit_request_id: auditRequestId,
            auditor_id: auditor.user_id,
            overall_score: compatibilityScore,
            expertise_score: expertiseMatch,
            availability_score: availabilityScore,
            budget_compatibility_score: budgetCompatibility,
            timeline_compatibility_score: timelineFeasibility,
            past_performance_score: reputationWeight,
          });
      }

      // Sort by compatibility score
      scores.sort((a, b) => b.compatibility_score - a.compatibility_score);
      setMatchingResults(scores);

      toast.success(`Found ${scores.length} matching auditors`);
      return scores;

    } catch (error) {
      console.error('Error calculating matching scores:', error);
      toast.error('Failed to calculate matching scores');
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  const getMatchingResults = useCallback(async (auditRequestId: string) => {
    try {
      const { data, error } = await supabase
        .from('ai_matching_scores')
        .select(`
          *,
          auditor_profiles(*, extended_profiles(full_name, bio))
        `)
        .eq('audit_request_id', auditRequestId)
        .order('overall_score', { ascending: false });

      if (error) throw error;

      const formattedResults: MatchingScore[] = (data || []).map(item => ({
        id: item.id,
        auditor_id: item.auditor_id,
        compatibility_score: item.overall_score,
        expertise_match: item.expertise_score,
        availability_score: item.availability_score,
        budget_compatibility: item.budget_compatibility_score,
        timeline_feasibility: item.timeline_compatibility_score,
        reputation_weight: item.past_performance_score,
        calculated_at: item.calculated_at,
        auditor_profile: {
          full_name: item.auditor_profiles?.extended_profiles?.full_name || 'Anonymous Auditor',
          bio: item.auditor_profiles?.extended_profiles?.bio || '',
          years_experience: item.auditor_profiles?.years_experience || 0,
          blockchain_expertise: item.auditor_profiles?.blockchain_expertise || [],
          specialization_tags: item.auditor_profiles?.specialization_tags || [],
          hourly_rate_min: item.auditor_profiles?.hourly_rate_min || 0,
          hourly_rate_max: item.auditor_profiles?.hourly_rate_max || 0,
          average_rating: 4.5,
          total_audits_completed: item.auditor_profiles?.total_audits_completed || 0,
        }
      }));

      setMatchingResults(formattedResults);
      return formattedResults;

    } catch (error) {
      console.error('Error fetching matching results:', error);
      toast.error('Failed to load matching results');
      return [];
    }
  }, []);

  return {
    loading,
    matchingResults,
    calculateMatchingScore,
    getMatchingResults,
  };
};
