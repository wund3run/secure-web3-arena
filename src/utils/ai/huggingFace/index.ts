
export { HuggingFaceIntegration } from './integration';
export type { 
  HuggingFaceConfig, 
  TextEmbeddingResponse, 
  RecommendationRequest,
  SmartRecommendation,
  AuditorProfileInput 
} from './types';
export { 
  calculateCosineSimilarity, 
  generateRecommendationReason,
  calculateRecommendationConfidence 
} from './utils';
