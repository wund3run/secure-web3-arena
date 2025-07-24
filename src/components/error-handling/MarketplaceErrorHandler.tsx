import { useEffect } from "react";
import { handleError } from "@/utils/error-handling/index";

export interface ErrorHandlerProps {
  error: Error | null;
  context?: string;
  retry?: () => void;
  clearError?: () => void;
}

/**
 * A centralized error handler for marketplace components
 * This handler processes errors and displays appropriate toast notifications
 */
export function MarketplaceErrorHandler({ 
  error, 
  context = "operation", 
  retry, 
  clearError 
}: ErrorHandlerProps) {
  useEffect(() => {
    if (!error) return;
    
    // Use the centralized error handling utility
    handleError(error, `marketplace ${context}`);
    // Remove direct toast.error usage here. Let error context or withErrorHandling handle user feedback.
    return () => {
      if (clearError) clearError();
    };
  }, [error, context, retry, clearError]);
  
  // This component doesn't render anything, just handles errors
  return null;
} 