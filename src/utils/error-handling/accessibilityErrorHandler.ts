
/**
 * Interface for accessibility error options
 */
interface AccessibilityErrorOptions {
  elementIdentifier?: string;
  wcagCriterion?: string;
  attemptAutoFix?: boolean;
}

/**
 * Handles errors related to accessibility issues
 * @param error Error object
 * @param options Options for handling the error
 */
export const handleAccessibilityError = (
  error: Error,
  options: AccessibilityErrorOptions = {}
): void => {
  // Log the error with accessibility context
  console.error(`Accessibility Error: ${error.message}`, {
    ...options,
    timestamp: new Date().toISOString()
  });
  
  // Attempt automatic fixes if enabled
  if (options.attemptAutoFix) {
    try {
      applyAccessibilityFix(options.elementIdentifier, options.wcagCriterion);
    } catch (fixError) {
      console.warn('Failed to auto-fix accessibility issue', fixError);
    }
  }
};

/**
 * Attempts to apply automatic fixes for common accessibility issues
 */
const applyAccessibilityFix = (
  elementIdentifier?: string,
  wcagCriterion?: string
): void => {
  if (!elementIdentifier) return;
  
  // Attempt to find the element
  const elements = document.querySelectorAll(elementIdentifier);
  if (!elements || elements.length === 0) {
    const altElements = document.querySelectorAll(`[src="${elementIdentifier}"], [href="${elementIdentifier}"]`);
    if (!altElements || altElements.length === 0) {
      console.warn(`Cannot find element to fix: ${elementIdentifier}`);
      return;
    }
    
    // Apply fixes to alternative elements - Fix the type issue here
    altElements.forEach((element) => {
      fixElement(element);
    });
    return;
  }
  
  // Apply fixes to found elements - Fix the type issue here as well
  elements.forEach((element) => {
    fixElement(element, wcagCriterion);
  });
};

/**
 * Applies fixes to individual elements based on their type and issues
 */
const fixElement = (element: Element, wcagCriterion?: string): void => {
  // Image missing alt text
  if (element.tagName === 'IMG' && !element.hasAttribute('alt')) {
    (element as HTMLImageElement).alt = 'Image description - please update';
    console.log(`Added placeholder alt text to image: ${(element as HTMLImageElement).src}`);
  }
  
  // Link missing accessible name
  if (element.tagName === 'A' && !(element.textContent?.trim())) {
    if (element.querySelector('img')) {
      // Link contains an image but no text
      const img = element.querySelector('img');
      if (img && !img.hasAttribute('alt')) {
        (img as HTMLImageElement).alt = 'Link description - please update';
      }
    } else {
      // Empty link with no content
      element.setAttribute('aria-label', 'Link description - please update');
    }
    console.log(`Added placeholder accessible name to link: ${(element as HTMLAnchorElement).href}`);
  }
};
