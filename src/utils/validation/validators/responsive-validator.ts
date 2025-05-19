
import { ValidationIssue } from "../types";

/**
 * Validates responsive design elements on the current page
 * @returns Array of validation issues related to responsive design
 */
export const validateResponsiveDesign = (): ValidationIssue[] => {
  const responsiveIssues: ValidationIssue[] = [];
  
  // Check for fixed width elements that might cause horizontal overflow
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    const style = window.getComputedStyle(element);
    const width = parseInt(style.width);
    
    // Check for elements with fixed width over 1000px 
    if (width > 1000 && !style.width.includes('%') && !style.width.includes('vw')) {
      responsiveIssues.push({
        type: 'responsive',
        severity: 'medium',
        description: `Element with fixed width (${width}px) may cause overflow on mobile`,
        location: `${element.tagName.toLowerCase()}${element.id ? '#'+element.id : ''}${element.className ? '.'+element.className.split(' ').join('.') : ''}`,
        suggestion: 'Use relative units (%, rem) or max-width instead of fixed width',
        affectedStakeholders: ['general']
      });
    }
    
    // Check for small touch targets
    const isInteractive = element.tagName === 'BUTTON' || 
                           element.tagName === 'A' || 
                           element.hasAttribute('onclick');
    
    if (isInteractive) {
      const height = parseInt(style.height);
      const width = parseInt(style.width);
      
      if ((height > 0 && height < 44) || (width > 0 && width < 44)) {
        responsiveIssues.push({
          type: 'accessibility',
          severity: 'medium',
          description: 'Interactive element may be too small for touch targets',
          location: `${element.tagName.toLowerCase()}${element.id ? '#'+element.id : ''}${element.className ? '.'+element.className.split(' ').join('.') : ''}`,
          suggestion: 'Ensure touch targets are at least 44x44px for mobile usability',
          affectedStakeholders: ['general', 'auditor', 'project-owner']
        });
      }
    }
  });
  
  // Check for media queries usage
  const styleSheets = document.styleSheets;
  let hasMediaQueries = false;
  
  try {
    for (let i = 0; i < styleSheets.length; i++) {
      const rules = styleSheets[i].cssRules || styleSheets[i].rules;
      if (!rules) continue;
      
      for (let j = 0; j < rules.length; j++) {
        if (rules[j].type === CSSRule.MEDIA_RULE) {
          hasMediaQueries = true;
          break;
        }
      }
      
      if (hasMediaQueries) break;
    }
  } catch (e) {
    // CORS issues with some stylesheets can cause errors
  }
  
  if (!hasMediaQueries) {
    responsiveIssues.push({
      type: 'responsive',
      severity: 'high',
      description: 'No media queries detected in stylesheets',
      location: 'global CSS',
      suggestion: 'Implement responsive design with media queries for different screen sizes',
      affectedStakeholders: ['general', 'auditor', 'project-owner', 'admin']
    });
  }
  
  // Check for viewport meta tag
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (!viewportMeta) {
    responsiveIssues.push({
      type: 'responsive',
      severity: 'high',
      description: 'Viewport meta tag is missing',
      location: 'document head',
      suggestion: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0"> to the head',
      affectedStakeholders: ['general']
    });
  }
  
  // Check for overflow issues
  const bodyWidth = document.body.clientWidth;
  const windowWidth = window.innerWidth;
  
  if (bodyWidth > windowWidth) {
    responsiveIssues.push({
      type: 'responsive',
      severity: 'high',
      description: 'Page content causes horizontal overflow',
      location: 'body',
      suggestion: 'Check for elements with fixed widths or negative margins causing overflow',
      affectedStakeholders: ['general']
    });
  }
  
  return responsiveIssues;
};
