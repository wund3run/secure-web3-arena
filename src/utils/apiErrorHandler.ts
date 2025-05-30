
import { toast } from "sonner";
import { PostgrestError } from "@supabase/supabase-js";
import { ErrorCategory } from "./error-handling";

/**
 * Enhanced API error handler with detailed error categorization
 */
export const handleApiError = (
  error: Error | PostgrestError | unknown,
  customMessage?: string
): void => {
  console.error("API Error:", error);
  
  // Default error message
  let displayMessage = "An unexpected error occurred. Please try again.";
  let category = ErrorCategory.UNKNOWN;
  let actionable = false;
  
  // Handle Supabase PostgrestError
  if (typeof error === "object" && error !== null && "message" in error) {
    const errorMsg = (error as { message: string }).message;
    
    // Check for common error patterns with more descriptive messages
    if (errorMsg.includes("violates foreign key constraint")) {
      displayMessage = "This operation references invalid or deleted data.";
      category = ErrorCategory.DATABASE;
    } else if (errorMsg.includes("violates unique constraint")) {
      displayMessage = "This record already exists.";
      category = ErrorCategory.VALIDATION;
      actionable = true;
    } else if (errorMsg.includes("violates not-null constraint")) {
      displayMessage = "Missing required information.";
      category = ErrorCategory.VALIDATION;
      actionable = true;
    } else if (errorMsg.includes("permission denied")) {
      displayMessage = "You don't have permission to perform this action.";
      category = ErrorCategory.AUTHENTICATION;
    } else if (errorMsg.includes("JWT expired")) {
      displayMessage = "Your session has expired. Please sign in again.";
      category = ErrorCategory.AUTHENTICATION;
      actionable = true;
    } else if (errorMsg.includes("network") || errorMsg.includes("fetch")) {
      displayMessage = "Network connection issue. Please check your internet connection.";
      category = ErrorCategory.NETWORK;
      actionable = true;
    } else {
      // Use the actual error message if available
      displayMessage = errorMsg;
    }
  }
  
  // Use custom message if provided
  if (customMessage) {
    displayMessage = customMessage;
  }
  
  // Show toast notification with appropriate action based on category
  toast.error("Error", {
    description: displayMessage,
    id: `api-error-${Date.now()}-${category}`,
    action: actionable ? {
      label: category === ErrorCategory.AUTHENTICATION ? "Sign In" : 
             category === ErrorCategory.NETWORK ? "Retry" : "Dismiss",
      onClick: () => {
        if (category === ErrorCategory.AUTHENTICATION) {
          window.location.href = "/auth";
        } else if (category === ErrorCategory.NETWORK) {
          window.location.reload();
        }
      }
    } : undefined
  });
  
  return;
};

/**
 * Wraps an async function with enhanced error handling and retry capability
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  customMessage?: string,
  retries = 1
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    handleApiError(error, customMessage);
    
    // Implement retry for certain errors
    if (retries > 0 && 
       (error instanceof Error && 
        (error.message.includes("network") || error.message.includes("fetch")))) {
      console.log(`Retrying operation (${retries} attempts left)...`);
      // Wait a bit before retrying
      await new Promise(resolve => setTimeout(resolve, 1000));
      return withErrorHandling(fn, customMessage, retries - 1);
    }
    
    return null;
  }
}
