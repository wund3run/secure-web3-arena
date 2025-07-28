
import { toast as sonnerToast } from "sonner";

export type ToastProps = {
  id?: string | number;
  title: string;
  description?: string;
  action?: React.ReactNode;
  variant?: "default" | "error" | "success" | "warning" | "info";
};

export function useToast() {
  const toast = ({ id, title, description, action, variant = "default" }: ToastProps) => {
    // Ensure the ID is always a string when passed to sonnerToast
    const stringId = id?.toString();
    
    return sonnerToast(title, {
      id: stringId,
      description,
      action,
      className: cn(
        "toast-container",
        variant === "error" && "error",
        variant === "success" && "success",
        variant === "warning" && "warning",
        variant === "info" && "info"
      ),
    });
  };

  // Function to dismiss a toast programmatically
  const dismiss = (toastId?: string | number) => {
    // Convert number to string if needed
    const stringId = toastId?.toString();
    sonnerToast.dismiss(stringId);
  };

  return {
    toast,
    dismiss,
  };
}

// Helper function for class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
