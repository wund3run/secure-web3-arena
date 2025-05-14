
/**
 * Centralized toast utility for consistent notifications across the application
 */
import { toast } from "sonner";

// Re-export toast for consistent usage
export { toast };

// Helper functions for different toast types
export const showErrorToast = (message: string, description?: string) => {
  toast.error(message, {
    description: description || undefined,
    duration: 5000,
    className: "accessible-toast error-toast", // Add class for styling and accessibility hooks
  });
};

export const showSuccessToast = (message: string, description?: string) => {
  toast.success(message, {
    description: description || undefined,
    duration: 3000,
    className: "accessible-toast success-toast", // Add class for styling and accessibility hooks
  });
};

export const showInfoToast = (message: string, description?: string) => {
  toast.info(message, {
    description: description || undefined,
    duration: 4000,
    className: "accessible-toast info-toast", // Add class for styling and accessibility hooks
  });
};
