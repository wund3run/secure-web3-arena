
import { ValidationIssue } from "../types";

/**
 * Validates responsive design elements
 */
export const validateResponsiveDesign = (): ValidationIssue[] => {
  // Simple check for viewport meta tag
  const hasViewportMeta = document.querySelector('meta[name="viewport"]') !== null;
  
  const responsiveIssues: ValidationIssue[] = [];
  
  if (!hasViewportMeta) {
    responsiveIssues.push({
      type: 'responsive',
      severity: 'high',
      description: 'Missing viewport meta tag for responsive design',
      location: 'HTML head',
      suggestion: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0">'
    });
  }
  
  return responsiveIssues;
};
