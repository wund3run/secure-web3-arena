
import { SecurityEnhancements } from '../security/SecurityEnhancements';
import { PerformanceOptimizer } from '../performance/PerformanceOptimizer';
import { SecurityInitializer } from '../security/SecurityInitializer';
import { SystemInitializer as BaseSystemInitializer } from '../system/systemInitializer';

export class EnhancedSystemInitializer {
  private static initialized = false;

  static async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      console.log('🚀 Initializing Enhanced Hawkly Platform...');

      // Initialize base system
      await BaseSystemInitializer.initialize();

      // Initialize security enhancements
      const securityEnhancements = SecurityEnhancements.getInstance();
      securityEnhancements.initialize();

      // Initialize performance optimizations
      const performanceOptimizer = PerformanceOptimizer.getInstance();
      performanceOptimizer.initialize();

      // Initialize security systems
      await SecurityInitializer.initialize();

      this.initialized = true;
      console.log('✅ Enhanced system initialization completed');

    } catch (error) {
      console.error('❌ Enhanced system initialization failed:', error);
      throw error;
    }
  }

  static cleanup(): void {
    SecurityEnhancements.getInstance().cleanup();
    PerformanceOptimizer.getInstance().cleanup();
    BaseSystemInitializer.cleanup();
    this.initialized = false;
  }

  static isInitialized(): boolean {
    return this.initialized;
  }
}

// Auto-initialize when the module loads
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      EnhancedSystemInitializer.initialize().catch(console.error);
    });
  } else {
    EnhancedSystemInitializer.initialize().catch(console.error);
  }
}
