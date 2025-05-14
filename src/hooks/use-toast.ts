
import * as React from "react"
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
  variant?: "default" | "destructive" | "success"
}

// Define our own toast options interface based on what sonner accepts
interface CustomToastOptions {
  description?: string;
  action?: React.ReactElement;
  className?: string;
  duration?: number;
}

// This is a compatibility layer for shadcn toast system
// It maps shadcn toast calls to sonner toast and adds accessibility features
export function useToast() {
  // Map states to sonner
  const toast = (props: ToastProps) => {
    const { title, description, variant = "default", action } = props;
    
    // Create accessible toast options
    const accessibleOptions: CustomToastOptions = {
      description: description as string,
      action,
      className: "accessible-toast", // Add class for styling and accessibility hooks
    };
    
    // Handle different toast types
    if (variant === "destructive") {
      return sonnerToast.error(title as string, accessibleOptions);
    } else if (variant === "success") {
      return sonnerToast.success(title as string, accessibleOptions);
    } else {
      return sonnerToast(title as string, accessibleOptions);
    }
  };

  // Return a simplified API that maps to sonner
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  };
}

export { sonnerToast as toast };
