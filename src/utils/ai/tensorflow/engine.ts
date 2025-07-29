
import * as tf from '@tensorflow/tfjs';
import { Logger } from '../../logging/logger';
import { 
  AuditorFeatures, 
  ProjectFeatures, 
  PredictionResult, 
  ModelMetrics 
} from './types';
import { normalizeFeatures } from './trainingUtils';
import { 
  createModel, 
  compileModel, 
  loadOrTrainModel, 
  evaluateModel, 
  calculateConfidence 
} from './modelUtils';

export class TensorFlowMatchingEngine {
  private model: tf.LayersModel | null = null;
  private isModelLoaded = false;
  private features: string[] = [
    'experience_years',
    'success_rate', 
    'response_time_avg',
    'hourly_rate',
    'past_audits',
    'blockchain_expertise_score',
    'skill_match_score',
    'availability_score',
    'complexity_score',
    'budget_range',
    'timeline_urgency',
    'blockchain_type',
    'required_expertise_level'
  ];

  async initializeModel(): Promise<void> {
    try {
      Logger.info('Initializing TensorFlow.js matching model');
      
      // Create a neural network for matching prediction
      this.model = createModel(this.features.length);
      compileModel(this.model);

      // Try to load pre-trained weights or train with synthetic data
      this.model = await loadOrTrainModel(this.model);
      
      this.isModelLoaded = true;
      Logger.info('TensorFlow.js matching model initialized successfully');
    } catch (error) {
      Logger.error('Failed to initialize TensorFlow.js model', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    }
  }

  async predictMatch(auditorFeatures: AuditorFeatures, projectFeatures: ProjectFeatures): Promise<PredictionResult> {
    if (!this.isModelLoaded || !this.model) {
      throw new Error('Model not initialized. Call initializeModel() first.');
    }

    // Normalize features
    const normalizedFeatures = normalizeFeatures(auditorFeatures, projectFeatures);

    const inputTensor = tf.tensor2d([normalizedFeatures]);
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    const matchScore = await prediction.data();
    
    inputTensor.dispose();
    prediction.dispose();

    // Calculate feature importance using gradient-based approach
    const featureImportance = await this.calculateFeatureImportance(normalizedFeatures);

    return {
      matchScore: matchScore[0],
      confidence: calculateConfidence(matchScore[0]),
      featureImportance
    };
  }

  private async calculateFeatureImportance(features: number[]): Promise<Record<string, number>> {
    const importance: Record<string, number> = {};
    const baseline = await this.getPrediction(features);
    
    for (let i = 0; i < features.length; i++) {
      const perturbedFeatures = [...features];
      perturbedFeatures[i] = 0; // Zero out feature
      
      const perturbedPrediction = await this.getPrediction(perturbedFeatures);
      importance[this.features[i]] = Math.abs(baseline - perturbedPrediction);
    }
    
    return importance;
  }

  private async getPrediction(features: number[]): Promise<number> {
    if (!this.model) {
      throw new Error('Model not initialized');
    }

    const inputTensor = tf.tensor2d([features]);
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    const result = await prediction.data();
    
    inputTensor.dispose();
    prediction.dispose();
    
    return result[0];
  }

  async evaluateModel(): Promise<ModelMetrics> {
    if (!this.model) {
      throw new Error('Model not initialized');
    }
    return evaluateModel(this.model);
  }

  dispose(): void {
    if (this.model) {
      this.model.dispose();
      this.model = null;
      this.isModelLoaded = false;
    }
  }
}
