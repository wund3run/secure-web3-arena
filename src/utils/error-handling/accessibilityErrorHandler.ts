
/**
 * Enhanced error handling specifically for accessibility issues
 */

import { toast } from "sonner";
import { ErrorCategory } from "../error-handling";

interface AccessibilityErrorOptions {
  /** The element causing the accessibility issue */
  element?: HTMLElement;
  /** The WCAG criterion being violated */
  wcagCriterion?: string;
  /** Whether to attempt automatic fixing */
  attemptAutoFix?: boolean;
}

/**
 * Handle accessibility-related errors with specialized reporting
 */
export const handleAccessibilityError = (
  error: unknown, 
  options: AccessibilityErrorOptions = {}
) => {
  console.error('Accessibility error detected:', error);
  
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  // Show a more detailed toast for accessibility errors
  toast.error("Accessibility Issue Detected", {
    description: errorMessage.substring(0, 100),
    action: options.attemptAutoFix ? {
      label: "Attempt Fix",
      onClick: () => attemptAccessibilityFix(options.element, errorMessage)
    } : undefined,
    // Use a unique ID to prevent duplicate toasts
    id: `a11y-error-${Date.now()}`,
  });
  
  return {
    message: errorMessage,
    category: ErrorCategory.Validation,
    wcagCriterion: options.wcagCriterion
  };
};

/**
 * Attempt to automatically fix common accessibility issues
 */
function attemptAccessibilityFix(element?: HTMLElement, errorMessage?: string): boolean {
  if (!element) return false;
  
  // Example fixes for common accessibility issues
  if (errorMessage?.includes('missing alt text')) {
    element.setAttribute('alt', 'Image description - please update');
    return true;
  }
  
  if (errorMessage?.includes('missing label')) {
    const id = `auto-label-${Date.now()}`;
    element.setAttribute('id', id);
    
    const label = document.createElement('label');
    label.setAttribute('for', id);
    label.textContent = 'Label - please update';
    
    element.parentNode?.insertBefore(label, element);
    return true;
  }
  
  if (errorMessage?.includes('contrast ratio')) {
    // This is just an example - real implementation would need more logic
    element.style.color = '#000000';
    element.style.backgroundColor = '#ffffff';
    return true;
  }
  
  return false;
}
