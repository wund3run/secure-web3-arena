
import { toast } from "sonner";
import { useEffect } from "react";
import { handleError } from "@/utils/error-handling";

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
    
    // Show appropriate toast message with retry action if available
    const isNetworkError = error.message.includes("network") || 
                          error.message.includes("fetch") ||
                          error.message.includes("connection");
    
    if (isNetworkError) {
      toast.error("Network connection issue", {
        description: "Please check your internet connection and try again",
        action: retry ? {
          label: "Retry",
          onClick: () => {
            if (retry) retry();
            if (clearError) clearError();
          }
        } : undefined
      });
    }
    
    return () => {
      if (clearError) clearError();
    };
  }, [error, context, retry, clearError]);
  
  // This component doesn't render anything, just handles errors
  return null;
}
