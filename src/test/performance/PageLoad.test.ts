import { test, expect } from '@playwright/test';

test.describe('Page Load Performance', () => {
  test('should meet performance metrics thresholds', async ({ page }) => {
    // Enable performance metrics
    const client = await page.context().newCDPSession(page);
    await client.send('Performance.enable');

    // Navigate to the page
    const navigationStart = Date.now();
    await page.goto('/');
    const navigationEnd = Date.now();

    // Get performance metrics
    const metrics = await client.send('Performance.getMetrics');
    const performanceMetrics = new Map(
      metrics.metrics.map((metric: { name: string; value: number }) => [
        metric.name,
        metric.value,
      ])
    );

    // Extract key metrics
    const firstContentfulPaint = performanceMetrics.get('FirstContentfulPaint');
    const timeToInteractive = performanceMetrics.get('InteractiveTime');
    const totalBlockingTime = performanceMetrics.get('TotalBlockingTime');
    const navigationTime = navigationEnd - navigationStart;

    // Assert performance thresholds
    expect(firstContentfulPaint).toBeLessThan(2000); // FCP < 2s
    expect(timeToInteractive).toBeLessThan(5000); // TTI < 5s
    expect(totalBlockingTime).toBeLessThan(300); // TBT < 300ms
    expect(navigationTime).toBeLessThan(3000); // Navigation < 3s

    // Test for layout shifts
    const layoutShiftScore = await page.evaluate(() => {
      return new Promise((resolve) => {
        let cumulativeLayoutShift = 0;
        new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              cumulativeLayoutShift += entry.value;
            }
          }
          resolve(cumulativeLayoutShift);
        }).observe({ entryTypes: ['layout-shift'] });

        // Resolve after 5 seconds if no layout shifts
        setTimeout(() => resolve(cumulativeLayoutShift), 5000);
      });
    });

    expect(layoutShiftScore).toBeLessThan(0.1); // CLS < 0.1

    // Test for memory leaks
    const memoryInfo = await page.evaluate(() => (performance as any).memory);
    expect(memoryInfo.usedJSHeapSize).toBeLessThan(100 * 1024 * 1024); // < 100MB

    // Test for resource loading
    const resources = await page.evaluate(() => 
      performance.getEntriesByType('resource').map(entry => ({
        name: entry.name,
        duration: entry.duration,
        size: (entry as PerformanceResourceTiming).transferSize
      }))
    );

    // Check resource load times
    for (const resource of resources) {
      expect(resource.duration).toBeLessThan(5000); // Each resource < 5s
      if (resource.name.includes('.js')) {
        expect(resource.size).toBeLessThan(500 * 1024); // JS files < 500KB
      }
      if (resource.name.includes('.css')) {
        expect(resource.size).toBeLessThan(100 * 1024); // CSS files < 100KB
      }
    }
  });

  test('should maintain performance under load', async ({ page }) => {
    // Simulate network throttling
    await page.route('**/*', async (route) => {
      await new Promise(resolve => setTimeout(resolve, 100)); // Add 100ms delay
      await route.continue();
    });

    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;

    // Even with network throttling, page should load within 5s
    expect(loadTime).toBeLessThan(5000);

    // Test rapid interactions
    for (let i = 0; i < 10; i++) {
      const interactionStart = Date.now();
      await page.click('button'); // Replace with actual interactive element
      const interactionTime = Date.now() - interactionStart;
      expect(interactionTime).toBeLessThan(100); // Each interaction < 100ms
    }
  });

  test('should handle concurrent users', async ({ browser }) => {
    const numConcurrentUsers = 5;
    const pages = await Promise.all(
      Array(numConcurrentUsers).fill(0).map(() => browser.newPage())
    );

    const loadTimes = await Promise.all(
      pages.map(async (page) => {
        const start = Date.now();
        await page.goto('/');
        return Date.now() - start;
      })
    );

    // Check that all concurrent loads were reasonably fast
    for (const loadTime of loadTimes) {
      expect(loadTime).toBeLessThan(5000);
    }

    await Promise.all(pages.map(page => page.close()));
  });
}); 