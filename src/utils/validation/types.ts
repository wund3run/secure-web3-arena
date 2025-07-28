// Types for productionValidation
export interface AuditRequestData {
  project_name?: string;
  project_description?: string;
  blockchain?: string;
  client_id?: string;
  budget?: number;
  deadline?: string;
  repository_url?: string;
  audit_scope?: string;
  specific_concerns?: string;
}

export interface AuditorProfileData {
  user_id?: string;
  years_experience?: number;
  hourly_rate_min?: number;
  hourly_rate_max?: number;
  portfolio_url?: string;
  bio?: string;
  business_name?: string;
  specialization_tags?: string[];
  blockchain_expertise?: string[];
}
export type ValidationSeverity = 'high' | 'medium' | 'low';

export type ValidationType = 
  | 'ui' 
  | 'functionality' 
  | 'performance' 
  | 'security' 
  | 'accessibility' 
  | 'content'
  | 'navigation'
  | 'responsive'
  | 'link'
  | 'interactive'
  | 'seo';

export type StakeholderType = 
  | 'general' 
  | 'auditor' 
  | 'project-owner' 
  | 'admin'
  | 'developer'
  | 'end-users'
  | 'compliance';

export interface ValidationIssue {
  type: ValidationType;
  severity: ValidationSeverity;
  description: string;
  location: string;
  suggestion?: string;
  affectedStakeholders?: StakeholderType[];
  wcagCriterion?: string;
}

export interface ValidationResult {
  issues: ValidationIssue[];
  isValidating: boolean;
}
