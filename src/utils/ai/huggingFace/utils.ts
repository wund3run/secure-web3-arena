
import { AuditorProfileInput } from './types';

export const calculateCosineSimilarity = (vectorA: number[], vectorB: number[]): number => {
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
};

export const generateRecommendationReason = (
  auditor: AuditorProfileInput,
  semanticScore: number,
  projectDescription: string
): string => {
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
};

export const calculateRecommendationConfidence = (
  semanticScore: number, 
  auditor: AuditorProfileInput
): number => {
  let confidence = semanticScore * 0.7;
  
  // Boost confidence based on auditor profile completeness
  if (auditor.specializations.length > 3) confidence += 0.1;
  if (auditor.experience.length > 100) confidence += 0.1;
  if (auditor.description.length > 200) confidence += 0.1;
  
  return Math.min(1, confidence);
};

export const buildAuditorText = (auditor: AuditorProfileInput): string => {
  return `${auditor.description} Specializations: ${auditor.specializations.join(', ')} Experience: ${auditor.experience}`;
};
