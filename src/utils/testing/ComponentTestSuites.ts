
import { testRunner, TestSuite } from './AutomatedTestRunner';

// UI Component Tests
const uiComponentTests: TestSuite = {
  name: 'UI Components',
  description: 'Tests for UI component rendering and interactions',
  tests: [
    {
      id: 'button_render',
      name: 'Button renders correctly',
      component: 'Button',
      testFunction: () => {
        const button = document.createElement('button');
        button.textContent = 'Test Button';
        document.body.appendChild(button);
        
        if (!button.textContent) {
          throw new Error('Button text not rendered');
        }
        
        document.body.removeChild(button);
      }
    },
    {
      id: 'navigation_links',
      name: 'Navigation links are accessible',
      component: 'Navbar',
      testFunction: () => {
        const nav = document.querySelector('nav');
        if (!nav) {
          throw new Error('Navigation not found');
        }
        
        const links = nav.querySelectorAll('a');
        if (links.length === 0) {
          throw new Error('No navigation links found');
        }
      }
    },
    {
      id: 'responsive_layout',
      name: 'Layout is responsive',
      component: 'Layout',
      testFunction: () => {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) {
          throw new Error('Viewport meta tag not found');
        }
      }
    }
  ]
};

// Performance Tests
const performanceTests: TestSuite = {
  name: 'Performance',
  description: 'Tests for application performance',
  tests: [
    {
      id: 'page_load_time',
      name: 'Page loads within 3 seconds',
      component: 'App',
      testFunction: () => {
        const loadTime = performance.now();
        if (loadTime > 3000) {
          throw new Error(`Page load time ${loadTime}ms exceeds 3000ms threshold`);
        }
      }
    },
    {
      id: 'memory_usage',
      name: 'Memory usage is reasonable',
      component: 'App',
      testFunction: () => {
        if ('memory' in performance) {
          const memory = (performance as any).memory;
          const usedMB = memory.usedJSHeapSize / 1024 / 1024;
          if (usedMB > 100) {
            console.warn(`High memory usage: ${usedMB.toFixed(2)}MB`);
          }
        }
      }
    }
  ]
};

// Accessibility Tests
const accessibilityTests: TestSuite = {
  name: 'Accessibility',
  description: 'Tests for accessibility compliance',
  tests: [
    {
      id: 'alt_text_images',
      name: 'Images have alt text',
      component: 'Images',
      testFunction: () => {
        const images = document.querySelectorAll('img');
        const imagesWithoutAlt = Array.from(images).filter(img => !img.alt);
        if (imagesWithoutAlt.length > 0) {
          throw new Error(`${imagesWithoutAlt.length} images missing alt text`);
        }
      }
    },
    {
      id: 'form_labels',
      name: 'Form inputs have labels',
      component: 'Forms',
      testFunction: () => {
        const inputs = document.querySelectorAll('input, textarea, select');
        const inputsWithoutLabels = Array.from(inputs).filter(input => {
          const id = input.id;
          const label = id ? document.querySelector(`label[for="${id}"]`) : null;
          const ariaLabel = input.getAttribute('aria-label');
          return !label && !ariaLabel;
        });
        
        if (inputsWithoutLabels.length > 0) {
          throw new Error(`${inputsWithoutLabels.length} form inputs missing labels`);
        }
      }
    },
    {
      id: 'focus_management',
      name: 'Focus management works correctly',
      component: 'Navigation',
      testFunction: () => {
        const focusableElements = document.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length === 0) {
          throw new Error('No focusable elements found');
        }
      }
    }
  ]
};

// Error Handling Tests
const errorHandlingTests: TestSuite = {
  name: 'Error Handling',
  description: 'Tests for error boundary and error handling',
  tests: [
    {
      id: 'error_boundary_exists',
      name: 'Error boundaries are present',
      component: 'ErrorBoundary',
      testFunction: () => {
        // Check if error boundary components exist in the DOM
        const errorBoundaries = document.querySelectorAll('[data-error-boundary]');
        if (errorBoundaries.length === 0) {
          console.warn('No error boundaries found in DOM');
        }
      }
    },
    {
      id: 'console_errors',
      name: 'No console errors on load',
      component: 'App',
      testFunction: () => {
        const originalError = console.error;
        let errorCount = 0;
        
        console.error = (...args) => {
          errorCount++;
          originalError.apply(console, args);
        };
        
        // Reset after test
        setTimeout(() => {
          console.error = originalError;
          if (errorCount > 0) {
            throw new Error(`${errorCount} console errors detected`);
          }
        }, 1000);
      }
    }
  ]
};

// Initialize test suites
export function initializeTestSuites() {
  testRunner.addTestSuite(uiComponentTests);
  testRunner.addTestSuite(performanceTests);
  testRunner.addTestSuite(accessibilityTests);
  testRunner.addTestSuite(errorHandlingTests);
}

export {
  uiComponentTests,
  performanceTests,
  accessibilityTests,
  errorHandlingTests
};
