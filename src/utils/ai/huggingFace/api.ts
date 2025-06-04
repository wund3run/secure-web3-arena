
import { Logger } from '../../logging/logger';
import { HuggingFaceConfig, TextEmbeddingResponse } from './types';

export class HuggingFaceAPI {
  constructor(private config: HuggingFaceConfig) {}

  async fetchEmbeddings(texts: string[]): Promise<number[][]> {
    try {
      const response = await fetch(`${this.config.endpoint}/models/${this.config.model}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: texts,
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
      
      Logger.info('Text embeddings generated successfully', { 
        embeddingDimension: embeddings[0]?.length || 0 
      });

      return embeddings;
    } catch (error) {
      Logger.error('Failed to fetch embeddings from Hugging Face API', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    }
  }
}
