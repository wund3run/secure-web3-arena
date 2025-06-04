
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { tensorflowMatchingEngine } from '@/utils/ai/tensorflowMatchingEngine';
import { HuggingFaceIntegration } from '@/utils/ai/huggingFaceIntegration';
import { Logger } from '@/utils/logging/logger';

interface EnhancedMatchingCriteria {
  blockchain: string;
  project_type: string;
  project_description: string;
  budget_range: [number, number];
  timeline: string;
  complexity: 'low' | 'medium' | 'high';
  specific_requirements: string[];
  quality_threshold: number;
  experience_preference: 'junior' | 'mid' | 'senior' | 'expert';
  audit_type: string[];
}

interface AuditorProfile {
  id: string;
  name: string;
  description: string;
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
}

interface EnhancedMatchResult {
  auditor: AuditorProfile;
  tf_confidence_score: number;
  semantic_score: number;
  combined_score: number;
  recommendation_reason: string;
  feature_importance: Record<string, number>;
  precision_metrics: {
    precision: number;
    recall: number;
    f1_score: number;
  };
}

export const useEnhancedAIMatchingV2 = () => {
  const [isInitializing, setIsInitializing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [modelMetrics, setModelMetrics] = useState<any>(null);
  const [huggingFaceIntegration, setHuggingFaceIntegration] = useState<HuggingFaceIntegration | null>(null);

  const initializeAI = useCallback(async () => {
    setIsInitializing(true);
    try {
      Logger.info('Initializing enhanced AI matching system');
      
      // Initialize TensorFlow.js model
      await tensorflowMatchingEngine.initializeModel();
      
      // Initialize Hugging Face integration
      const hfIntegration = new HuggingFaceIntegration({
        apiKey: process.env.NEXT_PUBLIC_HUGGING_FACE_TOKEN || 'demo-token',
        model: 'sentence-transformers/all-MiniLM-L6-v2' // Lightweight embedding model
      });
      
      setHuggingFaceIntegration(hfIntegration);
      
      // Evaluate model performance
      const metrics = await tensorflowMatchingEngine.evaluateModel();
      setModelMetrics(metrics);
      
      Logger.info('Enhanced AI matching system initialized', { metrics });
      toast.success(`AI Matching Engine Ready! Precision: ${(metrics.precision * 100).toFixed(1)}%`);
      
    } catch (error) {
      Logger.error('Failed to initialize AI matching system', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      toast.error('Failed to initialize AI matching system');
    } finally {
      setIsInitializing(false);
    }
  }, []);

  const findEnhancedMatches = useCallback(async (
    criteria: EnhancedMatchingCriteria,
    auditors: AuditorProfile[]
  ): Promise<EnhancedMatchResult[]> => {
    if (!huggingFaceIntegration) {
      throw new Error('AI system not initialized');
    }

    setIsAnalyzing(true);
    
    try {
      Logger.info('Running enhanced AI matching analysis', { 
        auditorCount: auditors.length,
        criteria: criteria.project_type 
      });

      // Generate semantic recommendations using Hugging Face
      const semanticRecommendations = await huggingFaceIntegration.generateSmartRecommendations({
        projectDescription: criteria.project_description,
        auditorProfiles: auditors.map(auditor => ({
          id: auditor.id,
          description: auditor.description,
          specializations: auditor.specializations,
          experience: `${auditor.experience_years} years, ${auditor.past_audits} audits completed`
        }))
      });

      // Run TensorFlow predictions for each auditor
      const enhancedResults: EnhancedMatchResult[] = [];

      for (const auditor of auditors) {
        const semanticResult = semanticRecommendations.find(r => r.auditorId === auditor.id);
        
        const auditorFeatures = {
          experience_years: auditor.experience_years,
          success_rate: auditor.success_rate,
          response_time_avg: auditor.response_time_avg,
          hourly_rate: auditor.hourly_rate,
          past_audits: auditor.past_audits,
          blockchain_expertise_score: this.calculateBlockchainExpertiseScore(auditor, criteria),
          skill_match_score: this.calculateSkillMatchScore(auditor, criteria),
          availability_score: auditor.availability === 'available' ? 1 : auditor.availability === 'busy' ? 0.5 : 0
        };

        const projectFeatures = {
          complexity_score: this.mapComplexityToScore(criteria.complexity),
          budget_range: criteria.budget_range[1],
          timeline_urgency: this.calculateTimelineUrgency(criteria.timeline),
          blockchain_type: this.mapBlockchainToScore(criteria.blockchain),
          required_expertise_level: this.mapExperienceToScore(criteria.experience_preference)
        };

        const tfPrediction = await tensorflowMatchingEngine.predictMatch(auditorFeatures, projectFeatures);
        
        // Combine TensorFlow and semantic scores
        const semanticScore = semanticResult?.semanticScore || 0;
        const combinedScore = (tfPrediction.matchScore * 0.6) + (semanticScore * 0.4);

        enhancedResults.push({
          auditor,
          tf_confidence_score: tfPrediction.matchScore,
          semantic_score: semanticScore,
          combined_score: combinedScore,
          recommendation_reason: semanticResult?.recommendationReason || 'Standard matching algorithm applied',
          feature_importance: tfPrediction.featureImportance,
          precision_metrics: {
            precision: modelMetrics?.precision || 0,
            recall: modelMetrics?.recall || 0,
            f1_score: modelMetrics?.f1Score || 0
          }
        });
      }

      // Sort by combined score
      enhancedResults.sort((a, b) => b.combined_score - a.combined_score);

      Logger.info('Enhanced AI matching completed', { 
        resultsCount: enhancedResults.length,
        topScore: enhancedResults[0]?.combined_score || 0,
        avgPrecision: modelMetrics?.precision || 0
      });

      return enhancedResults;

    } catch (error) {
      Logger.error('Enhanced AI matching failed', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  }, [huggingFaceIntegration, modelMetrics]);

  // Helper methods
  const calculateBlockchainExpertiseScore = (auditor: AuditorProfile, criteria: EnhancedMatchingCriteria): number => {
    return auditor.blockchain_expertise.includes(criteria.blockchain) ? 1 : 0.3;
  };

  const calculateSkillMatchScore = (auditor: AuditorProfile, criteria: EnhancedMatchingCriteria): number => {
    const matchingSkills = auditor.expertise.filter(skill => 
      criteria.specific_requirements.some(req => 
        req.toLowerCase().includes(skill.toLowerCase())
      )
    );
    return matchingSkills.length / Math.max(criteria.specific_requirements.length, 1);
  };

  const mapComplexityToScore = (complexity: string): number => {
    const mapping = { low: 0.3, medium: 0.6, high: 1.0 };
    return mapping[complexity as keyof typeof mapping] || 0.5;
  };

  const calculateTimelineUrgency = (timeline: string): number => {
    // Parse timeline and convert to urgency score
    if (timeline.includes('week')) return 1.0;
    if (timeline.includes('month')) return 0.6;
    return 0.3;
  };

  const mapBlockchainToScore = (blockchain: string): number => {
    // Map blockchain types to numeric scores
    const mapping: Record<string, number> = {
      ethereum: 0.9,
      solana: 0.8,
      polygon: 0.7,
      arbitrum: 0.6,
      optimism: 0.5
    };
    return mapping[blockchain.toLowerCase()] || 0.5;
  };

  const mapExperienceToScore = (experience: string): number => {
    const mapping = { junior: 0.3, mid: 0.5, senior: 0.8, expert: 1.0 };
    return mapping[experience as keyof typeof mapping] || 0.5;
  };

  // Initialize on mount
  useEffect(() => {
    initializeAI();
    
    return () => {
      // Cleanup
      tensorflowMatchingEngine.dispose();
      huggingFaceIntegration?.clearCache();
    };
  }, [initializeAI]);

  return {
    isInitializing,
    isAnalyzing,
    modelMetrics,
    findEnhancedMatches,
    initializeAI
  };
};
