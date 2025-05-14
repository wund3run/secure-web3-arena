
/**
 * Centralized toast utility for consistent notifications across the application
 * This standardizes toast usage by exporting from sonner
 */
import { toast } from "sonner";

// Re-export toast for consistent usage
export { toast };

// Helper function for displaying error messages
export const showErrorToast = (message: string, description?: string) => {
  toast.error(message, {
    description: description || undefined,
    duration: 5000,
  });
};

// Helper function for displaying success messages
export const showSuccessToast = (message: string, description?: string) => {
  toast.success(message, {
    description: description || undefined,
    duration: 3000,
  });
};

// Helper function for displaying info messages
export const showInfoToast = (message: string, description?: string) => {
  toast.info(message, {
    description: description || undefined,
    duration: 4000,
  });
};
