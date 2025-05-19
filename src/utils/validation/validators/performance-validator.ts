
import { ValidationIssue } from "../types";

/**
 * Validates performance aspects of the current page
 * @returns Array of validation issues related to performance
 */
export const validatePerformance = (): ValidationIssue[] => {
  const performanceIssues: ValidationIssue[] = [];
  
  // Check for large images that should be optimized
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Check if image dimensions are available
    if (img.naturalWidth > 0 && img.naturalHeight > 0) {
      // Check for images being scaled down significantly (wasting bandwidth)
      const displayRatio = img.width * img.height;
      const naturalRatio = img.naturalWidth * img.naturalHeight;
      
      if (naturalRatio > 0 && displayRatio > 0) {
        const scalingFactor = naturalRatio / displayRatio;
        
        if (scalingFactor > 4) {
          performanceIssues.push({
            type: 'performance',
            severity: 'medium',
            description: `Image is significantly larger (${Math.round(scalingFactor)}x) than its display size`,
            location: `${img.getAttribute('src') || 'unnamed image'} (${img.naturalWidth}x${img.naturalHeight} → ${img.width}x${img.height})`,
            suggestion: 'Resize image to appropriate dimensions before serving',
            affectedStakeholders: ['general', 'project-owner']
          });
        }
      }
    }
    
    // Check for missing width/height attributes (causes layout shifts)
    if (!img.hasAttribute('width') && !img.hasAttribute('height')) {
      performanceIssues.push({
        type: 'performance',
        severity: 'low',
        description: 'Image missing width/height attributes may cause layout shifts',
        location: img.getAttribute('src') || 'unnamed image',
        suggestion: 'Add explicit width and height attributes to images',
        affectedStakeholders: ['general']
      });
    }
  });
  
  // Check for render-blocking resources
  const scripts = document.querySelectorAll('script');
  let nonDeferredScripts = 0;
  
  scripts.forEach(script => {
    const src = script.getAttribute('src');
    if (src && !script.hasAttribute('defer') && !script.hasAttribute('async')) {
      nonDeferredScripts++;
    }
  });
  
  if (nonDeferredScripts > 3) {
    performanceIssues.push({
      type: 'performance',
      severity: 'medium',
      description: `Multiple non-deferred scripts (${nonDeferredScripts}) may block rendering`,
      location: 'document head',
      suggestion: 'Add defer attribute to non-critical scripts',
      affectedStakeholders: ['general']
    });
  }
  
  // Check large DOM size (approximate check)
  const domElements = document.querySelectorAll('*').length;
  if (domElements > 1500) {
    performanceIssues.push({
      type: 'performance',
      severity: 'medium',
      description: `Large DOM size (${domElements} elements)`,
      location: 'entire document',
      suggestion: 'Reduce DOM complexity by removing unnecessary elements or implementing virtualization',
      affectedStakeholders: ['general']
    });
  }
  
  // Check custom font usage
  const fontFaces = document.querySelectorAll('style');
  let fontFaceCount = 0;
  
  fontFaces.forEach(styleElement => {
    if (styleElement.textContent?.includes('@font-face')) {
      const matches = styleElement.textContent.match(/@font-face/g);
      if (matches) {
        fontFaceCount += matches.length;
      }
    }
  });
  
  if (fontFaceCount > 4) {
    performanceIssues.push({
      type: 'performance',
      severity: 'low',
      description: `Multiple font faces (${fontFaceCount}) may impact performance`,
      location: 'document styles',
      suggestion: 'Limit custom fonts and consider system fonts where appropriate',
      affectedStakeholders: ['general']
    });
  }
  
  // Add more performance checks as needed
  
  return performanceIssues;
};
