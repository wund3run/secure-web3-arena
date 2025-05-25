
import { ValidationIssue } from "../types";
import { handleAccessibilityError } from "@/utils/error-handling/accessibilityErrorHandler";

export const validateAccessibility = (): ValidationIssue[] => {
  const issues: ValidationIssue[] = [];
  
  try {
    // Check for missing alt text on images
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (!img.alt && !img.getAttribute('aria-label')) {
        issues.push({
          type: 'accessibility',
          severity: 'high',
          description: `Image ${index + 1} missing alt text`,
          location: 'Images',
          suggestion: 'Add descriptive alt text to all images',
          affectedStakeholders: ['end-users', 'compliance']
        });
        
        handleAccessibilityError(
          'aria',
          `Image missing alt text: ${img.src}`,
          img,
          'high',
          'Add descriptive alt text for screen readers'
        );
      }
    });
    
    // Check for missing form labels
    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach((input, index) => {
      const hasLabel = input.id && document.querySelector(`label[for="${input.id}"]`);
      const hasAriaLabel = input.getAttribute('aria-label');
      const hasAriaLabelledBy = input.getAttribute('aria-labelledby');
      
      if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
        issues.push({
          type: 'accessibility',
          severity: 'high',
          description: `Form input ${index + 1} missing label`,
          location: 'Forms',
          suggestion: 'Add proper labels to all form inputs',
          affectedStakeholders: ['end-users', 'compliance']
        });
        
        handleAccessibilityError(
          'aria',
          `Form input missing label: ${input.tagName}`,
          input as HTMLElement,
          'high',
          'Add a label element or aria-label attribute'
        );
      }
    });
    
    // Check for insufficient color contrast (basic check)
    const buttons = document.querySelectorAll('button');
    buttons.forEach((button, index) => {
      const styles = window.getComputedStyle(button);
      const backgroundColor = styles.backgroundColor;
      const color = styles.color;
      
      // Simple check for default colors that might have contrast issues
      if (backgroundColor === 'rgb(255, 255, 255)' && color === 'rgb(255, 255, 255)') {
        issues.push({
          type: 'accessibility',
          severity: 'medium',
          description: `Button ${index + 1} may have color contrast issues`,
          location: 'Color contrast',
          suggestion: 'Ensure sufficient color contrast (4.5:1 ratio)',
          affectedStakeholders: ['end-users', 'compliance']
        });
        
        handleAccessibilityError(
          'color-contrast',
          `Button may have insufficient color contrast`,
          button,
          'medium',
          'Check color contrast ratios meet WCAG guidelines'
        );
      }
    });
    
    // Check for missing focus indicators
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length > 0) {
      // This is a basic check - in production you'd want more sophisticated focus testing
      const hasGlobalFocusStyles = document.querySelector('style')?.textContent?.includes(':focus') ||
                                   Array.from(document.styleSheets).some(sheet => {
                                     try {
                                       return Array.from(sheet.cssRules).some(rule => 
                                         rule.cssText.includes(':focus')
                                       );
                                     } catch {
                                       return false;
                                     }
                                   });
      
      if (!hasGlobalFocusStyles) {
        issues.push({
          type: 'accessibility',
          severity: 'medium',
          description: 'Missing focus indicators for keyboard navigation',
          location: 'Focus management',
          suggestion: 'Add visible focus indicators for all interactive elements',
          affectedStakeholders: ['end-users', 'compliance']
        });
      }
    }
    
    // Check for proper heading hierarchy
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let previousLevel = 0;
    
    headings.forEach((heading, index) => {
      const currentLevel = parseInt(heading.tagName.charAt(1));
      
      if (index === 0 && currentLevel !== 1) {
        issues.push({
          type: 'accessibility',
          severity: 'medium',
          description: 'Page should start with an h1 heading',
          location: 'Heading structure',
          suggestion: 'Ensure proper heading hierarchy starting with h1',
          affectedStakeholders: ['end-users', 'compliance']
        });
      }
      
      if (currentLevel > previousLevel + 1) {
        issues.push({
          type: 'accessibility',
          severity: 'medium',
          description: `Heading level skip detected (h${previousLevel} to h${currentLevel})`,
          location: 'Heading structure',
          suggestion: 'Use sequential heading levels (don\'t skip levels)',
          affectedStakeholders: ['end-users', 'compliance']
        });
      }
      
      previousLevel = currentLevel;
    });
    
    console.log(`[A11Y] Accessibility validation completed. Found ${issues.length} issues.`);
    
  } catch (error) {
    console.error('Error during accessibility validation:', error);
    issues.push({
      type: 'accessibility',
      severity: 'high',
      description: 'Accessibility validation failed',
      location: 'Accessibility system',
      suggestion: 'Check browser console for details'
    });
  }
  
  return issues;
};
