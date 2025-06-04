
import { Logger } from '../logging/logger';

interface HuggingFaceConfig {
  apiKey: string;
  model: string;
  endpoint?: string;
}

interface TextEmbeddingResponse {
  embeddings: number[][];
  similarity?: number;
}

interface RecommendationRequest {
  projectDescription: string;
  auditorProfiles: Array<{
    id: string;
    description: string;
    specializations: string[];
    experience: string;
  }>;
}

export class HuggingFaceIntegration {
  private config: HuggingFaceConfig;
  private cache: Map<string, number[]> = new Map();

  constructor(config: HuggingFaceConfig) {
    this.config = {
      ...config,
      endpoint: config.endpoint || 'https://api-inference.huggingface.co'
    };
  }

  async getTextEmbeddings(texts: string[]): Promise<TextEmbeddingResponse> {
    try {
      Logger.info('Generating text embeddings with Hugging Face', { 
        textCount: texts.length,
        model: this.config.model 
      });

      // Check cache first
      const cachedEmbeddings: number[][] = [];
      const uncachedTexts: string[] = [];
      const textIndices: number[] = [];

      texts.forEach((text, index) => {
        const cached = this.cache.get(text);
        if (cached) {
          cachedEmbeddings[index] = cached;
        } else {
          uncachedTexts.push(text);
          textIndices.push(index);
        }
      });

      if (uncachedTexts.length === 0) {
        return { embeddings: cachedEmbeddings };
      }

      const response = await fetch(`${this.config.endpoint}/models/${this.config.model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: uncachedTexts,
          options: {
            wait_for_model: true,
            use_cache: true
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`Hugging Face API error: ${response.status} ${response.statusText}`);
      }

      const embeddings = await response.json();

      // Cache new embeddings
      uncachedTexts.forEach((text, index) => {
        this.cache.set(text, embeddings[index]);
        cachedEmbeddings[textIndices[index]] = embeddings[index];
      });

      Logger.info('Text embeddings generated successfully', { 
        embeddingDimension: embeddings[0]?.length || 0 
      });

      return { embeddings: cachedEmbeddings };
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

      return this.cosineSimilarity(embeddings[0], embeddings[1]);
    } catch (error) {
      Logger.error('Failed to calculate semantic similarity', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      return 0;
    }
  }

  private cosineSimilarity(vectorA: number[], vectorB: number[]): number {
    if (vectorA.length !== vectorB.length) {
      throw new Error('Vectors must have the same length');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vectorA.length; i++) {
      dotProduct += vectorA[i] * vectorB[i];
      normA += vectorA[i] * vectorA[i];
      normB += vectorB[i] * vectorB[i];
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
  }

  async generateSmartRecommendations(request: RecommendationRequest): Promise<Array<{
    auditorId: string;
    semanticScore: number;
    recommendationReason: string;
    confidence: number;
  }>> {
    try {
      Logger.info('Generating smart recommendations', { 
        auditorCount: request.auditorProfiles.length 
      });

      const projectEmbedding = await this.getTextEmbeddings([request.projectDescription]);
      
      const auditorTexts = request.auditorProfiles.map(auditor => 
        `${auditor.description} Specializations: ${auditor.specializations.join(', ')} Experience: ${auditor.experience}`
      );

      const auditorEmbeddings = await this.getTextEmbeddings(auditorTexts);

      const recommendations = request.auditorProfiles.map((auditor, index) => {
        const semanticScore = this.cosineSimilarity(
          projectEmbedding.embeddings[0],
          auditorEmbeddings.embeddings[index]
        );

        const recommendationReason = this.generateRecommendationReason(
          auditor,
          semanticScore,
          request.projectDescription
        );

        return {
          auditorId: auditor.id,
          semanticScore,
          recommendationReason,
          confidence: this.calculateRecommendationConfidence(semanticScore, auditor)
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

  private generateRecommendationReason(
    auditor: any,
    semanticScore: number,
    projectDescription: string
  ): string {
    const specializations = auditor.specializations.join(', ');
    
    if (semanticScore > 0.8) {
      return `Excellent semantic match with project requirements. Strong expertise in ${specializations}.`;
    } else if (semanticScore > 0.6) {
      return `Good alignment with project needs. Relevant experience in ${specializations}.`;
    } else if (semanticScore > 0.4) {
      return `Moderate fit for project. Some overlap in ${specializations}.`;
    } else {
      return `Basic compatibility. General experience may be applicable.`;
    }
  }

  private calculateRecommendationConfidence(semanticScore: number, auditor: any): number {
    let confidence = semanticScore * 0.7;
    
    // Boost confidence based on auditor profile completeness
    if (auditor.specializations.length > 3) confidence += 0.1;
    if (auditor.experience.length > 100) confidence += 0.1;
    if (auditor.description.length > 200) confidence += 0.1;
    
    return Math.min(1, confidence);
  }

  clearCache(): void {
    this.cache.clear();
    Logger.info('Hugging Face embedding cache cleared');
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}
