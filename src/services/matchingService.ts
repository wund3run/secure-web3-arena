
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface MatchingCriteria {
  blockchain: string;
  projectType: string;
  budgetRange: [number, number];
  timeline: string;
  complexity: 'low' | 'medium' | 'high';
  requiredSkills: string[];
}

export interface AuditorMatch {
  id: string;
  name: string;
  email: string;
  matchScore: number;
  expertise: string[];
  experienceYears: number;
  rating: number;
  hourlyRate: number;
  availability: string;
  completedAudits: number;
  responseTime: string;
  reasonForMatch: string;
}

export class MatchingService {
  static async findMatchingAuditors(
    projectId: string,
    criteria: MatchingCriteria
  ): Promise<AuditorMatch[]> {
    try {
      // Get all auditors with their profiles
      const { data: auditors, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_type', 'auditor')
        .eq('verification_status', 'verified');

      if (error) throw error;

      if (!auditors) return [];

      // Calculate match scores for each auditor
      const matches = auditors.map(auditor => {
        const matchScore = this.calculateMatchScore(auditor, criteria);
        
        return {
          id: auditor.id,
          name: auditor.full_name || auditor.display_name || 'Unknown',
          email: auditor.id, // We'll use ID for now
          matchScore,
          expertise: auditor.skills || [],
          experienceYears: auditor.years_of_experience || 0,
          rating: 4.5, // Mock data for now
          hourlyRate: 150, // Mock data
          availability: 'Available',
          completedAudits: auditor.projects_completed || 0,
          responseTime: '2-4 hours',
          reasonForMatch: this.generateMatchReason(auditor, criteria, matchScore)
        };
      });

      // Sort by match score and return top matches
      return matches
        .filter(match => match.matchScore > 60)
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, 10);

    } catch (error) {
      console.error('Error finding matches:', error);
      toast.error('Failed to find matching auditors');
      return [];
    }
  }

  private static calculateMatchScore(auditor: any, criteria: MatchingCriteria): number {
    let score = 0;
    
    // Skill matching (40% weight)
    const skillMatch = this.calculateSkillMatch(auditor.skills || [], criteria.requiredSkills);
    score += skillMatch * 0.4;
    
    // Experience matching (25% weight)
    const experienceScore = Math.min((auditor.years_of_experience || 0) / 5, 1) * 100;
    score += experienceScore * 0.25;
    
    // Specialization matching (20% weight)
    const specializationMatch = this.calculateSpecializationMatch(
      auditor.specializations || [],
      criteria.blockchain,
      criteria.projectType
    );
    score += specializationMatch * 0.2;
    
    // Projects completed (15% weight)
    const projectsScore = Math.min((auditor.projects_completed || 0) / 20, 1) * 100;
    score += projectsScore * 0.15;
    
    return Math.round(score);
  }

  private static calculateSkillMatch(auditorSkills: string[], requiredSkills: string[]): number {
    if (requiredSkills.length === 0) return 100;
    
    const matchingSkills = requiredSkills.filter(skill =>
      auditorSkills.some(auditorSkill =>
        auditorSkill.toLowerCase().includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(auditorSkill.toLowerCase())
      )
    );
    
    return (matchingSkills.length / requiredSkills.length) * 100;
  }

  private static calculateSpecializationMatch(
    specializations: string[],
    blockchain: string,
    projectType: string
  ): number {
    let score = 0;
    
    // Check blockchain match
    if (specializations.some(spec => 
      spec.toLowerCase().includes(blockchain.toLowerCase())
    )) {
      score += 50;
    }
    
    // Check project type match
    if (specializations.some(spec => 
      spec.toLowerCase().includes(projectType.toLowerCase())
    )) {
      score += 50;
    }
    
    return score;
  }

  private static generateMatchReason(auditor: any, criteria: MatchingCriteria, score: number): string {
    const reasons = [];
    
    if (score > 90) {
      reasons.push("Excellent skill alignment");
    } else if (score > 75) {
      reasons.push("Strong skill match");
    }
    
    if ((auditor.years_of_experience || 0) >= 3) {
      reasons.push("Experienced auditor");
    }
    
    if ((auditor.projects_completed || 0) >= 10) {
      reasons.push("Proven track record");
    }
    
    return reasons.join(", ") || "Good overall match";
  }

  static async createProposal(
    auditorId: string,
    projectId: string,
    proposal: {
      message: string;
      estimatedHours: number;
      hourlyRate: number;
      timeline: string;
      deliverables: string[];
    }
  ): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('audit_proposals')
        .insert({
          auditor_id: auditorId,
          audit_request_id: projectId,
          message: proposal.message,
          estimated_hours: proposal.estimatedHours,
          hourly_rate: proposal.hourlyRate,
          timeline: proposal.timeline,
          deliverables: proposal.deliverables,
          status: 'pending'
        });

      if (error) throw error;
      
      toast.success('Proposal submitted successfully');
      return true;
    } catch (error) {
      console.error('Error creating proposal:', error);
      toast.error('Failed to submit proposal');
      return false;
    }
  }
}
