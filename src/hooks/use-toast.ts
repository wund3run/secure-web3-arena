
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
  id?: string;
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
      id: props.id,
    });
  }
};

// Hook for component-based toast management
export function useToast() {
  const [isToastVisible, setIsToastVisible] = useState(false);
  
  const showToast = useCallback((props: ToastProps) => {
    setIsToastVisible(true);
    const id = toast.custom(props);
    
    return () => {
      toast.dismiss(id);
      setIsToastVisible(false);
    };
  }, []);
  
  return {
    toast,
    showToast,
    isToastVisible,
    dismissToast: (id?: string) => {
      toast.dismiss(id);
      setIsToastVisible(false);
    }
  };
}
