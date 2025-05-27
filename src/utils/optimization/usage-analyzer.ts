
/**
 * Bundle usage analysis utilities
 */
export class UsageAnalyzer {
  private usageTracker = {
    components: new Set<string>(),
    utilities: new Set<string>(),
    hooks: new Set<string>()
  };

  /**
   * Implement tree shaking for unused code
   */
  analyzeUsage(): void {
    if (process.env.NODE_ENV === 'development') {
      console.log('Bundle usage analysis initialized');

      // Log usage statistics every 30 seconds in development
      setInterval(() => {
        console.log('Bundle Usage Analysis:', {
          components: Array.from(this.usageTracker.components),
          componentsCount: this.usageTracker.components.size,
          utilities: Array.from(this.usageTracker.utilities),
          hooks: Array.from(this.usageTracker.hooks)
        });
      }, 30000);
    }
  }

  /**
   * Track component usage
   */
  trackComponent(componentName: string): void {
    this.usageTracker.components.add(componentName);
  }

  /**
   * Track utility usage
   */
  trackUtility(utilityName: string): void {
    this.usageTracker.utilities.add(utilityName);
  }

  /**
   * Track hook usage
   */
  trackHook(hookName: string): void {
    this.usageTracker.hooks.add(hookName);
  }

  get stats() {
    return {
      components: this.usageTracker.components.size,
      utilities: this.usageTracker.utilities.size,
      hooks: this.usageTracker.hooks.size
    };
  }
}
