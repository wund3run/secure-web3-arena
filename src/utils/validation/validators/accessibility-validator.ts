import { ValidationIssue } from "../types";

/**
 * Validates accessibility aspects of the application
 * @returns Array of validation issues related to accessibility
 */
export const validateAccessibility = (): ValidationIssue[] => {
  const accessibilityIssues: ValidationIssue[] = [];
  
  // Check for images without alt text
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Fix the boolean/string comparison issue
    if (!img.alt && img.getAttribute('role') !== 'presentation') {
      accessibilityIssues.push({
        type: 'accessibility',
        severity: 'medium',
        description: 'Image missing alt text',
        location: img.src,
        suggestion: 'Add descriptive alt text to the image for screen readers',
        affectedStakeholders: ['general']
      });
    }
  });
  
  // Check for form inputs without labels
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    const inputId = input.getAttribute('id');
    if (inputId) {
      const hasLabel = document.querySelector(`label[for="${inputId}"]`);
      const hasAriaLabel = input.getAttribute('aria-label');
      const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
      
      if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
        accessibilityIssues.push({
          type: 'accessibility',
          severity: 'medium',
          description: 'Form control without an associated label',
          location: `Input with id: ${inputId}`,
          suggestion: 'Add a label element with a matching "for" attribute, or use aria-label/aria-labelledby',
          affectedStakeholders: ['general', 'auditor', 'project-owner', 'admin']
        });
      }
    } else if (!input.getAttribute('aria-label') && 
              !input.getAttribute('aria-labelledby')) {
      accessibilityIssues.push({
        type: 'accessibility',
        severity: 'medium',
        description: 'Form control without an ID or label',
        location: 'Form control without identification',
        suggestion: 'Add an id attribute and an associated label, or use aria-label/aria-labelledby',
        affectedStakeholders: ['general', 'auditor', 'project-owner', 'admin']
      });
    }
  });
  
  // Check for buttons without accessible names
  const buttons = document.querySelectorAll('button');
  buttons.forEach(button => {
    if (!button.textContent?.trim() && 
        !button.getAttribute('aria-label') && 
        !button.getAttribute('aria-labelledby')) {
      
      accessibilityIssues.push({
        type: 'accessibility',
        severity: 'medium',
        description: 'Button without accessible name',
        location: button.outerHTML.substring(0, 80) + '...',
        suggestion: 'Add text content to the button or use aria-label/aria-labelledby',
        affectedStakeholders: ['general', 'auditor', 'project-owner', 'admin']
      });
    }
  });
  
  // Check for color contrast (simplified check)
  const elements = document.querySelectorAll('*');
  const lowContrastElements = [];
  
  for (let i = 0; i < elements.length; i++) {
    const style = window.getComputedStyle(elements[i]);
    const backgroundColor = style.backgroundColor;
    const color = style.color;
    
    // This is a very simplified check - in production you'd use more sophisticated algorithms
    if (backgroundColor === 'rgba(0, 0, 0, 0)' || color === 'rgba(0, 0, 0, 0)') {
      continue; // Skip elements with transparent colors
    }
    
    if (backgroundColor.includes('rgb(255, 255, 255)') && color.includes('rgb(200, 200, 200)')) {
      lowContrastElements.push(elements[i]);
    }
  }
  
  if (lowContrastElements.length > 0) {
    accessibilityIssues.push({
      type: 'accessibility',
      severity: 'medium',
      description: `${lowContrastElements.length} elements may have insufficient color contrast`,
      location: 'Various elements',
      suggestion: 'Ensure text has sufficient contrast with its background (4.5:1 for normal text)',
      affectedStakeholders: ['general', 'auditor', 'project-owner', 'admin']
    });
  }
  
  // Check for keyboard accessibility
  const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
  interactiveElements.forEach(element => {
    if (element.getAttribute('tabindex') === '-1' && !element.getAttribute('aria-hidden')) {
      accessibilityIssues.push({
        type: 'accessibility',
        severity: 'high',
        description: 'Interactive element not keyboard accessible',
        location: element.outerHTML.substring(0, 80) + '...',
        suggestion: 'Remove tabindex="-1" or ensure the element is not intended for user interaction',
        affectedStakeholders: ['general', 'auditor', 'project-owner', 'admin']
      });
    }
  });
  
  return accessibilityIssues;
};

// Add an exported object with the validation function to fix the import issue
export const AccessibilityValidator = {
  validate: validateAccessibility
};
