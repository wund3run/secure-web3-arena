
import { ValidationIssue } from "../types";

/**
 * Validates the current page for common issues
 */
export const validateCurrentPage = (pathname: string): ValidationIssue[] => {
  const pageIssues: ValidationIssue[] = [];
  
  // Check for broken links on the current page
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    if (link.getAttribute('href') === '#' || link.getAttribute('href') === '') {
      pageIssues.push({
        type: 'link',
        severity: 'medium',
        description: 'Link with no destination or placeholder href="#"',
        location: `${pathname}: ${link.textContent || 'unnamed link'}`,
        suggestion: 'Update with valid href or add onClick handler'
      });
    }
  });
  
  // Check for buttons without handlers
  const buttons = document.querySelectorAll('button:not([type="submit"])');
  buttons.forEach(button => {
    // Type cast to HTMLButtonElement to access onclick property correctly
    const buttonElement = button as HTMLButtonElement;
    if (!buttonElement.onclick && !button.getAttribute('data-test-has-handler')) {
      pageIssues.push({
        type: 'interactive',
        severity: 'medium',
        description: 'Button may be missing click handler',
        location: `${pathname}: ${button.textContent || 'unnamed button'}`,
        suggestion: 'Add onClick handler or verify button functionality'
      });
    }
  });
  
  return pageIssues;
};
