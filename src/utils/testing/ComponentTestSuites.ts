
import { testRunner, TestCase, TestSuite } from './AutomatedTestRunner';
import { errorMonitoring } from './ErrorMonitoringService';

export const initializeTestSuites = () => {
  console.log('🧪 Initializing component test suites...');

  // Navigation Tests
  const navigationTests: TestCase[] = [
    {
      id: 'nav-home-link',
      name: 'Home Navigation Link',
      component: 'Navigation',
      testFunction: async () => {
        const homeLink = document.querySelector('a[href="/"]');
        if (!homeLink) throw new Error('Home link not found in navigation');
      }
    },
    {
      id: 'nav-marketplace-link',
      name: 'Marketplace Navigation Link',
      component: 'Navigation',
      testFunction: async () => {
        const marketplaceLink = document.querySelector('a[href="/marketplace"]');
        if (!marketplaceLink) throw new Error('Marketplace link not found in navigation');
      }
    }
  ];

  // Logo Component Tests
  const logoTests: TestCase[] = [
    {
      id: 'logo-render',
      name: 'Hawkly Logo Renders',
      component: 'HawklyLogo',
      testFunction: async () => {
        const logoText = document.querySelector('[class*="text-transparent"]');
        if (!logoText || !logoText.textContent?.includes('Hawkly')) {
          throw new Error('Hawkly logo text not found or incorrect');
        }
      }
    },
    {
      id: 'logo-svg-icon',
      name: 'Logo SVG Icon Present',
      component: 'HawklyLogo',
      testFunction: async () => {
        const logoSvg = document.querySelector('svg[viewBox="0 0 24 24"]');
        if (!logoSvg) throw new Error('Logo SVG icon not found');
      }
    }
  ];

  // Error Boundary Tests
  const errorBoundaryTests: TestCase[] = [
    {
      id: 'error-boundary-active',
      name: 'Error Boundary Component Active',
      component: 'EnhancedErrorBoundary',
      testFunction: async () => {
        // Check if error boundary is properly wrapping the app
        const appContainer = document.querySelector('.min-h-screen');
        if (!appContainer) throw new Error('App container not found - error boundary may not be active');
      }
    }
  ];

  // Analytics Tests
  const analyticsTests: TestCase[] = [
    {
      id: 'analytics-initialization',
      name: 'Analytics System Initialized',
      component: 'AnalyticsTracker',
      testFunction: async () => {
        const stored = localStorage.getItem('hawkly_analytics_events');
        if (!stored) throw new Error('Analytics system not initialized - no events stored');
      }
    }
  ];

  // Form Validation Tests
  const formTests: TestCase[] = [
    {
      id: 'form-inputs-present',
      name: 'Form Input Elements Accessible',
      component: 'Forms',
      testFunction: async () => {
        const inputs = document.querySelectorAll('input, textarea, select');
        if (inputs.length === 0) throw new Error('No form inputs found on page');
      }
    }
  ];

  // Performance Tests
  const performanceTests: TestCase[] = [
    {
      id: 'page-load-performance',
      name: 'Page Load Performance',
      component: 'Performance',
      testFunction: async () => {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        if (navigation) {
          const loadTime = navigation.loadEventEnd - navigation.fetchStart;
          if (loadTime > 5000) {
            throw new Error(`Page load time too slow: ${loadTime}ms`);
          }
        }
      }
    }
  ];

  // Create test suites with proper structure
  const navigationSuite: TestSuite = {
    name: 'Navigation',
    description: 'Tests for navigation components',
    tests: navigationTests
  };

  const logoSuite: TestSuite = {
    name: 'Logo',
    description: 'Tests for logo component',
    tests: logoTests
  };

  const errorBoundarySuite: TestSuite = {
    name: 'ErrorBoundary',
    description: 'Tests for error boundary functionality',
    tests: errorBoundaryTests
  };

  const analyticsSuite: TestSuite = {
    name: 'Analytics',
    description: 'Tests for analytics tracking',
    tests: analyticsTests
  };

  const formsSuite: TestSuite = {
    name: 'Forms',
    description: 'Tests for form functionality',
    tests: formTests
  };

  const performanceSuite: TestSuite = {
    name: 'Performance',
    description: 'Tests for performance metrics',
    tests: performanceTests
  };

  // Register all test suites
  testRunner.addTestSuite(navigationSuite);
  testRunner.addTestSuite(logoSuite);
  testRunner.addTestSuite(errorBoundarySuite);
  testRunner.addTestSuite(analyticsSuite);
  testRunner.addTestSuite(formsSuite);
  testRunner.addTestSuite(performanceSuite);

  const allSuites = testRunner.getTestSuites();
  const totalTests = allSuites.reduce((acc, suite) => acc + suite.tests.length, 0);
  console.log('✅ Test suites initialized with', totalTests, 'tests');

  // Run initial health check
  setTimeout(async () => {
    console.log('🏃 Running initial test suite...');
    try {
      const results = await testRunner.runTestSuite(navigationSuite);
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
