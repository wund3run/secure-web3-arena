
import React from 'react';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastOptions {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  duration?: number;
}

class EnhancedToastSystem {
  private static getIcon(type: ToastType) {
    switch (type) {
      case 'success': return CheckCircle;
      case 'error': return AlertCircle;
      case 'warning': return AlertTriangle;
      case 'info': return Info;
    }
  }

  static show(type: ToastType, options: ToastOptions) {
    const Icon = this.getIcon(type);
    
    const toastFunction = type === 'error' ? toast.error : 
                         type === 'success' ? toast.success :
                         type === 'warning' ? toast.warning : toast.info;

    return toastFunction(options.title, {
      description: options.description,
      icon: React.createElement(Icon, { className: "h-4 w-4" }),
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick
      } : undefined,
      duration: options.duration || (type === 'error' ? 6000 : 4000),
      className: cn(
        "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
        type === 'error' && "group-[.toaster]:border-red-200 group-[.toaster]:bg-red-50",
        type === 'success' && "group-[.toaster]:border-green-200 group-[.toaster]:bg-green-50",
        type === 'warning' && "group-[.toaster]:border-yellow-200 group-[.toaster]:bg-yellow-50",
        type === 'info' && "group-[.toaster]:border-blue-200 group-[.toaster]:bg-blue-50"
      )
    });
  }

  static success(title: string, description?: string, action?: ToastOptions['action']) {
    return this.show('success', { title, description, action });
  }

  static error(title: string, description?: string, action?: ToastOptions['action']) {
    return this.show('error', { title, description, action });
  }

  static warning(title: string, description?: string, action?: ToastOptions['action']) {
    return this.show('warning', { title, description, action });
  }

  static info(title: string, description?: string, action?: ToastOptions['action']) {
    return this.show('info', { title, description, action });
  }

  // Specialized toasts for common scenarios
  static networkError(retryAction?: () => void) {
    return this.error(
      "Connection Error",
      "Please check your internet connection and try again.",
      retryAction ? {
        label: "Retry",
        onClick: retryAction
      } : undefined
    );
  }

  static formValidationError() {
    return this.error(
      "Form Validation Error",
      "Please fix the highlighted fields and try again."
    );
  }

  static operationSuccess(operation: string) {
    return this.success(
      "Success",
      `${operation} completed successfully.`
    );
  }

  static sessionExpired() {
    return this.warning(
      "Session Expired",
      "Please sign in again to continue.",
      {
        label: "Sign In",
        onClick: () => window.location.href = "/auth"
      }
    );
  }
}

// Helper function for class names
function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export { EnhancedToastSystem };
