
import { AuditorFeatures, ProjectFeatures, TrainingData } from './types';

export const generateSyntheticTrainingData = (numSamples: number): TrainingData => {
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
    const successProbability = calculateSyntheticSuccess(auditorFeatures, projectFeatures);
    
    const featureVector = normalizeFeatures(auditorFeatures, projectFeatures);

    features.push(featureVector);
    labels.push(successProbability > 0.7 ? 1 : 0);
  }

  return { features, labels };
};

export const normalizeFeatures = (auditorFeatures: AuditorFeatures, projectFeatures: ProjectFeatures): number[] => {
  return [
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
};

const calculateSyntheticSuccess = (auditor: AuditorFeatures, project: ProjectFeatures): number => {
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
};
