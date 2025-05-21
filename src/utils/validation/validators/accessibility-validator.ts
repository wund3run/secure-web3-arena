
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
    if (!img.alt && !img.getAttribute('role') === 'presentation') {
      accessibilityIssues.push({
        type: 'accessibility',
        severity: 'high',
        description: 'Image without alt text',
        location: `Image: ${img.src || 'unknown source'}`,
        suggestion: 'Add descriptive alt text to all images or mark as decorative',
        affectedStakeholders: ['general'],
        wcagCriterion: 'WCAG 1.1.1 (Non-text Content)'
      });
    }
  });
  
  // Check for form inputs without labels
  const inputs = document.querySelectorAll('input, select, textarea');
  inputs.forEach(input => {
    const id = input.id;
    if (id) {
      const hasLabel = document.querySelector(`label[for="${id}"]`);
      if (!hasLabel && input.type !== 'hidden' && input.type !== 'submit' && input.type !== 'button') {
        accessibilityIssues.push({
          type: 'accessibility',
          severity: 'high',
          description: 'Form input without associated label',
          location: `Input: ${id || input.name || 'unnamed input'}`,
          suggestion: 'Add a label element with a matching "for" attribute',
          affectedStakeholders: ['general'],
          wcagCriterion: 'WCAG 1.3.1 (Info and Relationships)'
        });
      }
    } else if (input.type !== 'hidden' && input.type !== 'submit' && input.type !== 'button') {
      // Input without ID can't have a properly associated label
      accessibilityIssues.push({
        type: 'accessibility',
        severity: 'high',
        description: 'Form input without ID, preventing label association',
        location: `Input: ${input.name || 'unnamed input'}`,
        suggestion: 'Add unique ID to input and create an associated label',
        affectedStakeholders: ['general'],
        wcagCriterion: 'WCAG 1.3.1 (Info and Relationships)'
      });
    }
  });
  
  // Check for color contrast issues (simplified check)
  const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, a, button, label, span');
  let contrastIssuesCount = 0;
  
  textElements.forEach(el => {
    const style = window.getComputedStyle(el);
    const color = style.color;
    const bgColor = style.backgroundColor;
    
    // This is a simplified check - proper contrast checking requires more complex calculations
    if ((color === 'rgb(255, 255, 255)' && bgColor === 'rgb(255, 255, 255)') ||
        (color === 'rgb(0, 0, 0)' && bgColor === 'rgb(0, 0, 0)')) {
      contrastIssuesCount++;
    }
  });
  
  if (contrastIssuesCount > 0) {
    accessibilityIssues.push({
      type: 'accessibility',
      severity: 'high',
      description: `${contrastIssuesCount} elements may have insufficient color contrast`,
      location: 'Text elements across page',
      suggestion: 'Ensure color contrast meets WCAG AA standard (4.5:1 for normal text)',
      affectedStakeholders: ['general'],
      wcagCriterion: 'WCAG 1.4.3 (Contrast)'
    });
  }
  
  // Check for proper heading structure
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  const headingLevels = Array.from(headings).map(h => parseInt(h.tagName.substring(1)));
  
  // Check if there's more than one h1
  const h1Count = headingLevels.filter(level => level === 1).length;
  if (h1Count > 1) {
    accessibilityIssues.push({
      type: 'accessibility',
      severity: 'medium',
      description: `Page has ${h1Count} h1 elements; should have only one`,
      location: 'Page heading structure',
      suggestion: 'Use only one h1 element as the main page heading',
      affectedStakeholders: ['general'],
      wcagCriterion: 'WCAG 2.4.6 (Headings and Labels)'
    });
  }
  
  // Check for skipped heading levels
  for (let i = 0; i < headingLevels.length - 1; i++) {
    if (headingLevels[i + 1] > headingLevels[i] + 1) {
      accessibilityIssues.push({
        type: 'accessibility',
        severity: 'medium',
        description: `Heading structure skips from h${headingLevels[i]} to h${headingLevels[i+1]}`,
        location: 'Page heading structure',
        suggestion: 'Use sequential heading levels (e.g., h1 followed by h2)',
        affectedStakeholders: ['general'],
        wcagCriterion: 'WCAG 1.3.1 (Info and Relationships)'
      });
      break; // Report only first instance
    }
  }
  
  return accessibilityIssues;
};
