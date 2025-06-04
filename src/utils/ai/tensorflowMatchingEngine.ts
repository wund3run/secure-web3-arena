
// Re-export the main engine class and create singleton instance for backward compatibility
export { TensorFlowMatchingEngine } from './tensorflow';
export type { 
  AuditorFeatures, 
  ProjectFeatures, 
  PredictionResult, 
  ModelMetrics 
} from './tensorflow';

import { TensorFlowMatchingEngine } from './tensorflow';

// Create singleton instance for backward compatibility
export const tensorflowMatchingEngine = new TensorFlowMatchingEngine();
