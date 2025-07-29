
import { Logger } from '../../logging/logger';
import { 
  HuggingFaceConfig, 
  TextEmbeddingResponse, 
  RecommendationRequest, 
  SmartRecommendation 
} from './types';
import { EmbeddingCache } from './cache';
import { HuggingFaceAPI } from './api';
import { 
  calculateCosineSimilarity, 
  generateRecommendationReason,
  calculateRecommendationConfidence,
  buildAuditorText 
} from './utils';

export class HuggingFaceIntegration {
  private api: HuggingFaceAPI;
  private cache: EmbeddingCache;

  constructor(config: HuggingFaceConfig) {
    const fullConfig = {
      ...config,
      endpoint: config.endpoint || 'https://api-inference.huggingface.co'
    };
    
    this.api = new HuggingFaceAPI(fullConfig);
    this.cache = new EmbeddingCache();
  }

  async getTextEmbeddings(texts: string[]): Promise<TextEmbeddingResponse> {
    try {
      Logger.info('Generating text embeddings with Hugging Face', { 
        textCount: texts.length 
      });

      const { cachedEmbeddings, uncachedTexts, textIndices } = this.cache.processTextsWithCache(texts);

      if (uncachedTexts.length === 0) {
        return { embeddings: cachedEmbeddings.filter(Boolean) as number[][] };
      }

      const newEmbeddings = await this.api.fetchEmbeddings(uncachedTexts);
      const finalEmbeddings = this.cache.mergeEmbeddings(
        cachedEmbeddings, 
        newEmbeddings, 
        uncachedTexts, 
        textIndices
      );

      return { embeddings: finalEmbeddings };
    } catch (error) {
      Logger.error('Failed to generate text embeddings', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    }
  }

  async calculateSemanticSimilarity(text1: string, text2: string): Promise<number> {
    try {
      const { embeddings } = await this.getTextEmbeddings([text1, text2]);
      
      if (embeddings.length !== 2) {
        throw new Error('Expected exactly 2 embeddings');
      }

      return calculateCosineSimilarity(embeddings[0], embeddings[1]);
    } catch (error) {
      Logger.error('Failed to calculate semantic similarity', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      return 0;
    }
  }

  async generateSmartRecommendations(request: RecommendationRequest): Promise<SmartRecommendation[]> {
    try {
      Logger.info('Generating smart recommendations', { 
        auditorCount: request.auditorProfiles.length 
      });

      const projectEmbedding = await this.getTextEmbeddings([request.projectDescription]);
      const auditorTexts = request.auditorProfiles.map(buildAuditorText);
      const auditorEmbeddings = await this.getTextEmbeddings(auditorTexts);

      const recommendations = request.auditorProfiles.map((auditor, index) => {
        const semanticScore = calculateCosineSimilarity(
          projectEmbedding.embeddings[0],
          auditorEmbeddings.embeddings[index]
        );

        return {
          auditorId: auditor.id,
          semanticScore,
          recommendationReason: generateRecommendationReason(
            auditor,
            semanticScore,
            request.projectDescription
          ),
          confidence: calculateRecommendationConfidence(semanticScore, auditor)
        };
      });

      // Sort by semantic score
      recommendations.sort((a, b) => b.semanticScore - a.semanticScore);

      Logger.info('Smart recommendations generated', { 
        topScore: recommendations[0]?.semanticScore || 0 
      });

      return recommendations;
    } catch (error) {
      Logger.error('Failed to generate smart recommendations', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      return [];
    }
  }

  clearCache(): void {
    this.cache.clear();
  }

  getCacheSize(): number {
    return this.cache.size();
  }
}
