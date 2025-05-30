
import { EnhancedToastSystem } from "@/components/ui/enhanced-toast-system";

export interface AccessibilityError {
  type: 'focus' | 'keyboard' | 'screen-reader' | 'color-contrast' | 'aria';
  severity: 'low' | 'medium' | 'high';
  element?: HTMLElement;
  message: string;
  suggestion?: string;
}

export class AccessibilityErrorHandler {
  private static errors: AccessibilityError[] = [];
  
  static reportError(error: AccessibilityError) {
    this.errors.push(error);
    this.handleError(error);
  }
  
  private static handleError(error: AccessibilityError) {
    const message = `Accessibility ${error.type}: ${error.message}`;
    
    switch (error.severity) {
      case 'high':
        EnhancedToastSystem.error("Critical Accessibility Issue", message);
        if (error.suggestion) {
          this.showSuggestion(error);
        }
        break;
      case 'medium':
        EnhancedToastSystem.warning("Accessibility Warning", message);
        break;
      case 'low':
        console.warn(`[A11Y] ${message}`);
        break;
    }
  }
  
  private static showSuggestion(error: AccessibilityError) {
    if (error.suggestion) {
      EnhancedToastSystem.info("Accessibility Suggestion", error.suggestion);
    }
  }
  
  static getErrors(): AccessibilityError[] {
    return [...this.errors];
  }
  
  static clearErrors() {
    this.errors = [];
  }
}

// Utility function to check common accessibility issues
export const handleAccessibilityError = (
  type: AccessibilityError['type'],
  message: string,
  element?: HTMLElement,
  severity: AccessibilityError['severity'] = 'medium',
  suggestion?: string
) => {
  AccessibilityErrorHandler.reportError({
    type,
    severity,
    element,
    message,
    suggestion
  });
};
