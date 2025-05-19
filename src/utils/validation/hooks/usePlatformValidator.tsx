
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ValidationIssue, StakeholderType } from "../types";
import { 
  validateRoutes, 
  validateResponsiveDesign, 
  validateCurrentPage, 
  validateConsistency,
  validatePerformance 
} from "../validators";

export interface UsePlatformValidatorOptions {
  stakeholderType?: StakeholderType;
  runOnMount?: boolean;
  includePerformance?: boolean;
  filterBySeverity?: ('high' | 'medium' | 'low')[];
}

export function usePlatformValidator(options: UsePlatformValidatorOptions = {}) {
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const [lastValidated, setLastValidated] = useState<Date | null>(null);
  const location = useLocation();
  
  const {
    stakeholderType,
    runOnMount = true,
    includePerformance = false,
    filterBySeverity
  } = options;

  const runValidation = () => {
    setIsValidating(true);
    
    // Start with basic validation checks
    let allIssues = [
      ...validateRoutes(),
      ...validateResponsiveDesign(),
      ...validateCurrentPage(location.pathname),
      ...validateConsistency(location.pathname)
    ];
    
    // Include performance checks if enabled
    if (includePerformance) {
      allIssues = [...allIssues, ...validatePerformance()];
    }
    
    // Filter by stakeholder if specified
    if (stakeholderType) {
      allIssues = allIssues.filter(issue => 
        !issue.affectedStakeholders || 
        issue.affectedStakeholders.includes(stakeholderType)
      );
    }
    
    // Filter by severity if specified
    if (filterBySeverity && filterBySeverity.length > 0) {
      allIssues = allIssues.filter(issue => filterBySeverity.includes(issue.severity));
    }
    
    setIssues(allIssues);
    setLastValidated(new Date());
    setIsValidating(false);
    return allIssues;
  };

  useEffect(() => {
    // Re-validate when route changes if not disabled
    if (runOnMount) {
      const timer = setTimeout(() => {
        runValidation();
      }, 500); // Delay to ensure page is rendered
      
      return () => clearTimeout(timer);
    }
  }, [location.pathname, runOnMount]);

  return {
    issues,
    isValidating,
    lastValidated,
    runValidation
  };
}
