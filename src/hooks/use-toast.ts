
// Centralized toast hook implementation
import { toast as sonnerToast } from "sonner";
import { useState, useCallback } from "react";

// Types for the toast API
export type ToastProps = {
  title?: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
  id?: string | number;
};

// Main toast function for direct usage
export const toast = {
  success: (title: string, props?: Omit<ToastProps, "title">) => 
    sonnerToast.success(title, props),
  
  error: (title: string, props?: Omit<ToastProps, "title">) => 
    sonnerToast.error(title, props),
  
  warning: (title: string, props?: Omit<ToastProps, "title">) => 
    sonnerToast.warning(title, props),
  
  info: (title: string, props?: Omit<ToastProps, "title">) => 
    sonnerToast.info(title, props),
  
  // Additional utility methods
  dismiss: (toastId?: string) => sonnerToast.dismiss(toastId),
  
  custom: (props: ToastProps) => {
    return sonnerToast(props.title || "", {
      description: props.description,
      action: props.action,
      duration: props.duration,
      // Convert number IDs to strings to match expected type
      id: props.id ? String(props.id) : undefined,
    });
  }
};

// Hook for component-based toast management
export function useToast() {
  const [isToastVisible, setIsToastVisible] = useState(false);
  
  const showToast = useCallback((props: ToastProps) => {
    setIsToastVisible(true);
    // Convert the ID to string if it's a number to fix the type error
    const id = props.id ? String(props.id) : undefined;
    const dismissToast = toast.custom({...props, id});
    
    return () => {
      if (id) toast.dismiss(id);
      setIsToastVisible(false);
    };
  }, []);
  
  return {
    toast,
    showToast,
    isToastVisible,
    dismissToast: (id?: string | number) => {
      // Convert ID to string if it's provided
      if (id !== undefined) {
        toast.dismiss(String(id));
      } else {
        toast.dismiss();
      }
      setIsToastVisible(false);
    }
  };
}
