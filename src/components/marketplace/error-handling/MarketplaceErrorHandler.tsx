
import { toast } from "sonner";
import { useEffect } from "react";

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
    
    // Log error to console for debugging
    console.error(`Marketplace error in ${context}:`, error);
    
    // Determine if error is network related
    const isNetworkError = error.message.includes("network") || 
                          error.message.includes("fetch") ||
                          error.message.includes("connection");
    
    // Show appropriate toast message
    if (isNetworkError) {
      toast.error("Network connection issue", {
        description: "Please check your internet connection and try again",
        action: retry ? {
          label: "Retry",
          onClick: () => {
            retry();
            if (clearError) clearError();
          }
        } : undefined
      });
    } else {
      toast.error(`Error in marketplace ${context}`, {
        description: error.message.substring(0, 100), // Truncate very long messages
        action: retry ? {
          label: "Retry",
          onClick: () => {
            retry();
            if (clearError) clearError();
          }
        } : undefined
      });
    }
    
    // Clean up error after display
    return () => {
      if (clearError) clearError();
    };
  }, [error, context, retry, clearError]);
  
  // This component doesn't render anything, just handles errors
  return null;
}
