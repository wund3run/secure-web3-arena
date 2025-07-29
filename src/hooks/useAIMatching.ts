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
  match_reasons: string[];
  metadata?: { match_reasons?: string[] };
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
        .select('*')
        .eq('availability_status', 'available')
        .lt('current_audit_count', 'max_concurrent_audits');

      if (auditorsError) throw auditorsError;

      // Fetch extended profiles for auditors
      const auditorIds = auditors?.map(a => a.user_id) || [];
      const { data: extendedProfiles } = await supabase
        .from('extended_profiles')
        .select('*')
        .in('id', auditorIds);

      const scores: MatchingScore[] = [];

      for (const auditor of auditors || []) {
        const extendedProfile = extendedProfiles?.find(p => p.id === auditor.user_id);
        const match_reasons: string[] = [];
        
        // Calculate expertise match
        const blockchainMatch = auditor.blockchain_expertise?.includes(auditRequest.blockchain) ? 1.0 : 0.3;
        if (blockchainMatch === 1.0) match_reasons.push('Perfect blockchain expertise');
        const specializationMatch = auditor.specialization_tags?.some(tag => auditRequest.audit_scope?.toLowerCase().includes(tag.toLowerCase()));
        if (specializationMatch) match_reasons.push('Relevant specialization');
        const experienceScore = Math.min(auditor.years_experience / 5, 1.0);
        if (auditor.years_experience >= 5) match_reasons.push('Highly experienced');
        const expertiseMatch = (blockchainMatch + experienceScore) / 2;

        // Calculate availability score
        const maxConcurrent = auditor.max_concurrent_audits ?? 1;
        const currentCount = auditor.current_audit_count ?? 0;
        const capacityScore = (maxConcurrent - currentCount) / maxConcurrent;
        const availabilityScore = capacityScore;
        if (auditor.availability_status === 'available' && capacityScore > 0.5) match_reasons.push('Available now');

        // Calculate budget compatibility
        const budgetMin = auditor.hourly_rate_min || 0;
        const budgetMax = auditor.hourly_rate_max || budgetMin * 2;
        const estimatedCost = (budgetMin + budgetMax) / 2 * 40;
        const requestBudget = auditRequest.budget ?? 0;
        const budgetCompatibility = requestBudget >= estimatedCost ? 1.0 : requestBudget / estimatedCost;
        if (budgetCompatibility >= 0.9) match_reasons.push('Budget compatible');

        // Calculate timeline feasibility
        const avgCompletionTime = auditor.average_completion_time_days || 30;
        const deadline = auditRequest.deadline ? new Date(auditRequest.deadline) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        const requestedDays = Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
        const timelineFeasibility = requestedDays >= avgCompletionTime ? 1.0 : requestedDays / avgCompletionTime;
        if (timelineFeasibility >= 0.9) match_reasons.push('Timeline feasible');

        // Calculate reputation weight
        const successRate = auditor.success_rate ?? 1.0;
        const ratingScore = (auditor.hourly_rate_min ?? 0) > 0 ? 1.0 : 0.8;
        const reputationWeight = (successRate + ratingScore) / 2;
        const total_audits_completed = auditor.total_audits_completed ?? 0;
        const average_rating = 4.5;
        if (average_rating >= 4.7) match_reasons.push('Top-rated');
        if (total_audits_completed >= 20) match_reasons.push('Many completed audits');

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
          match_reasons,
          auditor_profile: {
            full_name: extendedProfile?.full_name || 'Anonymous Auditor',
            bio: extendedProfile?.bio || '',
            years_experience: auditor.years_experience,
            blockchain_expertise: auditor.blockchain_expertise || [],
            specialization_tags: auditor.specialization_tags || [],
            hourly_rate_min: auditor.hourly_rate_min || 0,
            hourly_rate_max: auditor.hourly_rate_max || 0,
            average_rating,
            total_audits_completed,
          }
        };

        scores.push(score);

        // Store in database using correct column names, match_reasons in metadata
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
            metadata: { match_reasons },
          });
      }

      // Sort by compatibility score
      scores.sort((a, b) => b.compatibility_score - a.compatibility_score);
      setMatchingResults(scores);

      toast.success(`Found ${scores.length} matching auditors`);
      return scores;

    } catch (error: unknown) {
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
        .select('*')
        .eq('audit_request_id', auditRequestId)
        .order('overall_score', { ascending: false });

      if (error) throw error;

      // Fetch auditor profiles separately
      const auditorIds = data?.map(item => item.auditor_id) || [];
      const { data: auditorProfiles } = await supabase
        .from('auditor_profiles')
        .select('*')
        .in('user_id', auditorIds);

      const { data: extendedProfiles } = await supabase
        .from('extended_profiles')
        .select('*')
        .in('id', auditorIds);

      const formattedResults: MatchingScore[] = (data || []).map(item => {
        const auditorProfile = auditorProfiles?.find(p => p.user_id === item.auditor_id);
        const extendedProfile = extendedProfiles?.find(p => p.id === item.auditor_id);
        const total_audits_completed = auditorProfile?.total_audits_completed ?? 0;
        const average_rating = 4.5;
        const match_reasons: string[] = Array.isArray((item as any).metadata?.match_reasons) ? (item as any).metadata.match_reasons : [];
        return {
          id: item.id,
          auditor_id: item.auditor_id,
          compatibility_score: item.overall_score,
          expertise_match: item.expertise_score,
          availability_score: item.availability_score,
          budget_compatibility: item.budget_compatibility_score,
          timeline_feasibility: item.timeline_compatibility_score,
          reputation_weight: item.past_performance_score,
          calculated_at: item.calculated_at || new Date().toISOString(),
          match_reasons,
          auditor_profile: {
            full_name: extendedProfile?.full_name || 'Anonymous Auditor',
            bio: extendedProfile?.bio || '',
            years_experience: auditorProfile?.years_experience || 0,
            blockchain_expertise: auditorProfile?.blockchain_expertise || [],
            specialization_tags: auditorProfile?.specialization_tags || [],
            hourly_rate_min: auditorProfile?.hourly_rate_min || 0,
            hourly_rate_max: auditorProfile?.hourly_rate_max || 0,
            average_rating,
            total_audits_completed,
          }
        };
      });

      setMatchingResults(formattedResults);
      return formattedResults;

    } catch (error: unknown) {
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
