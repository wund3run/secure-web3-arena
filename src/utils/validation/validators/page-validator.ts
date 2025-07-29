
import { ValidationIssue } from "../types";

/**
 * Validates the current page for common issues
 * @param pathname Current page path
 * @returns Array of validation issues
 */
export const validateCurrentPage = (pathname: string): ValidationIssue[] => {
  const pageIssues: ValidationIssue[] = [];
  
  // Check for broken links on the current page
  const links = document.querySelectorAll('a');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === '#' || href === '') {
      pageIssues.push({
        type: 'link',
        severity: 'medium',
        description: 'Link with no destination or placeholder href="#"',
        location: `${pathname}: ${link.textContent || 'unnamed link'}`,
        suggestion: 'Update with valid href or add onClick handler',
        affectedStakeholders: ['general']
      });
    }
    
    // Check for external links without proper attributes
    if (href?.startsWith('http') && !link.getAttribute('target') && !link.getAttribute('rel')) {
      pageIssues.push({
        type: 'link',
        severity: 'low',
        description: 'External link without target="_blank" and rel="noopener noreferrer"',
        location: `${pathname}: ${link.textContent || 'external link'}`,
        suggestion: 'Add target="_blank" and rel="noopener noreferrer" for external links',
        affectedStakeholders: ['general']
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
        suggestion: 'Add onClick handler or verify button functionality',
        affectedStakeholders: ['general']
      });
    }
  });
  
  // Check for images without alt text
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    if (!img.getAttribute('alt')) {
      pageIssues.push({
        type: 'accessibility',
        severity: 'medium',
        description: 'Image missing alt text',
        location: `${pathname}: ${img.getAttribute('src') || 'unnamed image'}`,
        suggestion: 'Add descriptive alt text for accessibility',
        affectedStakeholders: ['general']
      });
    }
  });
  
  // Check for form elements without labels
  const formElements = document.querySelectorAll('input, select, textarea');
  formElements.forEach(element => {
    const id = element.getAttribute('id');
    if (id && !document.querySelector(`label[for="${id}"]`)) {
      pageIssues.push({
        type: 'accessibility',
        severity: 'medium',
        description: 'Form element missing associated label',
        location: `${pathname}: ${element.getAttribute('name') || id || 'unnamed form element'}`,
        suggestion: 'Add label element with matching "for" attribute',
        affectedStakeholders: ['general', 'project-owner', 'auditor']
      });
    }
  });
  
  // Check for color contrast issues (basic check)
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, label');
  textElements.forEach(element => {
    const style = window.getComputedStyle(element);
    const color = style.color;
    const bgColor = style.backgroundColor;
    
    // Simple check - this is not a complete contrast check
    if (color === bgColor || 
        (color === 'rgb(0, 0, 0)' && bgColor === 'rgba(0, 0, 0, 0)') || 
        (color === 'rgb(255, 255, 255)' && bgColor === 'rgba(0, 0, 0, 0)')) {
      pageIssues.push({
        type: 'accessibility',
        severity: 'medium',
        description: 'Potential text contrast issue detected',
        location: `${pathname}: ${element.textContent?.substring(0, 20) || 'text element'}`,
        suggestion: 'Verify text contrast meets WCAG AA standard (4.5:1 for normal text)',
        affectedStakeholders: ['general']
      });
    }
  });
  
  // Check for proper page title
  const pageTitle = document.title;
  if (!pageTitle || pageTitle.length < 5) {
    pageIssues.push({
      type: 'seo',
      severity: 'high',
      description: 'Page has missing or very short title',
      location: pathname,
      suggestion: 'Add a descriptive page title (50-60 characters)',
      affectedStakeholders: ['general']
    });
  }
  
  return pageIssues;
};
