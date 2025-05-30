
// Export all testing utilities
export { ErrorMonitoringService, errorMonitoring } from './ErrorMonitoringService';
export { AutomatedTestRunner, testRunner } from './AutomatedTestRunner';
export { initializeTestSuites } from './ComponentTestSuites';
export { TestingDashboard } from '../../components/testing/TestingDashboard';

export type { BugReport, TestResult } from './ErrorMonitoringService';
export type { TestCase, TestSuite } from './AutomatedTestRunner';

// Import the services we need
import { errorMonitoring } from './ErrorMonitoringService';
import { testRunner } from './AutomatedTestRunner';
import { initializeTestSuites } from './ComponentTestSuites';
import { TestingDashboard } from '../../components/testing/TestingDashboard';

// Utility function to initialize the complete testing framework
export const initializeTestingFramework = () => {
  // Start error monitoring
  errorMonitoring.startMonitoring();
  
  // Initialize test suites
  initializeTestSuites();
  
  console.log('Testing framework initialized');
  console.log('Access the testing dashboard at /testing-dashboard');
  
  return {
    errorMonitoring,
    testRunner,
    TestingDashboard
  };
};

// Quick setup function for development
export const setupDevelopmentTesting = () => {
  const framework = initializeTestingFramework();
  
  // Add to window for debugging
  if (typeof window !== 'undefined') {
    (window as any).testingFramework = framework;
  }
  
  return framework;
};
