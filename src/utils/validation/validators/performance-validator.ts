
import { ValidationIssue } from "../types";

/**
 * Validates performance aspects of the application
 * @returns Array of validation issues related to performance
 */
export const validatePerformance = (): ValidationIssue[] => {
  const performanceIssues: ValidationIssue[] = [];
  
  // Check for large images without proper optimization
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Check if image is larger than it needs to be
    if (img.naturalWidth > 0) {
      const displayWidth = img.width;
      const naturalWidth = img.naturalWidth;
      
      // If image's natural size is more than 2x its display size, it may be unoptimized
      if (naturalWidth > displayWidth * 2 && naturalWidth > 1000) {
        performanceIssues.push({
          type: 'performance',
          severity: 'medium',
          description: 'Image is significantly larger than its display size',
          location: `Image: ${img.src}`,
          suggestion: 'Resize and optimize image to match its display dimensions',
          affectedStakeholders: ['general']
        });
      }
      
      // Check if image has a srcset for responsive loading
      if (!img.srcset && img.width > 300) {
        performanceIssues.push({
          type: 'performance',
          severity: 'low',
          description: 'Large image without srcset for responsive loading',
          location: `Image: ${img.src}`,
          suggestion: 'Add srcset attribute for responsive image loading',
          affectedStakeholders: ['general']
        });
      }
    }
  });
  
  // Check for excessive DOM nodes (potential performance issue)
  const domCount = document.querySelectorAll('*').length;
  if (domCount > 1000) {
    performanceIssues.push({
      type: 'performance',
      severity: 'medium',
      description: `Page has ${domCount} DOM elements, which may affect performance`,
      location: 'Current page',
      suggestion: 'Consider virtualizing lists or optimizing component rendering',
      affectedStakeholders: ['general']
    });
  }
  
  // Check for potential memory leaks from event listeners
  // This is a simplified check - real memory leak detection requires more sophisticated tools
  const eventElements = document.querySelectorAll('[onclick], [onchange], [onsubmit]');
  if (eventElements.length > 50) {
    performanceIssues.push({
      type: 'performance',
      severity: 'low',
      description: 'High number of inline event handlers may impact performance',
      location: 'Current page',
      suggestion: 'Consider using event delegation where appropriate',
      affectedStakeholders: ['general']
    });
  }
  
  // Check if the page is using too many web fonts (impacts loading performance)
  const stylesheets = document.styleSheets;
  let fontFaceCount = 0;
  
  for (let i = 0; i < stylesheets.length; i++) {
    try {
      const cssRules = stylesheets[i].cssRules;
      for (let j = 0; j < cssRules.length; j++) {
        if (cssRules[j].type === CSSRule.FONT_FACE_RULE) {
          fontFaceCount++;
        }
      }
    } catch (e) {
      // CORS restrictions prevent reading some external stylesheets
    }
  }
  
  if (fontFaceCount > 5) {
    performanceIssues.push({
      type: 'performance',
      severity: 'low',
      description: `Page uses ${fontFaceCount} font faces, which may slow initial loading`,
      location: 'CSS resources',
      suggestion: 'Limit the number of web fonts and consider system fonts where appropriate',
      affectedStakeholders: ['general']
    });
  }
  
  return performanceIssues;
};
