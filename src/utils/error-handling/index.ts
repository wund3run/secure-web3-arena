
/**
 * Error handling utilities for consistent error management across the application
 */

// Re-export API error handler
export { handleApiError, withErrorHandling } from "@/utils/apiErrorHandler";

// Re-export marketplace error components
export {
  MarketplaceErrorBoundary,
  MarketplaceErrorHandler,
  useMarketplaceError,
} from "@/components/marketplace/error-handling";

// Re-export base error boundary
export { default as ErrorBoundary } from "@/components/ui/error-boundary";

