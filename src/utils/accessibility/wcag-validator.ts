
import { AccessibilityError, handleAccessibilityError } from '@/utils/error-handling/accessibilityErrorHandler';

export interface WCAGRule {
  id: string;
  level: 'A' | 'AA' | 'AAA';
  guideline: string;
  criterion: string;
  description: string;
}

export interface WCAGViolation {
  rule: WCAGRule;
  element: HTMLElement;
  severity: 'error' | 'warning' | 'info';
  message: string;
  suggestion: string;
}

export class WCAGValidator {
  private static instance: WCAGValidator;
  private violations: WCAGViolation[] = [];

  static getInstance(): WCAGValidator {
    if (!WCAGValidator.instance) {
      WCAGValidator.instance = new WCAGValidator();
    }
    return WCAGValidator.instance;
  }

  async validatePage(element: HTMLElement = document.body): Promise<WCAGViolation[]> {
    this.violations = [];
    
    // Run all WCAG checks
    this.checkColorContrast(element);
    this.checkKeyboardNavigation(element);
    this.checkARIALabels(element);
    this.checkHeadingStructure(element);
    this.checkImageAltText(element);
    this.checkFormLabels(element);
    this.checkFocusManagement(element);
    this.checkLandmarks(element);

    return this.violations;
  }

  private checkColorContrast(element: HTMLElement) {
    const textElements = element.querySelectorAll('*');
    
    textElements.forEach((el) => {
      if (el.textContent?.trim()) {
        const styles = window.getComputedStyle(el);
        const color = styles.color;
        const backgroundColor = styles.backgroundColor;
        
        // Basic contrast check (simplified)
        if (this.hasLowContrast(color, backgroundColor)) {
          this.addViolation({
            rule: {
              id: 'wcag-1.4.3',
              level: 'AA',
              guideline: '1.4 Distinguishable',
              criterion: '1.4.3 Contrast (Minimum)',
              description: 'Text must have sufficient color contrast'
            },
            element: el as HTMLElement,
            severity: 'error',
            message: 'Text does not meet minimum color contrast requirements',
            suggestion: 'Increase color contrast to at least 4.5:1 for normal text'
          });
        }
      }
    });
  }

