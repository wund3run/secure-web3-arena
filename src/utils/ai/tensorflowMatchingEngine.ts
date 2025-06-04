
import * as tf from '@tensorflow/tfjs';
import { Logger } from '../logging/logger';

interface AuditorFeatures {
  experience_years: number;
  success_rate: number;
  response_time_avg: number;
  hourly_rate: number;
  past_audits: number;
  blockchain_expertise_score: number;
  skill_match_score: number;
  availability_score: number;
}

interface ProjectFeatures {
  complexity_score: number;
  budget_range: number;
  timeline_urgency: number;
  blockchain_type: number;
  required_expertise_level: number;
}

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
      this.model = tf.sequential({
        layers: [
          tf.layers.dense({
            inputShape: [this.features.length],
            units: 64,
            activation: 'relu',
            name: 'hidden1'
          }),
          tf.layers.dropout({ rate: 0.2 }),
          tf.layers.dense({
            units: 32,
            activation: 'relu',
            name: 'hidden2'
          }),
          tf.layers.dropout({ rate: 0.1 }),
          tf.layers.dense({
            units: 16,
            activation: 'relu',
            name: 'hidden3'
          }),
          tf.layers.dense({
            units: 1,
            activation: 'sigmoid',
            name: 'output'
          })
        ]
      });

      this.model.compile({
        optimizer: tf.train.adam(0.001),
        loss: 'binaryCrossentropy',
        metrics: ['accuracy', 'precision', 'recall']
      });

      // Try to load pre-trained weights or train with synthetic data
      await this.loadOrTrainModel();
      
      this.isModelLoaded = true;
      Logger.info('TensorFlow.js matching model initialized successfully');
    } catch (error) {
      Logger.error('Failed to initialize TensorFlow.js model', { 
        error: error instanceof Error ? error.message : 'Unknown error' 
      });
      throw error;
    }
  }

  private async loadOrTrainModel(): Promise<void> {
    try {
      // Try to load existing model
      this.model = await tf.loadLayersModel('/models/matching-model.json');
      Logger.info('Loaded pre-trained matching model');
    } catch {
      // If no model exists, train with synthetic data
      Logger.info('No pre-trained model found, training with synthetic data');
      await this.trainWithSyntheticData();
    }
  }

  private async trainWithSyntheticData(): Promise<void> {
    const numSamples = 1000;
    const trainingData = this.generateSyntheticTrainingData(numSamples);
    
    const xs = tf.tensor2d(trainingData.features);
    const ys = tf.tensor2d(trainingData.labels, [numSamples, 1]);

    await this.model!.fit(xs, ys, {
      epochs: 50,
      batchSize: 32,
      validationSplit: 0.2,
      verbose: 0,
      callbacks: {
        onEpochEnd: (epoch, logs) => {
          if (epoch % 10 === 0) {
            Logger.debug(`Training epoch ${epoch}`, { 
              loss: logs?.loss,
              accuracy: logs?.acc 
            });
          }
        }
      }
    });

    xs.dispose();
    ys.dispose();
  }

  private generateSyntheticTrainingData(numSamples: number): {
    features: number[][];
    labels: number[];
  } {
    const features: number[][] = [];
    const labels: number[] = [];

    for (let i = 0; i < numSamples; i++) {
      const auditorFeatures: AuditorFeatures = {
        experience_years: Math.random() * 15,
        success_rate: 0.7 + Math.random() * 0.3,
        response_time_avg: Math.random() * 24,
        hourly_rate: 50 + Math.random() * 250,
        past_audits: Math.random() * 100,
        blockchain_expertise_score: Math.random(),
        skill_match_score: Math.random(),
        availability_score: Math.random()
      };

      const projectFeatures: ProjectFeatures = {
        complexity_score: Math.random(),
        budget_range: 1000 + Math.random() * 49000,
        timeline_urgency: Math.random(),
        blockchain_type: Math.random(),
        required_expertise_level: Math.random()
      };

      // Calculate success probability based on feature alignment
      const successProbability = this.calculateSyntheticSuccess(auditorFeatures, projectFeatures);
      
      const featureVector = [
        auditorFeatures.experience_years / 15,
        auditorFeatures.success_rate,
        1 - (auditorFeatures.response_time_avg / 24),
        1 - (auditorFeatures.hourly_rate / 300),
        auditorFeatures.past_audits / 100,
        auditorFeatures.blockchain_expertise_score,
        auditorFeatures.skill_match_score,
        auditorFeatures.availability_score,
        projectFeatures.complexity_score,
        projectFeatures.budget_range / 50000,
        projectFeatures.timeline_urgency,
        projectFeatures.blockchain_type,
        projectFeatures.required_expertise_level
      ];

      features.push(featureVector);
      labels.push(successProbability > 0.7 ? 1 : 0);
    }

    return { features, labels };
  }

  private calculateSyntheticSuccess(auditor: AuditorFeatures, project: ProjectFeatures): number {
    let score = 0;
    
    // Experience alignment
    score += auditor.experience_years > 5 ? 0.2 : 0.1;
    
    // Success rate weight
    score += auditor.success_rate * 0.3;
    
    // Response time (faster is better)
    score += (1 - auditor.response_time_avg / 24) * 0.1;
    
    // Skill and blockchain expertise
    score += auditor.blockchain_expertise_score * 0.2;
    score += auditor.skill_match_score * 0.2;
    
    return Math.min(1, score);
  }

  async predictMatch(auditorFeatures: AuditorFeatures, projectFeatures: ProjectFeatures): Promise<{
    matchScore: number;
    confidence: number;
    featureImportance: Record<string, number>;
  }> {
    if (!this.isModelLoaded || !this.model) {
      throw new Error('Model not initialized. Call initializeModel() first.');
    }

    // Normalize features
    const normalizedFeatures = [
      auditorFeatures.experience_years / 15,
      auditorFeatures.success_rate,
      1 - (auditorFeatures.response_time_avg / 24),
      1 - (auditorFeatures.hourly_rate / 300),
      auditorFeatures.past_audits / 100,
      auditorFeatures.blockchain_expertise_score,
      auditorFeatures.skill_match_score,
      auditorFeatures.availability_score,
      projectFeatures.complexity_score,
      projectFeatures.budget_range / 50000,
      projectFeatures.timeline_urgency,
      projectFeatures.blockchain_type,
      projectFeatures.required_expertise_level
    ];

    const inputTensor = tf.tensor2d([normalizedFeatures]);
    const prediction = this.model.predict(inputTensor) as tf.Tensor;
    const matchScore = await prediction.data();
    
    inputTensor.dispose();
    prediction.dispose();

    // Calculate feature importance using gradient-based approach
    const featureImportance = await this.calculateFeatureImportance(normalizedFeatures);

    return {
      matchScore: matchScore[0],
      confidence: this.calculateConfidence(matchScore[0]),
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
    const inputTensor = tf.tensor2d([features]);
    const prediction = this.model!.predict(inputTensor) as tf.Tensor;
    const result = await prediction.data();
    
    inputTensor.dispose();
    prediction.dispose();
    
    return result[0];
  }

  private calculateConfidence(score: number): number {
    // Confidence is higher when score is close to 0 or 1
    return 1 - 2 * Math.abs(score - 0.5);
  }

  async evaluateModel(): Promise<{
    precision: number;
    recall: number;
    f1Score: number;
    accuracy: number;
  }> {
    const testData = this.generateSyntheticTrainingData(200);
    const xs = tf.tensor2d(testData.features);
    const ys = tf.tensor2d(testData.labels, [200, 1]);

    const predictions = this.model!.predict(xs) as tf.Tensor;
    const predictionData = await predictions.data();
    
    let truePositives = 0;
    let falsePositives = 0;
    let falseNegatives = 0;
    let trueNegatives = 0;

    for (let i = 0; i < testData.labels.length; i++) {
      const predicted = predictionData[i] > 0.5 ? 1 : 0;
      const actual = testData.labels[i];
      
      if (predicted === 1 && actual === 1) truePositives++;
      else if (predicted === 1 && actual === 0) falsePositives++;
      else if (predicted === 0 && actual === 1) falseNegatives++;
      else trueNegatives++;
    }

    const precision = truePositives / (truePositives + falsePositives) || 0;
    const recall = truePositives / (truePositives + falseNegatives) || 0;
    const f1Score = 2 * (precision * recall) / (precision + recall) || 0;
    const accuracy = (truePositives + trueNegatives) / testData.labels.length;

    xs.dispose();
    ys.dispose();
    predictions.dispose();

    return { precision, recall, f1Score, accuracy };
  }

  dispose(): void {
    if (this.model) {
      this.model.dispose();
      this.model = null;
      this.isModelLoaded = false;
    }
  }
}

export const tensorflowMatchingEngine = new TensorFlowMatchingEngine();
