
/**
 * Common types for platform validation
 */

export type ValidationIssue = {
  type: 'route' | 'link' | 'ui' | 'responsive' | 'styling' | 'interactive' | 'accessibility' | 'design' | 'navigation' | 'content' | 'performance' | 'seo' | 'functionality';
  severity: 'high' | 'medium' | 'low';
  description: string;
  location: string;
  suggestion?: string;
  affectedStakeholders?: StakeholderType[];
  wcagCriterion?: string; // Accessibility validation property
};

export type ValidationResult = {
  issues: ValidationIssue[];
  isValidating: boolean;
};

export type StakeholderType = 'auditor' | 'project-owner' | 'admin' | 'general';

// Add stakeholder-specific needs and preferences
export type StakeholderProfile = {
  type: StakeholderType;
  primaryGoals: string[];
  keyMetrics: string[];
  preferredFeatures: string[];
  commonJourney: string[];
};
