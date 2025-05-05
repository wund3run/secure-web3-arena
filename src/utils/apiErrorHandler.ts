
import { toast } from "sonner";
import { PostgrestError } from "@supabase/supabase-js";

/**
 * Handles API errors consistently across the application
 */
export const handleApiError = (
  error: Error | PostgrestError | unknown,
  customMessage?: string
): void => {
  console.error("API Error:", error);
  
  // Default error message
  let displayMessage = "An unexpected error occurred. Please try again.";
  
  // Handle Supabase PostgrestError
  if (typeof error === "object" && error !== null && "message" in error) {
    const errorMsg = (error as { message: string }).message;
    
    // Check for common error patterns
    if (errorMsg.includes("violates foreign key constraint")) {
      displayMessage = "This operation references invalid or deleted data.";
    } else if (errorMsg.includes("violates unique constraint")) {
      displayMessage = "This record already exists.";
    } else if (errorMsg.includes("violates not-null constraint")) {
      displayMessage = "Missing required information.";
    } else if (errorMsg.includes("permission denied")) {
      displayMessage = "You don't have permission to perform this action.";
    } else if (errorMsg.includes("JWT expired")) {
      displayMessage = "Your session has expired. Please sign in again.";
    } else {
      // Use the actual error message if available
      displayMessage = errorMsg;
    }
  }
  
  // Use custom message if provided
  if (customMessage) {
    displayMessage = customMessage;
  }
  
  // Show toast notification with error message
  toast.error("Error", {
    description: displayMessage,
  });
};

/**
 * Wraps an async function with error handling
 */
export async function withErrorHandling<T>(
  fn: () => Promise<T>,
  customMessage?: string
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    handleApiError(error, customMessage);
    return null;
  }
}
