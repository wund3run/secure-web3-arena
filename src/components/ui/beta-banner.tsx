
import React, { useState, useEffect } from "react";
import { AlertCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface BetaBannerProps {
  className?: string;
  dismissible?: boolean;
  position?: "top" | "bottom";
}

export function BetaBanner({
  className,
  dismissible = false,
  position = "top",
}: BetaBannerProps) {
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Check if user previously dismissed the banner
  useEffect(() => {
    setMounted(true);
    const isDismissed = localStorage.getItem("beta-banner-dismissed") === "true";
    setDismissed(isDismissed);
  }, []);

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("beta-banner-dismissed", "true");
  };

  if (dismissed || !mounted) return null;

  return (
    <div
      className={cn(
        "w-full bg-amber-50 border-amber-300 border-y px-4 py-2 text-amber-800 z-50 flex items-center justify-center shadow-sm",
        position === "top" ? "sticky top-0" : "sticky bottom-0",
        className
      )}
      role="alert"
      aria-live="polite"
    >
      <AlertCircle className="h-4 w-4 mr-2 flex-shrink-0" aria-hidden="true" />
      <span className="text-sm font-medium">
        Hawkly is currently in beta. Some features may be limited or contain bugs.
      </span>
      
      {dismissible && (
        <button
          onClick={handleDismiss}
          className="ml-4 p-1 rounded-full hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1"
          aria-label="Dismiss beta notification"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
