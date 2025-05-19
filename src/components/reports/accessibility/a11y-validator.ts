
import { ValidationIssue } from "@/utils/validation/types";
import { handleAccessibilityError } from "@/utils/error-handling/accessibilityErrorHandler";

/**
 * Helper functions to work with accessibility validation issues
 */

/**
 * Filter issues by severity
 */
export const filterIssuesBySeverity = (
  issues: ValidationIssue[],
  severity: "high" | "medium" | "low"
): ValidationIssue[] => {
  return issues.filter(issue => issue.severity === severity);
};

/**
 * Group issues by type
 */
export const groupIssuesByType = (
  issues: ValidationIssue[]
): Record<string, ValidationIssue[]> => {
  const groupedIssues: Record<string, ValidationIssue[]> = {};
  
  issues.forEach(issue => {
    if (!groupedIssues[issue.type]) {
      groupedIssues[issue.type] = [];
    }
    groupedIssues[issue.type].push(issue);
  });
  
  return groupedIssues;
};

/**
 * Get count of issues by severity
 */
export const getIssueCountsBySeverity = (
  issues: ValidationIssue[]
): { high: number; medium: number; low: number } => {
  return {
    high: filterIssuesBySeverity(issues, "high").length,
    medium: filterIssuesBySeverity(issues, "medium").length,
    low: filterIssuesBySeverity(issues, "low").length,
  };
};

/**
 * Get issue summary for reporting
 */
export const getIssueSummary = (issues: ValidationIssue[]): string => {
  const { high, medium, low } = getIssueCountsBySeverity(issues);
  
  if (issues.length === 0) {
    return "No accessibility issues found.";
  }
  
  return `Found ${high} high, ${medium} medium, and ${low} low severity issues.`;
};

/**
 * Report issues to error handler
 */
export const reportAccessibilityIssues = (issues: ValidationIssue[]): void => {
  issues.forEach(issue => {
    if (issue.severity === "high") {
      handleAccessibilityError(new Error(issue.description), {
        elementIdentifier: issue.location,
        wcagCriterion: issue.wcagCriterion,
        attemptAutoFix: true
      });
    }
  });
};

/**
 * Create a new validation issue
 */
export const createValidationIssue = (
  description: string,
  type: string,
  severity: "high" | "medium" | "low",
  location: string,
  suggestion?: string,
  wcagCriterion?: string
): ValidationIssue => {
  return {
    description,
    type,
    severity,
    location,
    suggestion,
    wcagCriterion,
  };
};
