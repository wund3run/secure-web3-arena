
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
      // Get all profiles with auditor role
      const { data: profiles, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('is_arbitrator', false); // Using existing field as proxy for auditor status

      if (error) throw error;

      if (!profiles) return [];

      // Calculate match scores for each auditor
      const matches = profiles.map(profile => {
        const matchScore = this.calculateMatchScore(profile, criteria);
        
        return {
          id: profile.id,
          name: profile.full_name || 'Unknown Auditor',
          email: profile.id, // Using ID as placeholder
          matchScore,
          expertise: [], // Mock data for now
          experienceYears: 2, // Mock data
          rating: 4.5, // Mock data
          hourlyRate: 150, // Mock data
          availability: 'Available',
          completedAudits: 5, // Mock data
          responseTime: '2-4 hours',
          reasonForMatch: this.generateMatchReason(profile, criteria, matchScore)
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

  private static calculateMatchScore(profile: any, criteria: MatchingCriteria): number {
    let score = 70; // Base score
    
    // Add randomization for demo purposes
    score += Math.random() * 30;
    
    return Math.round(score);
  }

  private static generateMatchReason(profile: any, criteria: MatchingCriteria, score: number): string {
    const reasons = [];
    
    if (score > 90) {
      reasons.push("Excellent match");
    } else if (score > 75) {
      reasons.push("Strong candidate");
    } else {
      reasons.push("Good potential");
    }
    
    reasons.push("Available for new projects");
    
    return reasons.join(", ");
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
      // For now, save to localStorage until database schema is ready
      const proposalData = {
        id: Date.now().toString(),
        auditorId,
        projectId,
        ...proposal,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      const existingProposals = JSON.parse(localStorage.getItem('proposals') || '[]');
      existingProposals.push(proposalData);
      localStorage.setItem('proposals', JSON.stringify(existingProposals));
      
      toast.success('Proposal submitted successfully');
      return true;
    } catch (error) {
      console.error('Error creating proposal:', error);
      toast.error('Failed to submit proposal');
      return false;
    }
  }
}
