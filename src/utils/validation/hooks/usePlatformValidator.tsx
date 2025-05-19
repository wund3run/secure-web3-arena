
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ValidationIssue } from "../types";
import { 
  validateRoutes, 
  validateResponsiveDesign, 
  validateCurrentPage, 
  validateConsistency 
} from "../validators";

export function usePlatformValidator() {
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [isValidating, setIsValidating] = useState(false);
  const location = useLocation();

  const runValidation = () => {
    setIsValidating(true);
    
    // Combine all validation checks
    const allIssues = [
      ...validateRoutes(),
      ...validateResponsiveDesign(),
      ...validateCurrentPage(location.pathname),
      ...validateConsistency(location.pathname)
    ];
    
    setIssues(allIssues);
    setIsValidating(false);
    return allIssues;
  };

  useEffect(() => {
    // Re-validate when route changes
    const timer = setTimeout(() => {
      runValidation();
    }, 500); // Delay to ensure page is rendered
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return {
    issues,
    isValidating,
    runValidation
  };
}