  private checkKeyboardNavigation(element: HTMLElement) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      
      if (htmlEl.tabIndex < 0 && !htmlEl.hasAttribute('aria-hidden')) {
        this.addViolation({
          rule: {
            id: 'wcag-2.1.1',
            level: 'A',
            guideline: '2.1 Keyboard Accessible',
            criterion: '2.1.1 Keyboard',
            description: 'All functionality must be available via keyboard'
          },
          element: htmlEl,
          severity: 'error',
          message: 'Interactive element is not keyboard accessible',
          suggestion: 'Remove negative tabindex or add aria-hidden="true"'
        });
      }
    });
  }

  private checkARIALabels(element: HTMLElement) {
    const interactiveElements = element.querySelectorAll(
      'button, [role="button"], input, select, textarea'
    );

    interactiveElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      const hasLabel = htmlEl.hasAttribute('aria-label') || 
                      htmlEl.hasAttribute('aria-labelledby') ||
                      htmlEl.closest('label') ||
                      htmlEl.textContent?.trim();

      if (!hasLabel) {
        this.addViolation({
          rule: {
            id: 'wcag-4.1.2',
            level: 'A',
            guideline: '4.1 Compatible',
            criterion: '4.1.2 Name, Role, Value',
            description: 'Elements must have accessible names'
          },
          element: htmlEl,
          severity: 'error',
          message: 'Interactive element lacks accessible name',
          suggestion: 'Add aria-label, aria-labelledby, or wrap in label element'
        });
      }
    });
  }

  private checkHeadingStructure(element: HTMLElement) {
    const headings = Array.from(element.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    let lastLevel = 0;

    headings.forEach((heading) => {
      const level = parseInt(heading.tagName.charAt(1));
      
      if (level > lastLevel + 1) {
        this.addViolation({
          rule: {
            id: 'wcag-1.3.1',
            level: 'A',
            guideline: '1.3 Adaptable',
            criterion: '1.3.1 Info and Relationships',
            description: 'Heading levels should not be skipped'
          },
          element: heading as HTMLElement,
          severity: 'warning',
          message: `Heading level skipped from h${lastLevel} to h${level}`,
          suggestion: 'Use consecutive heading levels for proper document structure'
        });
      }
      
      lastLevel = level;
    });
  }

  private checkImageAltText(element: HTMLElement) {
    const images = element.querySelectorAll('img');
    
    images.forEach((img) => {
      if (!img.hasAttribute('alt')) {
        this.addViolation({
          rule: {
            id: 'wcag-1.1.1',
            level: 'A',
            guideline: '1.1 Text Alternatives',
            criterion: '1.1.1 Non-text Content',
            description: 'Images must have text alternatives'
          },
          element: img,
          severity: 'error',
          message: 'Image missing alt attribute',
          suggestion: 'Add descriptive alt text or alt="" for decorative images'
        });
      }
    });
  }

  private checkFormLabels(element: HTMLElement) {
    const formControls = element.querySelectorAll('input, select, textarea');
    
    formControls.forEach((control) => {
      const htmlControl = control as HTMLInputElement;
      const hasLabel = htmlControl.labels?.length > 0 ||
                      htmlControl.hasAttribute('aria-label') ||
                      htmlControl.hasAttribute('aria-labelledby');

      if (!hasLabel && htmlControl.type !== 'hidden') {
        this.addViolation({
          rule: {
            id: 'wcag-3.3.2',
            level: 'A',
            guideline: '3.3 Input Assistance',
            criterion: '3.3.2 Labels or Instructions',
            description: 'Form controls must have labels'
          },
          element: htmlControl,
          severity: 'error',
          message: 'Form control missing label',
          suggestion: 'Associate with label element or add aria-label'
        });
      }
    });
  }

  private checkFocusManagement(element: HTMLElement) {
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    focusableElements.forEach((el) => {
      const htmlEl = el as HTMLElement;
      
      // Check for focus indicators
      const styles = window.getComputedStyle(htmlEl, ':focus');
      if (styles.outline === 'none' && !styles.boxShadow && !styles.border) {
        this.addViolation({
          rule: {
            id: 'wcag-2.4.7',
            level: 'AA',
            guideline: '2.4 Navigable',
            criterion: '2.4.7 Focus Visible',
            description: 'Focus must be visible'
          },
          element: htmlEl,
          severity: 'warning',
          message: 'Element lacks visible focus indicator',
          suggestion: 'Add :focus styles with outline or box-shadow'
        });
      }
    });
  }

  private checkLandmarks(element: HTMLElement) {
    const landmarks = element.querySelectorAll('main, nav, header, footer, aside, section[aria-label]');
    
    if (landmarks.length === 0) {
      this.addViolation({
        rule: {
          id: 'wcag-1.3.1',
          level: 'A',
          guideline: '1.3 Adaptable',
          criterion: '1.3.1 Info and Relationships',
          description: 'Page should have landmark regions'
        },
        element: element,
        severity: 'warning',
        message: 'Page lacks semantic landmark elements',
        suggestion: 'Add main, nav, header, footer elements for page structure'
      });
    }
  }

  private hasLowContrast(color: string, backgroundColor: string): boolean {
    // Simplified contrast check - in production, use a proper contrast calculation
    return color === backgroundColor || 
           (color.includes('rgb(255') && backgroundColor.includes('rgb(255')) ||
           (color.includes('rgb(0') && backgroundColor.includes('rgb(0'));
  }

  private addViolation(violation: WCAGViolation) {
    this.violations.push(violation);
    
    // Map WCAG rule IDs to appropriate accessibility error types
    let errorType: AccessibilityError['type'] = 'aria'; // default
    
    if (violation.rule.id.includes('1.4.3')) {
      errorType = 'color-contrast';
    } else if (violation.rule.id.includes('2.1.1')) {
      errorType = 'keyboard';
    } else if (violation.rule.id.includes('2.4.7')) {
      errorType = 'focus';
    } else if (violation.rule.id.includes('4.1.2') || violation.rule.id.includes('1.1.1') || violation.rule.id.includes('3.3.2')) {
      errorType = 'aria';
    } else {
      errorType = 'screen-reader';
    }
    
    // Report to accessibility error handler
    handleAccessibilityError(
      errorType,
      violation.message,
      violation.element,
      violation.severity === 'error' ? 'high' : 'medium',
      violation.suggestion
    );
  }

  generateReport(): string {
    const report = {
      timestamp: new Date().toISOString(),
      totalViolations: this.violations.length,
      errorCount: this.violations.filter(v => v.severity === 'error').length,
      warningCount: this.violations.filter(v => v.severity === 'warning').length,
      violations: this.violations.map(v => ({
        rule: v.rule.id,
        level: v.rule.level,
        message: v.message,
        element: v.element.tagName + (v.element.id ? `#${v.element.id}` : ''),
        suggestion: v.suggestion
      }))
    };

    return JSON.stringify(report, null, 2);
  }

  clearViolations() {
    this.violations = [];
  }
}

export const wcagValidator = WCAGValidator.getInstance();
