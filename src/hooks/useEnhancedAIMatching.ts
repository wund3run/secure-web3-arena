
import { useState, useCallback } from 'react';
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
  response_time_avg: number;
  blockchain_expertise: string[];
  audit_types: string[];
  certifications: string[];
  reputation_score: number;
}

interface EnhancedMatchingCriteria {
  blockchain: string;
  project_type: string;
  budget_range: [number, number];
  timeline: string;
  complexity: 'low' | 'medium' | 'high';
  specific_requirements: string[];
  quality_threshold: number;
  experience_preference: 'junior' | 'mid' | 'senior' | 'expert';
  audit_type: string[];
}

interface MLMatchingResult {
  auditor_id: string;
  auditor_profile: AuditorProfile;
  ml_confidence_score: number;
  success_probability: number;
  risk_factors: string[];
  optimization_suggestions: string[];
  estimated_project_outcome: {
    completion_probability: number;
    quality_score: number;
    timeline_accuracy: number;
  };
}

interface MatchingInsights {
  total_auditors_evaluated: number;
  average_response_time: number;
  market_demand_level: 'low' | 'medium' | 'high';
  success_prediction: number;
  risk_assessment: {
    overall_risk: 'low' | 'medium' | 'high';
    primary_concerns: string[];
  };
}

export const useEnhancedAIMatching = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detailedResults, setDetailedResults] = useState<MLMatchingResult[]>([]);
  const [matchingInsights, setMatchingInsights] = useState<MatchingInsights | null>(null);

  const findEnhancedMatches = useCallback(async (criteria: EnhancedMatchingCriteria): Promise<MLMatchingResult[]> => {
    setIsAnalyzing(true);
    
    try {
      // Simulate advanced ML processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock advanced auditor data
      const mockAuditors: AuditorProfile[] = [
        {
          id: '1',
          name: 'Dr. Sarah Chen',
          expertise: ['Solidity', 'DeFi', 'Smart Contracts', 'Formal Verification'],
          experience_years: 8,
          rating: 4.9,
          hourly_rate: 200,
          availability: 'available',
          specializations: ['DeFi Protocols', 'Layer 2 Solutions', 'Cross-chain Bridges'],
          past_audits: 67,
          success_rate: 0.98,
          response_time_avg: 2.5,
          blockchain_expertise: ['Ethereum', 'Polygon', 'Arbitrum'],
          audit_types: ['Security Audit', 'Code Review', 'Architecture Review'],
          certifications: ['CISSP', 'CEH', 'Smart Contract Security'],
          reputation_score: 9.2,
        },
        {
          id: '2',
          name: 'Marcus Rodriguez',
          expertise: ['Rust', 'Solana', 'Security Analysis', 'Cryptography'],
          experience_years: 6,
          rating: 4.8,
          hourly_rate: 180,
          availability: 'available',
          specializations: ['Solana Ecosystem', 'NFT Security', 'Token Economics'],
          past_audits: 43,
          success_rate: 0.96,
          response_time_avg: 4.2,
          blockchain_expertise: ['Solana', 'Ethereum', 'Near'],
          audit_types: ['Security Audit', 'Performance Review'],
          certifications: ['Solana Certified', 'Rust Expert'],
          reputation_score: 8.7,
        },
        {
          id: '3',
          name: 'Dr. Emily Watson',
          expertise: ['Cryptography', 'Formal Verification', 'Protocol Design', 'Zero Knowledge'],
          experience_years: 12,
          rating: 5.0,
          hourly_rate: 300,
          availability: 'busy',
          specializations: ['Core Protocol Audits', 'Cryptographic Implementations', 'ZK Proofs'],
          past_audits: 89,
          success_rate: 0.99,
          response_time_avg: 6.8,
          blockchain_expertise: ['Ethereum', 'Polygon', 'StarkNet'],
          audit_types: ['Security Audit', 'Formal Verification', 'Architecture Review'],
          certifications: ['PhD Cryptography', 'Formal Methods Expert'],
          reputation_score: 9.8,
        },
      ];

      // Advanced ML-style matching algorithm
      const mlResults: MLMatchingResult[] = mockAuditors.map(auditor => {
        let mlScore = 0.6; // Base ML confidence
        const riskFactors: string[] = [];
        const optimizations: string[] = [];

        // Blockchain expertise matching (weighted)
        if (auditor.blockchain_expertise.includes(criteria.blockchain)) {
          mlScore += 0.2;
          optimizations.push('Perfect blockchain expertise match');
        } else {
          riskFactors.push('Limited experience with target blockchain');
        }

        // Experience level matching
        const expLevel = auditor.experience_years >= 8 ? 'expert' : 
                        auditor.experience_years >= 5 ? 'senior' :
                        auditor.experience_years >= 3 ? 'mid' : 'junior';
        
        if (expLevel === criteria.experience_preference) {
          mlScore += 0.15;
        }

        // Success rate weighting
        mlScore += auditor.success_rate * 0.1;

        // Availability impact
        if (auditor.availability === 'available') {
          mlScore += 0.1;
          optimizations.push('Immediately available');
        } else {
          riskFactors.push('Limited availability may cause delays');
          mlScore -= 0.05;
        }

        // Budget compatibility
        const estimatedCost = auditor.hourly_rate * 50; // Estimate
        if (estimatedCost <= criteria.budget_range[1]) {
          mlScore += 0.1;
        } else {
          riskFactors.push('May exceed budget constraints');
        }

        // Quality threshold check
        if (auditor.rating >= criteria.quality_threshold) {
          mlScore += 0.05;
        }

        // Response time factor
        if (auditor.response_time_avg <= 4) {
          optimizations.push('Fast response time');
        }

        return {
          auditor_id: auditor.id,
          auditor_profile: auditor,
          ml_confidence_score: Math.min(mlScore, 1.0),
          success_probability: auditor.success_rate * mlScore,
          risk_factors: riskFactors,
          optimization_suggestions: optimizations,
          estimated_project_outcome: {
            completion_probability: auditor.success_rate * 0.9,
            quality_score: auditor.rating / 5.0,
            timeline_accuracy: auditor.availability === 'available' ? 0.9 : 0.7,
          },
        };
      }).sort((a, b) => b.ml_confidence_score - a.ml_confidence_score);

      // Generate insights
      const insights: MatchingInsights = {
        total_auditors_evaluated: mockAuditors.length,
        average_response_time: mockAuditors.reduce((sum, a) => sum + a.response_time_avg, 0) / mockAuditors.length,
        market_demand_level: criteria.budget_range[1] > 30000 ? 'high' : 'medium',
        success_prediction: mlResults[0]?.success_probability || 0.8,
        risk_assessment: {
          overall_risk: mlResults[0]?.risk_factors.length > 2 ? 'medium' : 'low',
          primary_concerns: ['Budget constraints', 'Timeline pressure'],
        },
      };

      setDetailedResults(mlResults);
      setMatchingInsights(insights);
      
      toast.success(`AI analysis complete! Found ${mlResults.length} potential matches with advanced scoring.`);
      
      return mlResults;
    } catch (error) {
      console.error('Enhanced AI matching failed:', error);
      toast.error('Enhanced matching analysis failed');
      return [];
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  return {
    isAnalyzing,
    detailedResults,
    matchingInsights,
    findEnhancedMatches,
  };
};
