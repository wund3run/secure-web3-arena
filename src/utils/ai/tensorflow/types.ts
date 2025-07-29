
export interface AuditorFeatures {
  experience_years: number;
  success_rate: number;
  response_time_avg: number;
  hourly_rate: number;
  past_audits: number;
  blockchain_expertise_score: number;
  skill_match_score: number;
  availability_score: number;
}

export interface ProjectFeatures {
  complexity_score: number;
  budget_range: number;
  timeline_urgency: number;
  blockchain_type: number;
  required_expertise_level: number;
}

export interface PredictionResult {
  matchScore: number;
  confidence: number;
  featureImportance: Record<string, number>;
}

export interface ModelMetrics {
  precision: number;
  recall: number;
  f1Score: number;
  accuracy: number;
}

export interface TrainingData {
  features: number[][];
  labels: number[];
}
