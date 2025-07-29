
import { ValidationIssue } from "../types";

/**
 * Validates responsive design aspects of the application
 * @returns Array of validation issues related to responsive design
 */
export const validateResponsiveDesign = (): ValidationIssue[] => {
  const responsiveIssues: ValidationIssue[] = [];
  
  // Check for fixed width elements that might cause horizontal scrolling
  const allElements = document.querySelectorAll('*');
  const viewportWidth = window.innerWidth;
  
  allElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    
    // Check for elements wider than viewport that are not the body or html
    if (rect.width > viewportWidth && 
        el.tagName !== 'BODY' && 
        el.tagName !== 'HTML' &&
        !el.tagName.includes('svg')) {
      
      responsiveIssues.push({
        type: 'responsive',
        severity: 'high',
        description: `Element wider than viewport causes horizontal scrolling`,
        location: `Element: ${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ''}`,
        suggestion: 'Apply max-width: 100% or use responsive width units',
        affectedStakeholders: ['general']
      });
    }
  });
  
  // Check for touch target sizes on mobile
  if (viewportWidth < 768) { // Mobile viewport detection
    const smallTouchTargets = [];
    const interactiveElements = document.querySelectorAll('button, a, input, select, textarea');
    
    interactiveElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      
      // Touch targets should be at least 44x44px according to WCAG
      if ((rect.width < 44 || rect.height < 44) && 
          rect.width > 0 && rect.height > 0 && // Exclude hidden elements
          window.getComputedStyle(el).display !== 'none') {
        
        smallTouchTargets.push(el);
      }
    });
    
    // Only report if there are multiple small touch targets
    if (smallTouchTargets.length > 3) {
      responsiveIssues.push({
        type: 'responsive',
        severity: 'medium',
        description: `${smallTouchTargets.length} interactive elements have touch targets smaller than 44x44px`,
        location: 'Multiple interactive elements',
        suggestion: 'Increase touch target size for better mobile usability',
        affectedStakeholders: ['general']
      });
    }
  }
  
  // Check for font size issues on mobile
  if (viewportWidth < 768) {
    const textElements = document.querySelectorAll('p, span, li, td, th, dd, dt, button, a, input, label, select');
    const smallTextCount = Array.from(textElements).filter(el => {
      const fontSize = parseInt(window.getComputedStyle(el).fontSize);
      return fontSize < 14 && fontSize > 0; // Text smaller than 14px is hard to read on mobile
    }).length;
    
    if (smallTextCount > 5) {
      responsiveIssues.push({
        type: 'responsive',
        severity: 'medium',
        description: `${smallTextCount} text elements have font size smaller than 14px on mobile`,
        location: 'Text elements across page',
        suggestion: 'Increase minimum font size to at least 14px for mobile viewports',
        affectedStakeholders: ['general']
      });
    }
  }
  
  // Check for tables without responsive handling
  const tables = document.querySelectorAll('table');
  tables.forEach(table => {
    const parent = table.parentElement;
    if (parent && !parent.style.overflowX && !parent.classList.contains('overflow-auto')) {
      responsiveIssues.push({
        type: 'responsive',
        severity: 'medium',
        description: 'Table may cause horizontal scrolling on mobile devices',
        location: `Table element`,
        suggestion: 'Wrap table in a container with overflow-x: auto',
        affectedStakeholders: ['general']
      });
    }
  });
  
  // Check for forms without responsive layout
  const forms = document.querySelectorAll('form');
  forms.forEach(form => {
    // Check for side-by-side inputs that might not work well on mobile
    const formGroups = form.querySelectorAll('.form-group, .input-group');
    if (formGroups.length > 0) {
      const horizontalGroups = Array.from(formGroups).filter(group => {
        const inputs = group.querySelectorAll('input, select, textarea');
        return inputs.length > 1;
      });
      
      if (horizontalGroups.length > 0 && viewportWidth < 768) {
        responsiveIssues.push({
          type: 'responsive',
          severity: 'low',
          description: 'Form has horizontal input groups that may not display well on mobile',
          location: 'Form element',
          suggestion: 'Stack form inputs vertically on mobile screens',
          affectedStakeholders: ['general']
        });
      }
    }
  });
  
  // Check for proper viewport meta tag
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (!viewportMeta) {
    responsiveIssues.push({
      type: 'responsive',
      severity: 'high',
      description: 'Missing viewport meta tag, which is essential for responsive design',
      location: 'Document head',
      suggestion: 'Add viewport meta tag: <meta name="viewport" content="width=device-width, initial-scale=1">',
      affectedStakeholders: ['general']
    });
  }
  
  return responsiveIssues;
};
