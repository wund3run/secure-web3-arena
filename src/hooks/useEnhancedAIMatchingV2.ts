
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';
import { tensorflowMatchingEngine } from '@/utils/ai/tensorflowMatchingEngine';
import { HuggingFaceIntegration } from '@/utils/ai/huggingFaceIntegration';
import { Logger } from '@/utils/logging/logger';
import { 
  EnhancedMatchingCriteria, 
  AuditorProfile, 
  EnhancedMatchResult 
} from './useEnhancedAIMatchingV2/types';
import {
  calculateBlockchainExpertiseScore,
  calculateSkillMatchScore,
  mapComplexityToScore,
  calculateTimelineUrgency,
  mapBlockchainToScore,
  mapExperienceToScore
} from './useEnhancedAIMatchingV2/utils';

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
          blockchain_expertise_score: calculateBlockchainExpertiseScore(auditor, criteria),
          skill_match_score: calculateSkillMatchScore(auditor, criteria),
          availability_score: auditor.availability === 'available' ? 1 : auditor.availability === 'busy' ? 0.5 : 0
        };

        const projectFeatures = {
          complexity_score: mapComplexityToScore(criteria.complexity),
          budget_range: criteria.budget_range[1],
          timeline_urgency: calculateTimelineUrgency(criteria.timeline),
          blockchain_type: mapBlockchainToScore(criteria.blockchain),
          required_expertise_level: mapExperienceToScore(criteria.experience_preference)
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
          feature_importance: tfPrediction?.featureImportance || {},
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

// Re-export types for convenience
export type { EnhancedMatchingCriteria, AuditorProfile, EnhancedMatchResult };
