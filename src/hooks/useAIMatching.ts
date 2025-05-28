
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import type { AIMatchingScore, AuditorProfile } from '@/types/auditor';
import type { AuditRequest } from '@/hooks/useAuditRequests';

export const useAIMatching = () => {
  const [loading, setLoading] = useState(false);
  const [matchingScores, setMatchingScores] = useState<AIMatchingScore[]>([]);

  const calculateAIMatching = async (auditRequestId: string) => {
    try {
      setLoading(true);
      
      // Get the audit request details
      const { data: auditRequest, error: requestError } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('id', auditRequestId)
        .single();

      if (requestError) throw requestError;

      // Get available auditors
      const { data: auditors, error: auditorsError } = await supabase
        .from('auditor_profiles')
        .select('*')
        .eq('verification_status', 'verified')
        .eq('availability_status', 'available');

      if (auditorsError) throw auditorsError;

      const scores: Omit<AIMatchingScore, 'id' | 'calculated_at'>[] = [];

      for (const auditor of auditors) {
        // Calculate expertise score using the database function
        const { data: expertiseScore } = await supabase
          .rpc('calculate_expertise_match', {
            auditor_skills: auditor.audit_types,
            auditor_blockchains: auditor.blockchain_expertise,
            request_blockchain: auditRequest.blockchain,
            request_category: auditRequest.audit_scope || 'general'
          });

        // Calculate availability score
        const availabilityScore = auditor.current_audit_count < auditor.max_concurrent_audits ? 1.0 : 0.3;

        // Calculate budget compatibility
        let budgetScore = 0.5; // default
        if (auditRequest.budget && auditor.hourly_rate_min && auditor.hourly_rate_max) {
          const estimatedCost = auditor.hourly_rate_min * 40; // rough estimate
          if (auditRequest.budget >= estimatedCost) {
            budgetScore = Math.min(1.0, auditRequest.budget / estimatedCost);
          } else {
            budgetScore = Math.max(0.1, auditRequest.budget / estimatedCost);
          }
        }

        // Calculate timeline compatibility
        let timelineScore = 0.7; // default
        if (auditRequest.deadline && auditor.average_completion_time_days) {
          const daysUntilDeadline = Math.ceil(
            (new Date(auditRequest.deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
          );
          if (daysUntilDeadline >= auditor.average_completion_time_days) {
            timelineScore = 1.0;
          } else {
            timelineScore = Math.max(0.2, daysUntilDeadline / auditor.average_completion_time_days);
          }
        }

        // Calculate past performance score
        const performanceScore = auditor.total_audits_completed > 0 
          ? Math.min(1.0, auditor.total_audits_completed / 10) 
          : 0.3;

        // Calculate overall score with weights
        const overallScore = (
          (expertiseScore || 0) * 0.3 +
          availabilityScore * 0.2 +
          budgetScore * 0.2 +
          timelineScore * 0.15 +
          performanceScore * 0.15
        );

        scores.push({
          audit_request_id: auditRequestId,
          auditor_id: auditor.id,
          overall_score: Math.round(overallScore * 100) / 100,
          expertise_score: Math.round((expertiseScore || 0) * 100) / 100,
          availability_score: Math.round(availabilityScore * 100) / 100,
          budget_compatibility_score: Math.round(budgetScore * 100) / 100,
          timeline_compatibility_score: Math.round(timelineScore * 100) / 100,
          past_performance_score: Math.round(performanceScore * 100) / 100,
        });
      }

      // Save scores to database
      const { error: insertError } = await supabase
        .from('ai_matching_scores')
        .upsert(scores);

      if (insertError) throw insertError;

      // Update audit request as AI matching completed
      const { error: updateError } = await supabase
        .from('audit_requests')
        .update({ ai_matching_completed: true })
        .eq('id', auditRequestId);

      if (updateError) throw updateError;

      setMatchingScores(scores as AIMatchingScore[]);
      toast.success('AI matching completed successfully');
      
      return scores.sort((a, b) => b.overall_score - a.overall_score);

    } catch (err: any) {
      console.error('AI matching error:', err);
      toast.error('Failed to calculate AI matching');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getMatchingResults = async (auditRequestId: string) => {
    try {
      const { data, error } = await supabase
        .from('ai_matching_scores')
        .select(`
          *,
          auditor_profiles (*)
        `)
        .eq('audit_request_id', auditRequestId)
        .order('overall_score', { ascending: false });

      if (error) throw error;
      return data;
    } catch (err: any) {
      toast.error('Failed to fetch matching results');
      throw err;
    }
  };

  return {
    loading,
    matchingScores,
    calculateAIMatching,
    getMatchingResults,
  };
};
