
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface AuditorProfile {
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
}

interface MatchingCriteria {
  blockchain: string;
  project_type: string;
  budget_range: [number, number];
  timeline: string;
  complexity: 'low' | 'medium' | 'high';
  specific_requirements: string[];
}

interface MatchingResult {
  auditor: AuditorProfile;
  match_score: number;
  reasons: string[];
  estimated_cost: number;
  estimated_timeline: string;
}

export const useAIMatching = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<MatchingResult[]>([]);

  const findMatches = useCallback(async (criteria: MatchingCriteria): Promise<MatchingResult[]> => {
    setIsAnalyzing(true);
    
    try {
      // Simulate AI matching algorithm with mock data
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockAuditors: AuditorProfile[] = [
        {
          id: '1',
          name: 'Sarah Chen',
          expertise: ['Solidity', 'DeFi', 'Smart Contracts'],
          experience_years: 5,
          rating: 4.9,
          hourly_rate: 150,
          availability: 'available',
          specializations: ['DeFi Protocols', 'Layer 2 Solutions'],
          past_audits: 45,
          success_rate: 0.98,
        },
        {
          id: '2',
          name: 'Marcus Rodriguez',
          expertise: ['Rust', 'Solana', 'Security Analysis'],
          experience_years: 7,
          rating: 4.8,
          hourly_rate: 180,
          availability: 'available',
          specializations: ['Cross-chain Bridges', 'NFT Platforms'],
          past_audits: 67,
          success_rate: 0.96,
        },
        {
          id: '3',
          name: 'Dr. Emily Watson',
          expertise: ['Cryptography', 'Formal Verification', 'Protocol Design'],
          experience_years: 10,
          rating: 5.0,
          hourly_rate: 250,
          availability: 'busy',
          specializations: ['Core Protocol Audits', 'Cryptographic Implementations'],
          past_audits: 89,
          success_rate: 0.99,
        },
      ];

      // AI matching algorithm simulation
      const matchingResults: MatchingResult[] = mockAuditors.map(auditor => {
        let matchScore = 0.7; // Base score
        const reasons: string[] = [];

        // Blockchain expertise matching
        if (auditor.expertise.some(exp => exp.toLowerCase().includes(criteria.blockchain.toLowerCase()))) {
          matchScore += 0.15;
          reasons.push(`Expertise in ${criteria.blockchain}`);
        }

        // Experience weighting
        if (auditor.experience_years >= 5) {
          matchScore += 0.1;
          reasons.push(`${auditor.experience_years} years of experience`);
        }

        // Rating bonus
        if (auditor.rating >= 4.8) {
          matchScore += 0.05;
          reasons.push(`High rating (${auditor.rating}/5.0)`);
        }

        // Availability check
        if (auditor.availability === 'available') {
          matchScore += 0.1;
          reasons.push('Currently available');
        } else if (auditor.availability === 'busy') {
          matchScore -= 0.1;
          reasons.push('Limited availability');
        }

        // Budget matching
        const estimatedCost = auditor.hourly_rate * 40; // Estimate 40 hours
        if (estimatedCost <= criteria.budget_range[1] && estimatedCost >= criteria.budget_range[0]) {
          matchScore += 0.1;
          reasons.push('Within budget range');
        }

        return {
          auditor,
          match_score: Math.min(matchScore, 1.0),
          reasons,
          estimated_cost: estimatedCost,
          estimated_timeline: auditor.availability === 'available' ? '2-3 weeks' : '4-6 weeks',
        };
      }).sort((a, b) => b.match_score - a.match_score);

      setResults(matchingResults);
      toast.success(`Found ${matchingResults.length} potential matches`);
      
      return matchingResults;
    } catch (error) {
      console.error('AI matching failed:', error);
      toast.error('Failed to find matches');
      return [];
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  const refineMatches = useCallback(async (feedback: { auditorId: string; rating: number; notes: string }[]) => {
    // In a real implementation, this would use machine learning to improve matching
    toast.info('Thanks for your feedback! This will help improve future matches.');
  }, []);

  return {
    isAnalyzing,
    results,
    findMatches,
    refineMatches,
  };
};
