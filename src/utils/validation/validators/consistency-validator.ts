
import { ValidationIssue } from "../types";

/**
 * Validates design and content consistency across the application
 * @param pathname Current page path for location context
 * @returns Array of validation issues related to consistency
 */
export const validateConsistency = (pathname: string): ValidationIssue[] => {
  const consistencyIssues: ValidationIssue[] = [];

  // Check for heading hierarchy consistency
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  
  // Ensure there's only one h1 per page
  const h1Elements = headings.filter(h => h.tagName === 'H1');
  if (h1Elements.length === 0) {
    consistencyIssues.push({
      type: 'accessibility',
      severity: 'high',
      description: 'Page is missing an H1 heading',
      location: pathname,
      suggestion: 'Add a primary H1 heading to improve accessibility and SEO',
      affectedStakeholders: ['general']
    });
  } else if (h1Elements.length > 1) {
    consistencyIssues.push({
      type: 'accessibility',
      severity: 'medium',
      description: `Multiple H1 headings found (${h1Elements.length})`,
      location: pathname,
      suggestion: 'Use only one H1 per page for proper document structure',
      affectedStakeholders: ['general']
    });
  }
  
  // Check heading hierarchy (no skipped levels)
  let previousLevel = 0;
  for (const heading of headings) {
    const currentLevel = parseInt(heading.tagName.substring(1));
    
    // Check for skipped heading levels (e.g. h1 to h3 without h2)
    if (currentLevel > previousLevel + 1 && previousLevel !== 0) {
      consistencyIssues.push({
        type: 'design',
        severity: 'medium',
        description: `Heading hierarchy skipped from H${previousLevel} to H${currentLevel}`,
        location: `${pathname}: ${heading.textContent || 'unnamed heading'}`,
        suggestion: `Add an H${previousLevel + 1} heading before this H${currentLevel}`,
        affectedStakeholders: ['general']
      });
    }
    
    previousLevel = currentLevel;
  }
  
  // Check for consistent button styles
  const buttons = document.querySelectorAll('button');
  const buttonStyles = new Map();
  
  buttons.forEach(button => {
    const purpose = button.textContent?.trim().toLowerCase() || 'unnamed';
    const style = window.getComputedStyle(button);
    const styleSignature = `${style.backgroundColor}-${style.color}-${style.borderRadius}`;
    
    if (!buttonStyles.has(purpose)) {
      buttonStyles.set(purpose, { signature: styleSignature, count: 1, element: button });
    } else {
      const existing = buttonStyles.get(purpose);
      if (existing.signature !== styleSignature) {
        consistencyIssues.push({
          type: 'design',
          severity: 'low',
          description: `Inconsistent styling for "${purpose}" buttons`,
          location: `${pathname}: ${button.textContent || 'unnamed button'}`,
          suggestion: 'Standardize button styling for the same action types',
          affectedStakeholders: ['general']
        });
      }
      existing.count++;
    }
  });

  // Check for consistent spacing
  const contentContainers = document.querySelectorAll('.container, main > div, section');
  const spacingPatterns = new Set();
  
  contentContainers.forEach(container => {
    const style = window.getComputedStyle(container);
    const spacingPattern = `${style.padding}-${style.margin}`;
    spacingPatterns.add(spacingPattern);
  });
  
  // Flag if there are too many different spacing patterns (potential inconsistency)
  if (spacingPatterns.size > 3 && contentContainers.length > 5) {
    consistencyIssues.push({
      type: 'design',
      severity: 'low',
      description: 'Multiple inconsistent spacing patterns detected',
      location: pathname,
      suggestion: 'Standardize padding and margin values across similar containers',
      affectedStakeholders: ['general']
    });
  }

  return consistencyIssues;
};
