
import { ValidationIssue } from "../types";

/**
 * Validator for checking accessibility issues
 */
export class AccessibilityValidator {
  /**
   * Run accessibility validation checks on the page
   * @returns Array of validation issues found
   */
  static validate(): ValidationIssue[] {
    const issues: ValidationIssue[] = [];
    
    // Check for images without alt text
    const imagesWithoutAlt = Array.from(document.querySelectorAll('img:not([alt])'));
    imagesWithoutAlt.forEach(img => {
      const element = img as HTMLImageElement;
      const location = element.src ? 
        `Image: ${element.src.substring(0, 50)}${element.src.length > 50 ? '...' : ''}` : 
        'Unknown image location';
      
      issues.push({
        type: 'accessibility',
        severity: 'high',
        description: 'Image missing alt text',
        location,
        suggestion: 'Add descriptive alt text to the image for screen readers',
        wcagCriterion: 'WCAG 1.1.1 (Non-text Content)'
      });
    });
    
    // Check for form inputs without labels
    const inputs = Array.from(document.querySelectorAll('input, select, textarea'));
    inputs.forEach(input => {
      const element = input as HTMLElement;
      const id = element.id;
      
      if (id && !document.querySelector(`label[for="${id}"]`)) {
        const inputType = element.getAttribute('type') || element.tagName.toLowerCase();
        const location = `${inputType} input with id: ${id}`;
        
        issues.push({
          type: 'accessibility',
          severity: 'medium',
          description: 'Form control lacks associated label',
          location,
          suggestion: `Add a label element with for="${id}" attribute`,
          wcagCriterion: 'WCAG 3.3.2 (Labels or Instructions)'
        });
      }
    });
    
    // Check for proper heading structure
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    let previousLevel = 0;
    
    headings.forEach((heading, index) => {
      const element = heading as HTMLHeadingElement;
      const level = parseInt(element.tagName.charAt(1));
      
      if (index === 0 && level !== 1) {
        issues.push({
          type: 'accessibility',
          severity: 'medium',
          description: 'Page does not start with an H1 heading',
          location: `First heading is ${element.tagName}`,
          suggestion: 'Start page structure with an H1 element',
          wcagCriterion: 'WCAG 1.3.1 (Info and Relationships)'
        });
      }
      
      if (index > 0 && level > previousLevel + 1) {
        issues.push({
          type: 'accessibility',
          severity: 'low',
          description: 'Heading levels should not be skipped',
          location: `From ${previousLevel} to ${level}`,
          suggestion: `Use proper heading hierarchy without skipping levels`,
          wcagCriterion: 'WCAG 1.3.1 (Info and Relationships)'
        });
      }
      
      previousLevel = level;
    });
    
    // Return all found issues
    return issues;
  }
}
