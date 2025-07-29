
/**
 * Centralized toast utility for consistent notifications across the application
 */
import { EnhancedToastSystem } from "@/components/ui/enhanced-toast-system";
import { toast } from "sonner";

// Re-export enhanced toast system as primary interface
export { EnhancedToastSystem as toast };

// Legacy compatibility functions
export const showErrorToast = (message: string, description?: string) => {
  EnhancedToastSystem.error(message, description);
};

export const showSuccessToast = (message: string, description?: string) => {
  EnhancedToastSystem.success(message, description);
};

export const showInfoToast = (message: string, description?: string) => {
  EnhancedToastSystem.info(message, description);
};

export const showWarningToast = (message: string, description?: string) => {
  EnhancedToastSystem.warning(message, description);
};

// Re-export original toast for backward compatibility
export { toast as sonnerToast };
