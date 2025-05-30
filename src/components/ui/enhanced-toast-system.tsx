
import { toast } from 'sonner';
import { CheckCircle, AlertTriangle, Info, X, Wifi, WifiOff } from 'lucide-react';

export class EnhancedToastSystem {
  // Success notifications with actions
  static success(title: string, description?: string, action?: { label: string; onClick: () => void }) {
    return toast.success(title, {
      description,
      icon: <CheckCircle className="h-4 w-4" />,
      action: action ? {
        label: action.label,
        onClick: action.onClick
      } : undefined,
      duration: 4000
    });
  }

  // Error notifications with retry capability
  static error(title: string, description?: string, retry?: () => void) {
    return toast.error(title, {
      description,
      icon: <AlertTriangle className="h-4 w-4" />,
      action: retry ? {
        label: "Retry",
        onClick: retry
      } : undefined,
      duration: 6000
    });
  }

  // Info notifications
  static info(title: string, description?: string, action?: { label: string; onClick: () => void }) {
    return toast.info(title, {
      description,
      icon: <Info className="h-4 w-4" />,
      action: action ? {
        label: action.label,
        onClick: action.onClick
      } : undefined,
      duration: 4000
    });
  }

  // Warning notifications
  static warning(title: string, description?: string) {
    return toast.warning(title, {
      description,
      icon: <AlertTriangle className="h-4 w-4" />,
      duration: 5000
    });
  }

  // Form validation error notification
  static formValidationError(title = "Form Validation Error", description = "Please check the highlighted fields and try again") {
    return toast.error(title, {
      description,
      icon: <AlertTriangle className="h-4 w-4" />,
      duration: 5000
    });
  }

  // Network-specific notifications
  static networkError(retry?: () => void) {
    return toast.error("Connection lost", {
      description: "Please check your internet connection",
      icon: <WifiOff className="h-4 w-4" />,
      action: retry ? {
        label: "Retry",
        onClick: retry
      } : undefined,
      duration: 8000
    });
  }

  // Session expired notification
  static sessionExpired() {
    return toast.error("Session expired", {
      description: "Please sign in again to continue",
      icon: <X className="h-4 w-4" />,
      action: {
        label: "Sign In",
        onClick: () => window.location.href = "/auth"
      },
      duration: 10000
    });
  }

  // Loading notifications with promise support
  static promise<T>(
    promise: Promise<T>,
    {
      loading,
      success,
      error
    }: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: any) => string);
    }
  ) {
    return toast.promise(promise, {
      loading,
      success,
      error,
      duration: 4000
    });
  }

  // Connection restored notification
  static connectionRestored() {
    return toast.success("Connection restored", {
      description: "You're back online",
      icon: <Wifi className="h-4 w-4" />,
      duration: 3000
    });
  }

  // Audit-specific notifications
  static auditProgress(milestone: string, projectName: string) {
    return toast.info("Audit Progress Update", {
      description: `${projectName}: ${milestone}`,
      duration: 5000
    });
  }

  static newMessage(senderName: string, preview?: string) {
    return toast.info(`New message from ${senderName}`, {
      description: preview ? preview.substring(0, 50) + "..." : "Click to view",
      duration: 6000
    });
  }
}
