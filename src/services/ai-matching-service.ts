
import { supabase } from '@/integrations/supabase/client';
import { AuditorProfileService } from './auditor-profile-service';

export interface MatchingResult {
  auditorId: string;
  auditorProfile: any;
  matchScore: number;
  reasoning: string[];
  estimatedCost: number;
  estimatedTimeline: number;
}

export class AIMatchingService {
  static async findBestMatches(auditRequestId: string, limit: number = 5): Promise<MatchingResult[]> {
    try {
      // Get the audit request details
      const { data: auditRequest, error: requestError } = await supabase
        .from('audit_requests')
        .select('*')
        .eq('id', auditRequestId)
        .single();

      if (requestError) throw requestError;

      // Get all available auditors
      const auditors = await AuditorProfileService.getAllAuditors();

      if (auditors.length === 0) {
        console.log('No auditors available for matching');
        return [];
      }

      // Calculate match scores for each auditor
      const matches: MatchingResult[] = [];

      for (const auditor of auditors) {
        const matchScore = await this.calculateMatchScore(auditRequest, auditor);
        const reasoning = this.generateMatchReasoning(auditRequest, auditor, matchScore);
        
        matches.push({
          auditorId: auditor.user_id,
          auditorProfile: auditor,
          matchScore,
          reasoning,
          estimatedCost: this.estimateCost(auditRequest, auditor),
          estimatedTimeline: this.estimateTimeline(auditRequest, auditor)
        });
      }

      // Sort by match score and return top matches
      return matches
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, limit);

    } catch (error) {
      console.error('Failed to find matches:', error);
      return [];
    }
  }

  static async calculateMatchScore(auditRequest: any, auditor: any): Promise<number> {
    let score = 0;

    // Blockchain expertise match (40% weight)
    if (auditor.blockchain_expertise?.includes(auditRequest.blockchain)) {
      score += 0.4;
    }

    // Experience level match (25% weight)
    if (auditor.years_experience >= 5) {
      score += 0.25;
    } else if (auditor.years_experience >= 3) {
      score += 0.20;
    } else if (auditor.years_experience >= 1) {
      score += 0.15;
    }

    // Budget compatibility (20% weight)
    if (auditRequest.budget && auditor.hourly_rate_min && auditor.hourly_rate_max) {
      const estimatedHours = Math.max(40, (auditRequest.lines_of_code || 1000) / 100);
      const minCost = auditor.hourly_rate_min * estimatedHours;
      const maxCost = auditor.hourly_rate_max * estimatedHours;
      
      if (auditRequest.budget >= minCost && auditRequest.budget <= maxCost * 1.2) {
        score += 0.20;
      } else if (auditRequest.budget >= minCost * 0.8) {
        score += 0.15;
      }
    } else {
      score += 0.10; // Default if budget info is missing
    }

    // Availability (15% weight)
    if (auditor.availability_status === 'available') {
      score += 0.15;
    } else if (auditor.availability_status === 'limited') {
      score += 0.08;
    }

    return Math.min(1.0, score);
  }

  static generateMatchReasoning(auditRequest: any, auditor: any, matchScore: number): string[] {
    const reasons: string[] = [];

    if (auditor.blockchain_expertise?.includes(auditRequest.blockchain)) {
      reasons.push(`Expert in ${auditRequest.blockchain} blockchain`);
    }

    if (auditor.years_experience >= 5) {
      reasons.push(`${auditor.years_experience}+ years of security experience`);
    }

    if (auditor.total_audits_completed > 10) {
      reasons.push(`Completed ${auditor.total_audits_completed} successful audits`);
    }

    if (auditor.availability_status === 'available') {
      reasons.push('Immediately available to start');
    }

    if (auditor.response_time_hours <= 24) {
      reasons.push(`Fast response time (${auditor.response_time_hours}h)`);
    }

    if (matchScore > 0.8) {
      reasons.push('Exceptional match for your project requirements');
    }

    return reasons.length > 0 ? reasons : ['Good overall fit for your project'];
  }

  static estimateCost(auditRequest: any, auditor: any): number {
    const linesOfCode = auditRequest.lines_of_code || 1000;
    const complexity = auditRequest.contract_count || 1;
    const estimatedHours = Math.max(40, (linesOfCode / 100) + (complexity * 10));
    
    const hourlyRate = auditor.hourly_rate_min || 150;
    return Math.round(estimatedHours * hourlyRate);
  }

  static estimateTimeline(auditRequest: any, auditor: any): number {
    const linesOfCode = auditRequest.lines_of_code || 1000;
    const complexity = auditRequest.contract_count || 1;
    
    // Base timeline calculation
    let days = Math.max(3, Math.ceil((linesOfCode / 500) + complexity));
    
    // Adjust based on auditor experience
    if (auditor.years_experience >= 5) {
      days = Math.ceil(days * 0.8); // Experienced auditors work faster
    }
    
    return days;
  }

  static async autoAssignBestMatch(auditRequestId: string): Promise<boolean> {
    try {
      const matches = await this.findBestMatches(auditRequestId, 1);
      
      if (matches.length === 0) {
        console.log('No matches found for auto-assignment');
        return false;
      }

      const bestMatch = matches[0];

      // Update audit request with assigned auditor
      const { error } = await supabase
        .from('audit_requests')
        .update({ 
          assigned_auditor_id: bestMatch.auditorId,
          status: 'assigned'
        })
        .eq('id', auditRequestId);

      if (error) throw error;

      // Create matching score record
      await supabase
        .from('ai_matching_scores')
        .insert({
          audit_request_id: auditRequestId,
          auditor_id: bestMatch.auditorId,
          overall_score: bestMatch.matchScore,
          expertise_score: 0.8, // Mock detailed scores
          availability_score: 0.9,
          budget_compatibility_score: 0.7,
          timeline_compatibility_score: 0.8,
          past_performance_score: 0.85
        });

      return true;
    } catch (error) {
      console.error('Failed to auto-assign match:', error);
      return false;
    }
  }
}
