
import { initializeTestingFramework } from './index';

// Initialize the testing framework when the module loads
export const startTesting = () => {
  try {
    const framework = initializeTestingFramework();
    console.log('✅ Testing framework initialized successfully');
    return framework;
  } catch (error) {
    console.error('❌ Failed to initialize testing framework:', error);
    return null;
  }
};

// Auto-initialize in development
if (process.env.NODE_ENV === 'development') {
  startTesting();
}
