
import React from 'react';
import { toast } from 'sonner';
import { CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export interface ToastOptions {
  title: string;
  description?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export class EnhancedToastSystem {
  static success(options: ToastOptions) {
    return toast.success(options.title, {
      description: options.description,
      duration: options.duration || 4000,
      icon: <CheckCircle className="h-4 w-4" />,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  }

  static error(options: ToastOptions) {
    return toast.error(options.title, {
      description: options.description,
      duration: options.duration || 6000,
      icon: <AlertCircle className="h-4 w-4" />,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  }

  static warning(options: ToastOptions) {
    return toast.warning(options.title, {
      description: options.description,
      duration: options.duration || 5000,
      icon: <AlertTriangle className="h-4 w-4" />,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  }

  static info(options: ToastOptions) {
    return toast.info(options.title, {
      description: options.description,
      duration: options.duration || 4000,
      icon: <Info className="h-4 w-4" />,
      action: options.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  }

  static loading(title: string) {
    return toast.loading(title);
  }

  static dismiss(toastId?: string | number) {
    if (toastId) {
      toast.dismiss(toastId);
    } else {
      toast.dismiss();
    }
  }
}
