
import { toast } from "sonner";
import { MarketplaceErrorBoundary, useMarketplaceError } from "@/components/marketplace/error-handling";
import { ErrorBoundary } from "@/components/ui/error-boundary";

// Re-export components for consistent usage
export { 
  MarketplaceErrorBoundary, 
  ErrorBoundary, 
  useMarketplaceError 
};

// Handle errors with consistent toast notifications
export const handleError = (error: unknown, context = "application") => {
  console.error(`Error in ${context}:`, error);
  
  let errorMessage = "An unexpected error occurred";
  
  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }
  
  toast.error("Error", {
    description: errorMessage.substring(0, 100), // Limit very long messages
    id: `error-${Date.now()}` // Ensure unique IDs
  });
  
  return errorMessage;
};

// Wrap async functions with error handling
export async function withErrorHandling<T>(
  asyncFn: () => Promise<T>,
  context = "operation",
  customMessage?: string
): Promise<T | null> {
  try {
    return await asyncFn();
  } catch (error) {
    const message = customMessage || (error instanceof Error ? error.message : "An unexpected error occurred");
    handleError(error, context);
    return null;
  }
}

// Create a utility to help standardize error boundary usage
export const createBoundary = (component: React.ReactNode, fallback?: React.ReactNode) => {
  return (
    <ErrorBoundary fallback={fallback}>
      {component}
    </ErrorBoundary>
  );
};
