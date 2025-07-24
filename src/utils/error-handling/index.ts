/**
 * Error handling utilities for consistent error management across the application
 */

// Re-export error categories and main utilities
export { 
  ErrorCategory, 
  ApiError, 
  withErrorHandling
} from "./apiErrorHandler";

// Import createErrorHandler separately to check if it exists
import { createErrorHandler } from "./apiErrorHandler";

// Export new accessibility-focused error handling
export const handleAccessibilityError = (error: unknown, context: string) => {
  console.error(`Accessibility error in ${context}:`, error);
  // Log accessibility-specific errors
};

// Legacy compatibility exports
export const handleError = (error: unknown, context?: string) => {
  console.error(`Error in ${context || 'application'}:`, error);
  // Could extend this to report to monitoring service if needed
};
export const createBoundary = createErrorHandler;
