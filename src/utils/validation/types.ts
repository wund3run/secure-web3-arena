
export type ValidationSeverity = 'high' | 'medium' | 'low';

export type ValidationType = 
  | 'ui' 
  | 'functionality' 
  | 'performance' 
  | 'security' 
  | 'accessibility' 
  | 'content'
  | 'navigation';

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
}

export interface ValidationResult {
  issues: ValidationIssue[];
  isValidating: boolean;
}
