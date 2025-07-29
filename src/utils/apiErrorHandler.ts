import { toast } from "sonner";
import { PostgrestError } from "@supabase/supabase-js";

export enum ErrorCategory {
  Network = 'network',
  Authentication = 'authentication',
  Validation = 'validation',
  Database = 'database',
  RateLimit = 'rate-limit',
  Unknown = 'unknown'
}

interface ErrorHandlerOptions {
  customMessage?: string;
  retryable?: boolean;
  context?: string;
  silent?: boolean;
}

/**
 * Enhanced API error handler with detailed error categorization and retry support
 */
export const handleApiError = (
  error: Error | PostgrestError | unknown,
  options: ErrorHandlerOptions = {}
): { category: ErrorCategory; retryable: boolean } => {
  const { customMessage, retryable = true, context = 'API', silent = false } = options;
  
  // Log error with context
  console.error(`${context} Error:`, error);
  
  // Default values
  let displayMessage = customMessage || "An unexpected error occurred. Please try again.";
  let category = ErrorCategory.Unknown;
  let shouldRetry = retryable;
  let actionable = false;
  
  // Handle different error types
  if (error instanceof Error || (typeof error === "object" && error !== null && "message" in error)) {
    const errorMsg = (error as { message: string }).message.toLowerCase();
    
    // Network errors
    if (errorMsg.includes('network') || errorMsg.includes('fetch') || errorMsg.includes('timeout')) {
      category = ErrorCategory.Network;
      displayMessage = "Network connection issue. Please check your internet connection.";
      shouldRetry = true;
      actionable = true;
    }
    // Authentication errors
    else if (errorMsg.includes('unauthorized') || errorMsg.includes('unauthenticated') || 
             errorMsg.includes('permission') || errorMsg.includes('jwt')) {
      category = ErrorCategory.Authentication;
      displayMessage = "Authentication required. Please sign in again.";
      shouldRetry = false;
      actionable = true;
    }
    // Database errors
    else if (errorMsg.includes('foreign key constraint')) {
      category = ErrorCategory.Database;
      displayMessage = "This operation references invalid or deleted data.";
      shouldRetry = false;
    }
    else if (errorMsg.includes('unique constraint')) {
      category = ErrorCategory.Validation;
      displayMessage = "This record already exists.";
      shouldRetry = false;
      actionable = true;
    }
    else if (errorMsg.includes('not-null constraint')) {
      category = ErrorCategory.Validation;
      displayMessage = "Missing required information.";
      shouldRetry = false;
      actionable = true;
    }
    // Rate limiting
    else if (errorMsg.includes('rate limit') || errorMsg.includes('too many requests')) {
      category = ErrorCategory.RateLimit;
      displayMessage = "Too many requests. Please try again later.";
      shouldRetry = true;
      actionable = false;
    }
  }
  
  // Show toast notification unless silent mode is enabled
  if (!silent) {
    toast.error("Error", {
      description: displayMessage,
      id: `api-error-${Date.now()}-${category}`,
      action: actionable ? {
        label: category === ErrorCategory.Authentication ? "Sign In" : 
               category === ErrorCategory.Network ? "Retry" : "Dismiss",
        onClick: () => {
          if (category === ErrorCategory.Authentication) {
            window.location.href = "/auth";
          } else if (category === ErrorCategory.Network) {
            window.location.reload();
          }
        }
      } : undefined
    });
  }
  
  return { category, retryable: shouldRetry };
};

/**
 * Wraps an async function with enhanced error handling and retry capability
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  options: ErrorHandlerOptions & { maxRetries?: number } = {}
): Promise<T | null> {
  const { maxRetries = 3, ...handlerOptions } = options;
  let retries = 0;
  
  while (retries <= maxRetries) {
    try {
      return await fn();
    } catch (error) {
      const { category, retryable } = handleApiError(error, {
        ...handlerOptions,
        silent: retries < maxRetries // Only show error on final retry
      });
      
      if (!retryable || retries >= maxRetries) {
        return null;
      }
      
      // Exponential backoff
      const delay = Math.min(1000 * Math.pow(2, retries), 10000);
      await new Promise(resolve => setTimeout(resolve, delay));
      retries++;
    }
  }
  
  return null;
}
