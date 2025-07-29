
export interface EnhancedMatchingCriteria {
  blockchain: string;
  project_type: string;
  project_description: string;
  budget_range: [number, number];
  timeline: string;
  complexity: 'low' | 'medium' | 'high';
  specific_requirements: string[];
  quality_threshold: number;
  experience_preference: 'junior' | 'mid' | 'senior' | 'expert';
  audit_type: string[];
}

export interface AuditorProfile {
  id: string;
  name: string;
  description: string;
  expertise: string[];
  experience_years: number;
  rating: number;
  hourly_rate: number;
  availability: 'available' | 'busy' | 'unavailable';
  specializations: string[];
  past_audits: number;
  success_rate: number;
  response_time_avg: number;
  blockchain_expertise: string[];
}

export interface EnhancedMatchResult {
  auditor: AuditorProfile;
  tf_confidence_score: number;
  semantic_score: number;
  combined_score: number;
  recommendation_reason: string;
  feature_importance: Record<string, number>;
  precision_metrics: {
    precision: number;
    recall: number;
    f1_score: number;
  };
}
