
import { toast } from "sonner";
import { ErrorCategory } from "../error-handling";

interface AccessibilityIssue {
  element: string;
  issue: string;
  impact: 'critical' | 'serious' | 'moderate' | 'minor';
  wcag?: string; // WCAG reference
  fix?: string;
}

/**
 * Specialized handler for accessibility issues
 */
export const handleAccessibilityError = (
  issue: AccessibilityIssue
): void => {
  console.warn(`Accessibility issue (${issue.impact}):`, issue);
  
  // Determine appropriate toast type based on impact
  const toastType = issue.impact === 'critical' || issue.impact === 'serious' 
    ? 'error' 
    : issue.impact === 'moderate' ? 'warning' : 'info';
  
  const description = issue.fix 
    ? `${issue.issue}. Fix: ${issue.fix}` 
    : issue.issue;
  
  // Show appropriate toast based on severity
  if (toastType === 'error') {
    toast.error(`Accessibility Issue: ${issue.element}`, {
      description,
      duration: 6000,
    });
  } else if (toastType === 'warning') {
    toast.warning(`Accessibility Warning: ${issue.element}`, {
      description,
      duration: 5000,
    });
  } else {
    toast.info(`Accessibility Notice: ${issue.element}`, {
      description,
      duration: 4000,
    });
  }
};

// Helper to check common accessibility issues
export const checkAccessibility = (element: HTMLElement): AccessibilityIssue[] => {
  const issues: AccessibilityIssue[] = [];
  
  // Check for missing alt text on images
  const images = element.querySelectorAll('img');
  images.forEach(img => {
    if (!img.alt) {
      issues.push({
        element: 'Image',
        issue: 'Missing alt text',
        impact: 'serious',
        wcag: '1.1.1',
        fix: 'Add descriptive alt text to the image'
      });
    }
  });
  
  // Check for proper heading hierarchy
  const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.charAt(1)));
  
  for (let i = 1; i < headingLevels.length; i++) {
    if (headingLevels[i] > headingLevels[i-1] + 1) {
      issues.push({
        element: `Heading (h${headingLevels[i]})`,
        issue: 'Skipped heading level',
        impact: 'moderate',
        wcag: '1.3.1',
        fix: 'Maintain proper heading hierarchy'
      });
    }
  }
  
  return issues;
};
