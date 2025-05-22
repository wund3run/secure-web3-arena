
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
  | 'admin';

export interface ValidationIssue {
  type: ValidationType;
  severity: ValidationSeverity;
  description: string;
  location: string;
  suggestion?: string;
  affectedStakeholders?: StakeholderType[];
  wcagCriterion?: string; // Added this missing property
}

export interface ValidationResult {
  issues: ValidationIssue[];
  isValidating: boolean;
}
