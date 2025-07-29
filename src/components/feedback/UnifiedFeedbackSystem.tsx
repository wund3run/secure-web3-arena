
import React, { createContext, useContext, useState, useCallback } from 'react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

// Unified Feedback Context
interface FeedbackContextType {
  showToast: (message: string, options?: ToastOptions) => void;
  showConfirmDialog: (options: ConfirmDialogOptions) => Promise<boolean>;
  showSuccessToast: (message: string) => void;
  showErrorToast: (message: string) => void;
  showWarningToast: (message: string) => void;
  showInfoToast: (message: string) => void;
}

interface ToastOptions {
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ConfirmDialogOptions {
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'destructive';
}

const FeedbackContext = createContext<FeedbackContextType | null>(null);

export function UnifiedFeedbackProvider({ children }: { children: React.ReactNode }) {
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean;
    options: ConfirmDialogOptions;
    resolve: (value: boolean) => void;
  } | null>(null);

  const showToast = useCallback((message: string, options: ToastOptions = {}) => {
    const { type = 'info', duration = 4000, description, action } = options;
    
    const toastConfig = {
      description,
      duration,
      action: action ? {
        label: action.label,
        onClick: action.onClick,
      } : undefined,
      className: cn(
        'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
        type === 'success' && 'group-[.toaster]:border-green-500/20',
        type === 'error' && 'group-[.toaster]:border-red-500/20',
        type === 'warning' && 'group-[.toaster]:border-yellow-500/20',
        type === 'info' && 'group-[.toaster]:border-blue-500/20'
      ),
    };

    switch (type) {
      case 'success':
        toast.success(message, toastConfig);
        break;
      case 'error':
        toast.error(message, toastConfig);
        break;
      case 'warning':
        toast.warning(message, toastConfig);
        break;
      case 'info':
      default:
        toast.info(message, toastConfig);
        break;
    }
  }, []);

  const showConfirmDialog = useCallback((options: ConfirmDialogOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setConfirmDialog({
        isOpen: true,
        options,
        resolve,
      });
    });
  }, []);

  const showSuccessToast = useCallback((message: string) => {
    showToast(message, { type: 'success' });
  }, [showToast]);

  const showErrorToast = useCallback((message: string) => {
    showToast(message, { type: 'error' });
  }, [showToast]);

  const showWarningToast = useCallback((message: string) => {
    showToast(message, { type: 'warning' });
  }, [showToast]);

  const showInfoToast = useCallback((message: string) => {
    showToast(message, { type: 'info' });
  }, [showToast]);

  const handleConfirmDialogResponse = (confirmed: boolean) => {
    if (confirmDialog) {
      confirmDialog.resolve(confirmed);
      setConfirmDialog(null);
    }
  };

  const value: FeedbackContextType = {
    showToast,
    showConfirmDialog,
    showSuccessToast,
    showErrorToast,
    showWarningToast,
    showInfoToast,
  };

  return (
    <FeedbackContext.Provider value={value}>
      {children}
      
      {/* Confirmation Dialog */}
      {confirmDialog && (
        <AlertDialog 
          open={confirmDialog.isOpen} 
          onOpenChange={() => handleConfirmDialogResponse(false)}
        >
          <AlertDialogContent className="sm:max-w-[425px]">
            <AlertDialogHeader>
              <AlertDialogTitle className="flex items-center gap-2">
                {confirmDialog.options.variant === 'destructive' ? (
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                ) : (
                  <Info className="h-5 w-5 text-primary" />
                )}
                {confirmDialog.options.title}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {confirmDialog.options.description}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => handleConfirmDialogResponse(false)}>
                {confirmDialog.options.cancelText || 'Cancel'}
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleConfirmDialogResponse(true)}
                className={cn(
                  confirmDialog.options.variant === 'destructive' && 
                  'bg-destructive text-destructive-foreground hover:bg-destructive/90'
                )}
              >
                {confirmDialog.options.confirmText || 'Confirm'}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </FeedbackContext.Provider>
  );
}

export function useFeedback() {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error('useFeedback must be used within UnifiedFeedbackProvider');
  }
  return context;
}

// Utility components for quick feedback
export function ToastIcon({ type }: { type: 'success' | 'error' | 'warning' | 'info' }) {
  const icons = {
    success: CheckCircle,
    error: X,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500',
  };

  const Icon = icons[type];
  return <Icon className={cn('h-4 w-4', colors[type])} />;
}
