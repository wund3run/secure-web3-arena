
import { useState } from "react";
import { toast as sonnerToast } from "sonner";

export interface ToastActionProps {
  altText: string;
  onClick: () => void;
  children: React.ReactNode;
}

export interface ToastProps {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactElement<ToastActionProps>;
  variant?: "default" | "destructive" | "success";
  duration?: number;
}

const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  const toast = (props: ToastProps) => {
    const { title, description, variant, duration } = props;
    
    const toastType = variant === "destructive" ? "error" : 
                      variant === "success" ? "success" : "default";
    
    sonnerToast[toastType](title, {
      description,
      duration: duration || 5000,
    });
    
    return { id: Date.now().toString(), ...props };
  };

  return { toast, toasts };
};

// Export the hook and a simplified toast function
export { useToast };
export const toast = (props: ToastProps) => {
  const { title, description, variant, duration } = props;
  
  const toastType = variant === "destructive" ? "error" : 
                    variant === "success" ? "success" : "default";
  
  sonnerToast[toastType](title, {
    description,
    duration: duration || 5000,
  });
  
  return { id: Date.now().toString(), ...props };
};
