
import { ValidationIssue, ValidationResult, StakeholderType } from "./types";
import { validateRoutes } from "./validators/route-validator";
import { validateResponsiveDesign } from "./validators/responsive-validator"; 
import { validateCurrentPage } from "./validators/page-validator";
import { validateConsistency } from "./validators/consistency-validator";
import { validatePerformance } from "./validators/performance-validator";
import { usePlatformValidator, UsePlatformValidatorOptions } from "./hooks/usePlatformValidator";
import { PlatformValidatorWidget } from "./components/PlatformValidatorWidget";

// Export types
export type { 
  ValidationIssue, 
  ValidationResult,
  StakeholderType,
  UsePlatformValidatorOptions
};

// Export validators
export {
  usePlatformValidator,
  PlatformValidatorWidget,
  validateRoutes,
  validateResponsiveDesign,
  validateCurrentPage,
  validateConsistency,
  validatePerformance
};

// Export a comprehensive validation function that runs all checks
export const validateAll = (pathname: string): ValidationResult => {
  try {
    const issues = [
      ...validateRoutes(),
      ...validateResponsiveDesign(),
      ...validateCurrentPage(pathname),
      ...validateConsistency(pathname),
      ...validatePerformance()
    ];

    return {
      issues,
      isValidating: false
    };
  } catch (error) {
    console.error("Error in validation:", error);
    return {
      issues: [{
        type: 'ui',
        severity: 'high',
        description: 'Error occurred during validation',
        location: 'validation system',
        suggestion: 'Check console for details'
      }],
      isValidating: false
    };
  }
};
