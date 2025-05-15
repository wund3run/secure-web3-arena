
/**
 * Error handling utilities for consistent error management across the application
 */

// Re-export API error handler
export { handleApiError, withErrorHandling } from "../apiErrorHandler";

// Re-export error categories
export { ErrorCategory } from "../error-handling";

// Re-export marketplace error components
export {
  MarketplaceErrorBoundary,
  MarketplaceErrorHandler,
  useMarketplaceError,
} from "@/components/marketplace/error-handling";

// Re-export base error boundary
export { default as ErrorBoundary } from "@/components/ui/error-boundary";

// Re-export utility functions
export { 
  handleError, 
  createBoundary,
  logErrorToAnalytics 
} from "../error-handling";

// Export new accessibility-focused error handling
export { handleAccessibilityError } from "./accessibilityErrorHandler";
