
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
    
    // Check for elements with fixed width over viewport width
    const viewportWidth = window.innerWidth;
    if (width > viewportWidth && !style.width.includes('%') && !style.width.includes('vw') && !style.width.includes('calc')) {
      responsiveIssues.push({
        type: 'responsive',
        severity: 'high',
        description: `Element with fixed width (${width}px) is causing overflow on current viewport (${viewportWidth}px)`,
        location: `${element.tagName.toLowerCase()}${element.id ? '#'+element.id : ''}${element.className ? '.'+element.className.split(' ').join('.') : ''}`,
        suggestion: 'Use responsive units (%, rem, vw) or add max-width: 100% to prevent overflow',
        affectedStakeholders: ['general', 'auditor', 'project-owner']
      });
    }
    
    // Check for small touch targets
    const isInteractive = element.tagName === 'BUTTON' || 
                           element.tagName === 'A' || 
                           element.hasAttribute('onclick') ||
                           element.getAttribute('role') === 'button';
    
    if (isInteractive) {
      const height = parseInt(style.height);
      const width = parseInt(style.width);
      
      // WCAG recommends touch targets to be at least 44x44px
      if ((height > 0 && height < 44) || (width > 0 && width < 44)) {
        responsiveIssues.push({
          type: 'accessibility',
          severity: 'medium',
          description: 'Interactive element is too small for touch targets',
          location: `${element.tagName.toLowerCase()}${element.id ? '#'+element.id : ''}${element.className ? '.'+element.className.split(' ').join('.') : ''}`,
          suggestion: 'Ensure touch targets are at least 44x44px for mobile usability',
          affectedStakeholders: ['general', 'auditor', 'project-owner']
        });
      }
    }
    
    // Check for font-size that's too small on mobile
    if (element instanceof HTMLElement && element.innerText && element.innerText.trim().length > 0) {
      const fontSize = parseFloat(style.fontSize);
      if (fontSize < 14 && window.innerWidth <= 768) {
        responsiveIssues.push({
          type: 'accessibility',
          severity: 'medium',
          description: `Text with font-size ${fontSize}px is too small for mobile viewing`,
          location: `${element.tagName.toLowerCase()}${element.id ? '#'+element.id : ''}${element.className ? '.'+element.className.split(' ').join('.') : ''}`,
          suggestion: 'Use at least 14px font size for body text on mobile devices',
          affectedStakeholders: ['general']
        });
      }
    }
  });
  
  // Check for media queries usage
  const styleSheets = document.styleSheets;
  let hasMediaQueries = false;
  let mobileMediaQueries = false;
  
  try {
    for (let i = 0; i < styleSheets.length; i++) {
      const rules = styleSheets[i].cssRules || styleSheets[i].rules;
      if (!rules) continue;
      
      for (let j = 0; j < rules.length; j++) {
        if (rules[j].type === CSSRule.MEDIA_RULE) {
          hasMediaQueries = true;
          
          // Check if there are mobile-specific media queries
          const mediaText = (rules[j] as CSSMediaRule).conditionText || (rules[j] as any).media?.mediaText;
          if (mediaText && (mediaText.includes('max-width') || mediaText.includes('min-width'))) {
            mobileMediaQueries = true;
          }
        }
      }
      
      if (mobileMediaQueries) break;
    }
  } catch (e) {
    // CORS issues with some stylesheets can cause errors
    console.warn('Could not check all stylesheets for media queries due to CORS restrictions');
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
  } else if (!mobileMediaQueries) {
    responsiveIssues.push({
      type: 'responsive',
      severity: 'medium',
      description: 'No mobile-specific media queries detected',
      location: 'global CSS',
      suggestion: 'Add media queries targeting mobile viewports (e.g. max-width: 768px)',
      affectedStakeholders: ['general']
    });
  }
  
  // Check for viewport meta tag
  const viewportMeta = document.querySelector('meta[name="viewport"]');
  if (!viewportMeta) {
    responsiveIssues.push({
      type: 'responsive',
      severity: 'high', // Changed from 'critical' to 'high'
      description: 'Viewport meta tag is missing',
      location: 'document head',
      suggestion: 'Add <meta name="viewport" content="width=device-width, initial-scale=1.0"> to the head',
      affectedStakeholders: ['general']
    });
  } else {
    const content = viewportMeta.getAttribute('content') || '';
    if (!content.includes('width=device-width') || !content.includes('initial-scale=1')) {
      responsiveIssues.push({
        type: 'responsive',
        severity: 'high',
        description: 'Viewport meta tag is missing essential properties',
        location: 'document head',
        suggestion: 'Update the viewport meta tag to include width=device-width and initial-scale=1.0',
        affectedStakeholders: ['general']
      });
    }
  }
  
  // Check for overflow issues
  const documentWidth = Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  );
  
  const windowWidth = window.innerWidth;
  
  if (documentWidth > windowWidth + 5) { // 5px buffer for potential rounding errors
    responsiveIssues.push({
      type: 'responsive',
      severity: 'high',
      description: `Page content causes horizontal overflow (document width: ${documentWidth}px, viewport width: ${windowWidth}px)`,
      location: 'document body',
      suggestion: 'Check for elements with fixed widths, negative margins, or overflowing content causing horizontal scrollbars',
      affectedStakeholders: ['general']
    });
  }
  
  return responsiveIssues;
};
