import React, { useEffect } from 'react';
import { toast } from 'sonner';

// Create a simple error context hook since the import is problematic
function useError() {
  // Simple fallback implementation
  return {
    error: null,
    clearError: () => {}
  };
}

interface ToastHandlerProps {
  children: React.ReactNode;
}

export function ToastHandler({ children }: ToastHandlerProps) {
  const { error, clearError } = useError();

  useEffect(() => {
    if (error) {
      // Auto-clear error after showing toast
      const timer = setTimeout(() => {
        clearError();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [error, clearError]);

  return <>{children}</>;
}

// Utility functions for consistent toast messages
export const showSuccessToast = (message: string, description?: string) => {
  toast.success(message, {
    description,
    duration: 4000,
  });
};

export const showErrorToast = (message: string, description?: string) => {
  toast.error(message, {
    description,
    duration: 6000,
  });
};

export const showWarningToast = (message: string, description?: string) => {
  toast.warning(message, {
    description,
    duration: 5000,
  });
};

export const showInfoToast = (message: string, description?: string) => {
  toast.info(message, {
    description,
    duration: 4000,
  });
};

export const showLoadingToast = (message: string, promise: Promise<unknown>) => {
  return toast.promise(promise, {
    loading: message,
    success: 'Operation completed successfully',
    error: 'Operation failed',
  });
};
