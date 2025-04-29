
import { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const feedbackVariants = cva(
  "fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 max-w-md w-full transition-all duration-300",
  {
    variants: {
      variant: {
        success: "bg-green-50 border border-green-200 text-green-800",
        error: "bg-red-50 border border-red-200 text-red-800",
        info: "bg-blue-50 border border-blue-200 text-blue-800",
        loading: "bg-gray-50 border border-gray-200 text-gray-800",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

interface InteractiveFeedbackProps extends VariantProps<typeof feedbackVariants> {
  message: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
}

export function InteractiveFeedback({
  message,
  description,
  variant,
  duration = 3000,
  onClose,
}: InteractiveFeedbackProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    if (variant !== "loading" && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) setTimeout(onClose, 300);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration, variant, onClose]);
  
  const handleClose = () => {
    setIsVisible(false);
    if (onClose) setTimeout(onClose, 300);
  };

  const getIcon = () => {
    switch(variant) {
      case "success": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "error": return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "info": return <Info className="h-5 w-5 text-blue-500" />;
      default: return <Info className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div 
      className={cn(
        feedbackVariants({ variant }),
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <div className="flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-grow">
        <h4 className="font-medium text-sm">{message}</h4>
        {description && (
          <p className="text-xs opacity-90">{description}</p>
        )}
      </div>
      <button 
        onClick={handleClose} 
        className="flex-shrink-0 p-1 hover:bg-black/5 rounded-full"
      >
        <X className="h-4 w-4 opacity-70" />
      </button>
    </div>
  );
}

// Helper function for easier usage
interface FeedbackOptions {
  message: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
}

let activeFeedback: HTMLDivElement | null = null;

export const showFeedback = (variant: "success" | "error" | "info" | "loading", options: FeedbackOptions) => {
  // Remove any existing feedback
  if (activeFeedback) {
    document.body.removeChild(activeFeedback);
    activeFeedback = null;
  }
  
  // Create container element
  const container = document.createElement("div");
  document.body.appendChild(container);
  activeFeedback = container;
  
  // Create feedback element
  const feedbackElement = document.createElement("div");
  feedbackElement.className = feedbackVariants({ variant });
  
  // Create icon
  const iconElement = document.createElement("div");
  iconElement.className = "flex-shrink-0";
  let iconSvg = "";
  switch(variant) {
    case "success": 
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-green-500"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
      break;
    case "error":
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
      break;
    default:
      iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-blue-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  }
  iconElement.innerHTML = iconSvg;
  
  // Create content
  const contentElement = document.createElement("div");
  contentElement.className = "flex-grow";
  const messageElement = document.createElement("h4");
  messageElement.className = "font-medium text-sm";
  messageElement.textContent = options.message;
  contentElement.appendChild(messageElement);
  
  if (options.description) {
    const descriptionElement = document.createElement("p");
    descriptionElement.className = "text-xs opacity-90";
    descriptionElement.textContent = options.description;
    contentElement.appendChild(descriptionElement);
  }
  
  // Create close button
  const closeButton = document.createElement("button");
  closeButton.className = "flex-shrink-0 p-1 hover:bg-black/5 rounded-full";
  closeButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="opacity-70"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
  
  // Assemble feedback element
  feedbackElement.appendChild(iconElement);
  feedbackElement.appendChild(contentElement);
  feedbackElement.appendChild(closeButton);
  
  // Add to container
  container.appendChild(feedbackElement);
  
  // Handle closing
  const handleClose = () => {
    if (container.parentNode) {
      document.body.removeChild(container);
      activeFeedback = null;
    }
    if (options.onClose) options.onClose();
  };
  
  closeButton.addEventListener("click", handleClose);
  
  // Auto-close
  if (variant !== "loading" && options.duration !== 0) {
    setTimeout(() => {
      handleClose();
    }, options.duration || 3000);
  }
  
  return handleClose;
};
