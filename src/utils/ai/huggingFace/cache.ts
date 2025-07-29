
import { Logger } from '../../logging/logger';

export class EmbeddingCache {
  private cache: Map<string, number[]> = new Map();

  getCachedEmbedding(text: string): number[] | undefined {
    return this.cache.get(text);
  }

  setCachedEmbedding(text: string, embedding: number[]): void {
    this.cache.set(text, embedding);
  }

  clear(): void {
    this.cache.clear();
    Logger.info('Hugging Face embedding cache cleared');
  }

  size(): number {
    return this.cache.size;
  }

  processTextsWithCache(texts: string[]): {
    cachedEmbeddings: (number[] | undefined)[];
    uncachedTexts: string[];
    textIndices: number[];
  } {
    const cachedEmbeddings: (number[] | undefined)[] = new Array(texts.length);
    const uncachedTexts: string[] = [];
    const textIndices: number[] = [];

    texts.forEach((text, index) => {
      const cached = this.getCachedEmbedding(text);
      if (cached) {
        cachedEmbeddings[index] = cached;
      } else {
        uncachedTexts.push(text);
        textIndices.push(index);
      }
    });

    return { cachedEmbeddings, uncachedTexts, textIndices };
  }

  mergeEmbeddings(
    cachedEmbeddings: (number[] | undefined)[],
    newEmbeddings: number[][],
    uncachedTexts: string[],
    textIndices: number[]
  ): number[][] {
    const finalEmbeddings: number[][] = [];
    
    uncachedTexts.forEach((text, index) => {
      this.setCachedEmbedding(text, newEmbeddings[index]);
      cachedEmbeddings[textIndices[index]] = newEmbeddings[index];
    });

    // Convert to final array, filtering out undefined values
    cachedEmbeddings.forEach((embedding) => {
      if (embedding) {
        finalEmbeddings.push(embedding);
      }
    });

    return finalEmbeddings;
  }
}
