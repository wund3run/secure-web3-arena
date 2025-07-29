
import * as tf from '@tensorflow/tfjs';
import { Logger } from '../../logging/logger';
import { ModelMetrics, TrainingData } from './types';
import { generateSyntheticTrainingData } from './trainingUtils';

export const createModel = (inputSize: number): tf.LayersModel => {
  return tf.sequential({
    layers: [
      tf.layers.dense({
        inputShape: [inputSize],
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
};

export const compileModel = (model: tf.LayersModel): void => {
  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy', 'precision', 'recall']
  });
};

export const loadOrTrainModel = async (model: tf.LayersModel): Promise<tf.LayersModel> => {
  try {
    // Try to load existing model
    const loadedModel = await tf.loadLayersModel('/models/matching-model.json');
    Logger.info('Loaded pre-trained matching model');
    return loadedModel;
  } catch {
    // If no model exists, train with synthetic data
    Logger.info('No pre-trained model found, training with synthetic data');
    await trainModelWithSyntheticData(model);
    return model;
  }
};

export const trainModelWithSyntheticData = async (model: tf.LayersModel): Promise<void> => {
  const numSamples = 1000;
  const trainingData = generateSyntheticTrainingData(numSamples);
  
  const xs = tf.tensor2d(trainingData.features);
  const ys = tf.tensor2d(trainingData.labels, [numSamples, 1]);

  await model.fit(xs, ys, {
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
};

export const evaluateModel = async (model: tf.LayersModel): Promise<ModelMetrics> => {
  const testData = generateSyntheticTrainingData(200);
  const xs = tf.tensor2d(testData.features);
  const ys = tf.tensor2d(testData.labels, [200, 1]);

  const predictions = model.predict(xs) as tf.Tensor;
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
};

export const calculateConfidence = (score: number): number => {
  // Confidence is higher when score is close to 0 or 1
  return 1 - 2 * Math.abs(score - 0.5);
};
