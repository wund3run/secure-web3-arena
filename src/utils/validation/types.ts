
export type ValidationIssue = {
  type: 'ui' | 'functionality' | 'navigation' | 'responsive' | 'content' | 'accessibility' | 'interactive' | 'link' | 'seo' | 'performance';
  severity: 'high' | 'medium' | 'low';
  description: string;
  location: string;
  suggestion: string;
  affectedStakeholders?: StakeholderType[];
  wcagCriterion?: string;
};

export type StakeholderType = 'auditor' | 'project-owner' | 'admin' | 'general';

// Add the ValidationResult type that's being referenced in index.ts
export interface ValidationResult {
  issues: ValidationIssue[];
  isValidating: boolean;
}
