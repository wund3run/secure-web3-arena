
import { testRunner, TestCase } from './AutomatedTestRunner';
import { errorMonitoring } from './ErrorMonitoringService';

export const initializeTestSuites = () => {
  console.log('🧪 Initializing component test suites...');

  // Navigation Tests
  const navigationTests: TestCase[] = [
    {
      id: 'nav-home-link',
      name: 'Home Navigation Link',
      component: 'Navigation',
      testFn: async () => {
        const homeLink = document.querySelector('a[href="/"]');
        if (!homeLink) throw new Error('Home link not found in navigation');
        return true;
      }
    },
    {
      id: 'nav-marketplace-link',
      name: 'Marketplace Navigation Link',
      component: 'Navigation',
      testFn: async () => {
        const marketplaceLink = document.querySelector('a[href="/marketplace"]');
        if (!marketplaceLink) throw new Error('Marketplace link not found in navigation');
        return true;
      }
    }
  ];

  // Logo Component Tests
  const logoTests: TestCase[] = [
    {
      id: 'logo-render',
      name: 'Hawkly Logo Renders',
      component: 'HawklyLogo',
      testFn: async () => {
        const logoText = document.querySelector('[class*="text-transparent"]');
        if (!logoText || !logoText.textContent?.includes('Hawkly')) {
          throw new Error('Hawkly logo text not found or incorrect');
        }
        return true;
      }
    },
    {
      id: 'logo-svg-icon',
      name: 'Logo SVG Icon Present',
      component: 'HawklyLogo',
      testFn: async () => {
        const logoSvg = document.querySelector('svg[viewBox="0 0 24 24"]');
        if (!logoSvg) throw new Error('Logo SVG icon not found');
        return true;
      }
    }
  ];

  // Error Boundary Tests
  const errorBoundaryTests: TestCase[] = [
    {
      id: 'error-boundary-active',
      name: 'Error Boundary Component Active',
      component: 'EnhancedErrorBoundary',
      testFn: async () => {
        // Check if error boundary is properly wrapping the app
        const appContainer = document.querySelector('.min-h-screen');
        if (!appContainer) throw new Error('App container not found - error boundary may not be active');
        return true;
      }
    }
  ];

  // Analytics Tests
  const analyticsTests: TestCase[] = [
    {
      id: 'analytics-initialization',
      name: 'Analytics System Initialized',
      component: 'AnalyticsTracker',
      testFn: async () => {
        const stored = localStorage.getItem('hawkly_analytics_events');
        if (!stored) throw new Error('Analytics system not initialized - no events stored');
        return true;
      }
    }
  ];

  // Form Validation Tests
  const formTests: TestCase[] = [
    {
      id: 'form-inputs-present',
      name: 'Form Input Elements Accessible',
      component: 'Forms',
      testFn: async () => {
        const inputs = document.querySelectorAll('input, textarea, select');
        if (inputs.length === 0) throw new Error('No form inputs found on page');
        return true;
      }
    }
  ];

  // Performance Tests
  const performanceTests: TestCase[] = [
    {
      id: 'page-load-performance',
      name: 'Page Load Performance',
      component: 'Performance',
      testFn: async () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          if (loadTime > 5000) {
            throw new Error(`Page load time too slow: ${loadTime}ms`);
          }
        }
        return true;
      }
    }
  ];

  // Register all test suites
  testRunner.addTestSuite('Navigation', navigationTests);
  testRunner.addTestSuite('Logo', logoTests);
  testRunner.addTestSuite('ErrorBoundary', errorBoundaryTests);
  testRunner.addTestSuite('Analytics', analyticsTests);
  testRunner.addTestSuite('Forms', formTests);
  testRunner.addTestSuite('Performance', performanceTests);

  console.log('✅ Test suites initialized with', testRunner.getAllTests().length, 'tests');

  // Run initial health check
  setTimeout(async () => {
    console.log('🏃 Running initial test suite...');
    try {
      const results = await testRunner.runTestSuite('Navigation');
      console.log('✅ Initial navigation tests completed:', results.length, 'tests run');
    } catch (error) {
      console.error('❌ Initial test run failed:', error);
      errorMonitoring.captureError({
        title: 'Initial Test Suite Failure',
        description: error instanceof Error ? error.message : 'Unknown test failure',
        component: 'TestingSuite',
        category: 'ui',
        severity: 'medium'
      });
    }
  }, 2000);
};
