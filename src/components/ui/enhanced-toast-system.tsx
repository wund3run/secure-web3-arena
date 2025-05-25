
import { toast } from "sonner";
import { CheckCircle, AlertCircle, XCircle, Info, Wifi, WifiOff } from "lucide-react";

export class EnhancedToastSystem {
  static success(title: string, description?: string) {
    return toast.success(title, {
      description,
      icon: <CheckCircle className="h-4 w-4" />,
      duration: 4000,
      className: "border-green-200 bg-green-50 text-green-900"
    });
  }

  static error(title: string, description?: string, action?: { label: string; onClick: () => void }) {
    return toast.error(title, {
      description,
      icon: <XCircle className="h-4 w-4" />,
      duration: 6000,
      action: action ? {
        label: action.label,
        onClick: action.onClick
      } : undefined,
      className: "border-red-200 bg-red-50 text-red-900"
    });
  }

  static warning(title: string, description?: string) {
    return toast.warning(title, {
      description,
      icon: <AlertCircle className="h-4 w-4" />,
      duration: 5000,
      className: "border-yellow-200 bg-yellow-50 text-yellow-900"
    });
  }

  static info(title: string, description?: string) {
    return toast.info(title, {
      description,
      icon: <Info className="h-4 w-4" />,
      duration: 4000,
      className: "border-blue-200 bg-blue-50 text-blue-900"
    });
  }

  static networkError(retryAction?: () => void) {
    return toast.error("Network Error", {
      description: "Please check your connection and try again",
      icon: <WifiOff className="h-4 w-4" />,
      duration: 8000,
      action: retryAction ? {
        label: "Retry",
        onClick: retryAction
      } : undefined
    });
  }

  static sessionExpired() {
    return toast.warning("Session Expired", {
      description: "Please sign in again to continue",
      icon: <AlertCircle className="h-4 w-4" />,
      duration: 10000,
      action: {
        label: "Sign In",
        onClick: () => window.location.href = "/auth"
      }
    });
  }

  static connectionRestored() {
    return toast.success("Connection Restored", {
      icon: <Wifi className="h-4 w-4" />,
      duration: 3000,
      className: "border-green-200 bg-green-50 text-green-900"
    });
  }

  static loading(title: string, description?: string) {
    return toast.loading(title, {
      description,
      duration: Infinity
    });
  }

  static dismiss(toastId: string | number) {
    toast.dismiss(toastId);
  }
}
