
import { ValidationIssue } from "../types";

/**
 * Validates the consistency of UI elements across the platform
 */
export const validateConsistency = (pathname: string): ValidationIssue[] => {
  const consistencyIssues: ValidationIssue[] = [];
  
  // Check for consistent heading hierarchy
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const headingLevels = new Set();
  headings.forEach(heading => {
    const level = parseInt(heading.tagName.substring(1));
    headingLevels.add(level);
  });
  
  // Check if there are gaps in heading levels (e.g., h1 -> h3 without h2)
  const levels = Array.from(headingLevels).sort();
  for (let i = 1; i < levels.length; i++) {
    if (levels[i] - levels[i-1] > 1) {
      consistencyIssues.push({
        type: 'accessibility',
        severity: 'medium',
        description: `Heading hierarchy has gaps (h${levels[i-1]} -> h${levels[i]})`,
        location: pathname,
        suggestion: 'Ensure heading levels are sequential for proper document structure'
      });
      break;
    }
  }
  
  // Check for mixing different button styles in similar contexts
  const primaryButtons = document.querySelectorAll('.btn-primary, .bg-primary, [class*="bg-primary"]');
  const primaryButtonStyles = new Set();
  primaryButtons.forEach(button => {
    primaryButtonStyles.add(button.getAttribute('class'));
  });
  
  if (primaryButtonStyles.size > 3) {
    consistencyIssues.push({
      type: 'design',
      severity: 'low',
      description: 'Multiple different primary button styles detected',
      location: pathname,
      suggestion: 'Standardize button styles for visual consistency'
    });
  }
  
  // Check for consistent text formatting
  const paragraphs = document.querySelectorAll('p');
  const paragraphClasses = new Set();
  paragraphs.forEach(p => {
    paragraphClasses.add(p.getAttribute('class'));
  });
  
  if (paragraphClasses.size > 5) {
    consistencyIssues.push({
      type: 'design',
      severity: 'low',
      description: 'Many different paragraph styling patterns detected',
      location: pathname,
      suggestion: 'Standardize typography using consistent text classes'
    });
  }
  
  return consistencyIssues;
};
