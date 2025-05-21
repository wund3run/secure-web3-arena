
import { ValidationIssue } from "../types";

/**
 * Validates design consistency across the application
 * @param currentPath The current page path
 * @returns Array of validation issues related to design and UX consistency
 */
export const validateConsistency = (currentPath: string): ValidationIssue[] => {
  const consistencyIssues: ValidationIssue[] = [];
  
  // Check for color scheme consistency
  const allTextElements = document.querySelectorAll('button, a, h1, h2, h3, h4, h5, h6, p, span, label');
  const colorMap = new Map<string, number>();
  
  allTextElements.forEach(el => {
    const style = window.getComputedStyle(el);
    const color = style.color;
    
    if (!colorMap.has(color)) {
      colorMap.set(color, 1);
    } else {
      colorMap.set(color, colorMap.get(color)! + 1);
    }
  });
  
  // If there are too many different text colors (more than 8), it could indicate inconsistency
  if (colorMap.size > 8) {
    consistencyIssues.push({
      type: 'ui',
      severity: 'medium',
      description: `Page uses ${colorMap.size} different text colors, which may indicate inconsistent styling`,
      location: currentPath,
      suggestion: 'Standardize text colors according to design system guidelines',
      affectedStakeholders: ['general']
    });
  }
  
  // Check for font family consistency
  const fontMap = new Map<string, number>();
  allTextElements.forEach(el => {
    const style = window.getComputedStyle(el);
    const fontFamily = style.fontFamily;
    
    if (!fontMap.has(fontFamily)) {
      fontMap.set(fontFamily, 1);
    } else {
      fontMap.set(fontFamily, fontMap.get(fontFamily)! + 1);
    }
  });
  
  // If there are more than 3 font families, it could indicate inconsistency
  if (fontMap.size > 3) {
    consistencyIssues.push({
      type: 'ui',
      severity: 'medium',
      description: `Page uses ${fontMap.size} different font families, which may affect visual consistency`,
      location: currentPath,
      suggestion: 'Limit font families to those defined in the design system',
      affectedStakeholders: ['general']
    });
  }
  
  // Check for spacing consistency
  const spacingPatterns = [
    { selector: 'div > div', property: 'marginBottom' },
    { selector: 'section > div', property: 'marginTop' },
  ];
  
  spacingPatterns.forEach(({ selector, property }) => {
    const elements = document.querySelectorAll(selector);
    const spacingValues = new Set();
    
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      const value = style[property as any];
      if (value && value !== '0px') {
        spacingValues.add(value);
      }
    });
    
    // If there are too many different spacing values, it might indicate inconsistent spacing
    if (spacingValues.size > 5) {
      consistencyIssues.push({
        type: 'ui',
        severity: 'low',
        description: `Multiple inconsistent ${property} values detected in ${selector} elements`,
        location: currentPath,
        suggestion: 'Use consistent spacing based on the design system spacing scale',
        affectedStakeholders: ['general']
      });
    }
  });
  
  // Check for button styling consistency
  const buttons = document.querySelectorAll('button');
  const buttonStyleMap = new Map<string, number>();
  
  buttons.forEach(button => {
    const style = window.getComputedStyle(button);
    const buttonStyleKey = `${style.backgroundColor}-${style.color}-${style.borderRadius}-${style.padding}`;
    
    if (!buttonStyleMap.has(buttonStyleKey)) {
      buttonStyleMap.set(buttonStyleKey, 1);
    } else {
      buttonStyleMap.set(buttonStyleKey, buttonStyleMap.get(buttonStyleKey)! + 1);
    }
  });
  
  // If there are too many different button styles, it might indicate inconsistency
  if (buttonStyleMap.size > 5 && buttons.length > 5) {
    consistencyIssues.push({
      type: 'ui',
      severity: 'medium',
      description: 'Multiple inconsistent button styles detected on the page',
      location: currentPath,
      suggestion: 'Standardize button variants according to the design system',
      affectedStakeholders: ['general']
    });
  }
  
  return consistencyIssues;
};
