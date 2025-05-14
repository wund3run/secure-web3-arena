
import * as React from "react"
import { toast as sonnerToast } from "sonner";

type ToastProps = {
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
  variant?: "default" | "destructive" | "success"
}

// This is a compatibility layer for shadcn toast system
// It maps shadcn toast calls to sonner toast
export function useToast() {
  // Map states to sonner
  const toast = (props: ToastProps) => {
    const { title, description, variant = "default", action } = props;
    
    if (variant === "destructive") {
      return sonnerToast.error(title as string, {
        description: description as string,
        action
      });
    } else if (variant === "success") {
      return sonnerToast.success(title as string, {
        description: description as string,
        action
      });
    } else {
      return sonnerToast(title as string, {
        description: description as string,
        action
      });
    }
  };

  // Return a simplified API that maps to sonner
  return {
    toast,
    dismiss: sonnerToast.dismiss,
  };
}

export { sonnerToast as toast };
