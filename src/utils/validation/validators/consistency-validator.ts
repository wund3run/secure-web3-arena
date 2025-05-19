
import { ValidationIssue } from "../types";

/**
 * Validates UI consistency across the page
 */
export const validateConsistency = (pathname: string): ValidationIssue[] => {
  const consistencyIssues: ValidationIssue[] = [];
  
  // Check for inconsistent heading hierarchy
  const h1Count = document.querySelectorAll('h1').length;
  
  if (h1Count === 0) {
    consistencyIssues.push({
      type: 'styling',
      severity: 'medium',
      description: 'Page missing main heading (h1)',
      location: pathname,
      suggestion: 'Add a primary h1 heading for accessibility and SEO'
    });
  } else if (h1Count > 1) {
    consistencyIssues.push({
      type: 'styling',
      severity: 'low',
      description: 'Multiple h1 headings on page',
      location: pathname,
      suggestion: 'Use only one h1 per page for proper document structure'
    });
  }
  
  return consistencyIssues;
};
