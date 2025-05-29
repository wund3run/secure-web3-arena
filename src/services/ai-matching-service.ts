
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface MatchingResult {
  auditorId: string;
  matchScore: number;
  auditorProfile: any;
  reasoning: string[];
}

export class AIMatchingService {
  static async findBestMatches(auditRequestId: string, limit: number = 5): Promise<MatchingResult[]> {
    try {
      // Get audit request details
      const { data: auditRequest, error: requestError } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('id', auditRequestId)
        .single();

      if (requestError || !auditRequest) {
        throw new Error('Audit request not found');
      }

      // Get available auditors with their profiles
      const { data: auditors, error: auditorsError } = await supabase
        .from('auditor_profiles')
        .select(`
          *,
          extended_profiles:user_id (
            full_name,
            avatar_url
          ),
          auditor_reviews (
            rating,
            communication_rating,
            technical_quality_rating
          )
        `)
        .eq('availability_status', 'available')
        .eq('verification_status', 'verified')
        .lt('current_audit_count', supabase.rpc('coalesce', { value: 'max_concurrent_audits', fallback: 3 }));

      if (auditorsError) {
        throw auditorsError;
      }

      // Calculate match scores for each auditor
      const matchResults: MatchingResult[] = [];

      for (const auditor of auditors || []) {
        const { data: scoreData } = await supabase
          .rpc('calculate_auditor_match_score', {
            p_audit_request_id: auditRequestId,
            p_auditor_id: auditor.user_id
          });

        const matchScore = scoreData || 0;
        const reasoning = this.generateMatchingReasoning(auditRequest, auditor, matchScore);

        matchResults.push({
          auditorId: auditor.user_id,
          matchScore,
          auditorProfile: auditor,
          reasoning
        });
      }

      // Sort by match score and return top matches
      const sortedMatches = matchResults
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, limit);

      // Store matching results
      await this.storeMatchingResults(auditRequestId, sortedMatches);

      return sortedMatches;
    } catch (error) {
      console.error('AI matching failed:', error);
      toast.error('Failed to find matching auditors');
      return [];
    }
  }

  static async autoAssignBestMatch(auditRequestId: string): Promise<boolean> {
    try {
      const matches = await this.findBestMatches(auditRequestId, 1);
      
      if (matches.length === 0 || matches[0].matchScore < 0.7) {
        return false; // Don't auto-assign if match score is too low
      }

      const bestMatch = matches[0];
      
      // Assign the auditor
      const { error } = await supabase
        .from('audit_requests')
        .update({
          assigned_auditor_id: bestMatch.auditorId,
          status: 'matched',
          matching_score: bestMatch.matchScore,
          ai_matching_completed: true
        })
        .eq('id', auditRequestId);

      if (error) throw error;

      // Create notification for both parties
      await this.createMatchingNotifications(auditRequestId, bestMatch);

      return true;
    } catch (error) {
      console.error('Auto-assignment failed:', error);
      return false;
    }
  }

  private static generateMatchingReasoning(auditRequest: any, auditor: any, score: number): string[] {
    const reasons: string[] = [];

    if (auditor.blockchain_expertise?.includes(auditRequest.blockchain)) {
      reasons.push(`Expert in ${auditRequest.blockchain} blockchain`);
    }

    if (auditor.years_experience >= 5) {
      reasons.push(`${auditor.years_experience}+ years of experience`);
    }

    if (auditor.success_rate >= 0.95) {
      reasons.push(`${Math.round(auditor.success_rate * 100)}% success rate`);
    }

    if (auditor.response_time_hours <= 12) {
      reasons.push(`Fast response time (${auditor.response_time_hours}h)`);
    }

    if (score >= 0.8) {
      reasons.push('Excellent overall match');
    } else if (score >= 0.6) {
      reasons.push('Good match for your project');
    }

    return reasons;
  }

  private static async storeMatchingResults(auditRequestId: string, matches: MatchingResult[]): Promise<void> {
    const matchingData = matches.map(match => ({
      audit_request_id: auditRequestId,
      auditor_id: match.auditorId,
      overall_score: match.matchScore,
      expertise_score: match.matchScore * 0.3,
      availability_score: match.matchScore * 0.2,
      budget_compatibility_score: match.matchScore * 0.15,
      timeline_compatibility_score: match.matchScore * 0.15,
      past_performance_score: match.matchScore * 0.2
    }));

    await supabase
      .from('ai_matching_scores')
      .upsert(matchingData);
  }

  private static async createMatchingNotifications(auditRequestId: string, match: MatchingResult): Promise<void> {
    const { data: auditRequest } = await supabase
      .from('audit_requests')
      .select('client_id, project_name')
      .eq('id', auditRequestId)
      .single();

    if (!auditRequest) return;

    // Notify client
    await supabase
      .from('notifications')
      .insert({
        user_id: auditRequest.client_id,
        title: 'Perfect Match Found!',
        message: `We found an excellent auditor for ${auditRequest.project_name} with ${Math.round(match.matchScore * 100)}% compatibility.`,
        type: 'success',
        action_url: `/audits/${auditRequestId}`
      });

    // Notify auditor
    await supabase
      .from('notifications')
      .insert({
        user_id: match.auditorId,
        title: 'New Audit Opportunity',
        message: `You've been matched with a ${auditRequest.project_name} project. ${Math.round(match.matchScore * 100)}% compatibility!`,
        type: 'info',
        action_url: `/audits/${auditRequestId}`
      });
  }
}
