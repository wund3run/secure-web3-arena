/**
 * Accessibility error handling and reporting
 */
export interface AccessibilityError {
  type: 'focus' | 'keyboard' | 'screen-reader' | 'color-contrast' | 'aria';
  message: string;
  element: HTMLElement;
  severity: 'low' | 'medium' | 'high';
  suggestion: string;
  timestamp: Date;
}

class AccessibilityErrorHandler {
  private errors: AccessibilityError[] = [];
  private readonly MAX_ERRORS = 500;

  handleError(
    type: AccessibilityError['type'],
    message: string,
    element: HTMLElement,
    severity: AccessibilityError['severity'] = 'medium',
    suggestion: string = ''
  ): void {
    const error: AccessibilityError = {
      type,
      message,
      element,
      severity,
      suggestion,
      timestamp: new Date()
    };

    this.errors.push(error);

    // Keep only recent errors
    if (this.errors.length > this.MAX_ERRORS) {
      this.errors.shift();
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      const logLevel = severity === 'high' ? 'error' : 'warn';
      console[logLevel](`Accessibility ${severity}: ${message}`, {
        type,
        element,
        suggestion
      });
    }

    // Add visual indicator for high severity issues
    if (severity === 'high') {
      this.addVisualIndicator(element, type);
    }
  }

  private addVisualIndicator(element: HTMLElement, type: string): void {
    // Only add indicators in development mode
    if (process.env.NODE_ENV !== 'development') return;

    element.style.outline = '2px dashed red';
    element.title = `Accessibility Issue: ${type}`;
    
    // Remove indicator after 5 seconds
    setTimeout(() => {
      element.style.outline = '';
      element.title = '';
    }, 5000);
  }

  getErrors(type?: AccessibilityError['type']): AccessibilityError[] {
    if (type) {
      return this.errors.filter(error => error.type === type);
    }
    return [...this.errors];
  }

  getErrorsSummary(): Record<string, number> {
    const summary: Record<string, number> = {};
    
    this.errors.forEach(error => {
      const key = `${error.type}_${error.severity}`;
      summary[key] = (summary[key] || 0) + 1;
    });

    return summary;
  }

  clearErrors(): void {
    this.errors = [];
  }
}

const accessibilityErrorHandler = new AccessibilityErrorHandler();

export function handleAccessibilityError(
  type: AccessibilityError['type'],
  message: string,
  element: HTMLElement,
  severity: AccessibilityError['severity'] = 'medium',
  suggestion: string = ''
): void {
  accessibilityErrorHandler.handleError(type, message, element, severity, suggestion);
}

export { accessibilityErrorHandler };
