
export { TensorFlowMatchingEngine } from './engine';
export type { 
  AuditorFeatures, 
  ProjectFeatures, 
  PredictionResult, 
  ModelMetrics,
  TrainingData 
} from './types';
export { 
  generateSyntheticTrainingData, 
  normalizeFeatures 
} from './trainingUtils';
export { 
  createModel, 
  compileModel, 
  trainModelWithSyntheticData, 
  evaluateModel, 
  calculateConfidence 
} from './modelUtils';
