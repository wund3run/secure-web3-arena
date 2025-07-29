
import { ValidationIssue } from "./types";
import { validateAllStakeholderExperiences } from "./validators/stakeholder-validator";
import { validateRoutes } from "./validators/route-validator";
import { validateResponsiveDesign } from "./validators/responsive-validator";
import { validateCurrentPage } from "./validators/page-validator";
import { validateAccessibility } from "./validators/accessibility-validator";

/**
 * Interface for the full UI/UX audit report
 */
export interface UXAuditReport {
  timestamp: Date;
  totalIssues: number;
  criticalIssues: number;
  highPriorityIssues: number;
  mediumPriorityIssues: number;
  lowPriorityIssues: number;
  routeIssues: ValidationIssue[];
  accessibilityIssues: ValidationIssue[];
  responsiveIssues: ValidationIssue[];
  stakeholderIssues: ValidationIssue[];
  generalIssues: ValidationIssue[];
  suggestedFixes: string[];
}

/**
 * Generates a comprehensive UI/UX audit report for the current page
 * @param pathname Current page path
 * @returns Complete UX audit report
 */
export const generateUXAuditReport = (pathname: string): UXAuditReport => {
  // Collect issues from all validators
  const routeIssues = validateRoutes();
  const accessibilityIssues = validateAccessibility();
  const responsiveIssues = validateResponsiveDesign();
  const stakeholderIssues = validateAllStakeholderExperiences();
  const generalIssues = validateCurrentPage(pathname);
  
  // Combine all issues
  const allIssues = [
    ...routeIssues,
    ...accessibilityIssues,
    ...responsiveIssues,
    ...stakeholderIssues,
    ...generalIssues
  ];
  
  // Count issues by severity
  const criticalIssues = allIssues.filter(issue => 
    issue.severity === 'high' && 
    (issue.type === 'accessibility' || issue.type === 'navigation')
  ).length;
  
  const highPriorityIssues = allIssues.filter(issue => issue.severity === 'high').length;
  const mediumPriorityIssues = allIssues.filter(issue => issue.severity === 'medium').length;
  const lowPriorityIssues = allIssues.filter(issue => issue.severity === 'low').length;
  
  // Generate suggested fixes
  const suggestedFixes = allIssues
    .filter(issue => issue.suggestion)
    .map(issue => `${issue.suggestion} (${issue.location})`)
    .filter((fix, index, self) => self.indexOf(fix) === index); // Remove duplicates
  
  return {
    timestamp: new Date(),
    totalIssues: allIssues.length,
    criticalIssues,
    highPriorityIssues,
    mediumPriorityIssues,
    lowPriorityIssues,
    routeIssues,
    accessibilityIssues,
    responsiveIssues,
    stakeholderIssues,
    generalIssues,
    suggestedFixes
  };
};
