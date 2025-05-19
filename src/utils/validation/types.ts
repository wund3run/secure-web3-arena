
/**
 * Common types for platform validation
 */

export type ValidationIssue = {
  type: 'route' | 'link' | 'ui' | 'responsive' | 'styling' | 'interactive' | 'accessibility' | 'design' | 'navigation' | 'content' | 'performance' | 'seo';
  severity: 'high' | 'medium' | 'low';
  description: string;
  location: string;
  suggestion?: string;
  affectedStakeholders?: ('auditor' | 'project-owner' | 'admin' | 'general')[];
};

export type ValidationResult = {
  issues: ValidationIssue[];
  isValidating: boolean;
};

export type StakeholderType = 'auditor' | 'project-owner' | 'admin' | 'general';
