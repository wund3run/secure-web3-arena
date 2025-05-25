
import { toast } from "sonner";
import { MarketplaceErrorBoundary, useMarketplaceError } from "@/components/marketplace/error-handling";
import ErrorBoundary from "@/components/ui/error-boundary";
import { ComprehensiveErrorBoundary } from "@/components/error/comprehensive-error-boundary";
import { EnhancedToastSystem } from "@/components/ui/enhanced-toast-system";
import React from "react";

// Re-export components for consistent usage
export { 
  MarketplaceErrorBoundary, 
  ErrorBoundary,
  ComprehensiveErrorBoundary,
  useMarketplaceError 
};

// Categorize errors for better user feedback
export enum ErrorCategory {
  Network = "network",
  Authentication = "auth",
  Database = "database",
  Validation = "validation",
  Unknown = "unknown"
}

// Enhanced centralized error handler with improved categorization
export const handleError = (error: unknown, context = "application") => {
  console.error(`Error in ${context}:`, error);
  
  let errorMessage = "An unexpected error occurred";
  let category = ErrorCategory.Unknown;
  
  if (error instanceof Error) {
    errorMessage = error.message;
    
    // Categorize common errors
    if (errorMessage.includes("network") || 
        errorMessage.includes("fetch") || 
        errorMessage.includes("connection")) {
      category = ErrorCategory.Network;
      EnhancedToastSystem.networkError(() => window.location.reload());
      return { message: errorMessage, category };
    } else if (errorMessage.includes("auth") || 
               errorMessage.includes("unauthorized") || 
               errorMessage.includes("permission")) {
      category = ErrorCategory.Authentication;
      EnhancedToastSystem.sessionExpired();
      return { message: errorMessage, category };
    } else if (errorMessage.includes("database") || 
               errorMessage.includes("query") || 
               errorMessage.includes("supabase")) {
      category = ErrorCategory.Database;
    } else if (errorMessage.includes("validation") || 
               errorMessage.includes("invalid")) {
      category = ErrorCategory.Validation;
    }
  } else if (typeof error === 'string') {
    errorMessage = error;
  }
  
  // Show appropriate toast with enhanced system
  EnhancedToastSystem.error(
    "Error",
    errorMessage.substring(0, 100) // Limit very long messages
  );
  
  return {
    message: errorMessage,
    category
  };
};

// Enhanced async wrapper with retry functionality
export async function withErrorHandling<T>(
  asyncFn: () => Promise<T>,
  context = "operation",
  customMessage?: string,
  retries = 0
): Promise<T | null> {
  try {
    return await asyncFn();
  } catch (error) {
    const message = customMessage || (error instanceof Error ? error.message : "An unexpected error occurred");
    const result = handleError(error, context);
    
    // Implement retry for network errors
    if (result.category === ErrorCategory.Network && retries > 0) {
      console.log(`Retrying ${context} (${retries} attempts left)...`);
      return withErrorHandling(asyncFn, context, customMessage, retries - 1);
    }
    
    return null;
  }
}

// Create a utility to help standardize error boundary usage
export const createBoundary = (component: React.ReactNode, fallback?: React.ReactNode): React.ReactElement => {
  return React.createElement(
    ComprehensiveErrorBoundary,
    { 
      fallback,
      children: component
    }
  );
};

// Helper to log errors to an analytics service if needed
export const logErrorToAnalytics = (error: unknown, context: string) => {
  // This would connect to your analytics service
  console.log(`[Analytics] Error in ${context}:`, error);
  // In production, implement actual analytics logging
};
