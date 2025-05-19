
/**
 * Common types for platform validation
 */

export type ValidationIssue = {
  type: 'route' | 'link' | 'ui' | 'responsive' | 'styling' | 'interactive';
  severity: 'high' | 'medium' | 'low';
  description: string;
  location: string;
  suggestion?: string;
};

export type ValidationResult = {
  issues: ValidationIssue[];
  isValidating: boolean;
};
