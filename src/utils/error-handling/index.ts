
/**
 * Error handling utilities for consistent error management across the application
 */

// Re-export error categories
export { ErrorCategory } from "../error-handling";

// Re-export utility functions
export { 
  handleError, 
  createBoundary,
  logErrorToAnalytics 
} from "../error-handling";

// Export new accessibility-focused error handling
export const handleAccessibilityError = (error: unknown, context: string) => {
  console.error(`Accessibility error in ${context}:`, error);
  // Log accessibility-specific errors
};
