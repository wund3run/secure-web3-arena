
export interface HuggingFaceConfig {
  apiKey: string;
  model: string;
  endpoint?: string;
}

export interface TextEmbeddingResponse {
  embeddings: number[][];
  similarity?: number;
}

export interface AuditorProfileInput {
  id: string;
  description: string;
  specializations: string[];
  experience: string;
}

export interface RecommendationRequest {
  projectDescription: string;
  auditorProfiles: AuditorProfileInput[];
}

export interface SmartRecommendation {
  auditorId: string;
  semanticScore: number;
  recommendationReason: string;
  confidence: number;
}
