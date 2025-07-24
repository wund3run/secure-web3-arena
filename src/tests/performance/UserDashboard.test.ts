import { test, expect } from '@playwright/test';

test.describe('User Dashboard Performance', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to dashboard
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL('/dashboard');
  });

  test('dashboard loads quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.waitForSelector('[data-testid="dashboard-content"]');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(2000); // Dashboard should load within 2 seconds
  });

  test('data visualizations render efficiently', async ({ page }) => {
    // Wait for initial dashboard load
    await page.waitForSelector('[data-testid="dashboard-content"]');

    // Measure chart rendering time
    const startTime = Date.now();
    await page.waitForSelector('[data-testid="performance-chart"]');
    const chartLoadTime = Date.now() - startTime;
    expect(chartLoadTime).toBeLessThan(1000); // Charts should render within 1 second

    // Check for smooth animations
    const chart = await page.$('[data-testid="performance-chart"]');
    const animation = await chart?.evaluate(el => 
      window.getComputedStyle(el).getPropertyValue('transition')
    );
    expect(animation).toContain('transform');
  });

  test('transaction history loads with pagination', async ({ page }) => {
    await page.waitForSelector('[data-testid="transaction-history"]');

    // Measure initial load time
    const startTime = Date.now();
    const transactions = await page.$$('[data-testid="transaction-item"]');
    const loadTime = Date.now() - startTime;

    // Should load quickly and have reasonable page size
    expect(loadTime).toBeLessThan(500);
    expect(transactions.length).toBeLessThanOrEqual(20);

    // Load more items
    const initialCount = transactions.length;
    await page.click('[data-testid="load-more"]');
    
    // Measure load more time
    const loadMoreStart = Date.now();
    await page.waitForSelector(`[data-testid="transaction-item"]:nth-child(${initialCount + 1})`);
    const loadMoreTime = Date.now() - loadMoreStart;
    expect(loadMoreTime).toBeLessThan(500);
  });

  test('notification center updates in real-time', async ({ page }) => {
    await page.waitForSelector('[data-testid="notification-center"]');

    // Trigger a new notification (mock WebSocket message)
    await page.evaluate(() => {
      const event = new MessageEvent('message', {
        data: JSON.stringify({
          type: 'notification',
          data: { message: 'Test notification' }
        })
      });
      window.dispatchEvent(event);
    });

    // Measure update time
    const startTime = Date.now();
    await page.waitForSelector('[data-testid="notification-item"]:first-child');
    const updateTime = Date.now() - startTime;
    expect(updateTime).toBeLessThan(100); // Real-time updates should be near-instant
  });

  test('account settings form responds quickly', async ({ page }) => {
    await page.click('[data-testid="settings-tab"]');
    await page.waitForSelector('[data-testid="settings-form"]');

    // Measure input response time
    const startTime = Date.now();
    await page.fill('[data-testid="display-name"]', 'New Name');
    const inputTime = Date.now() - startTime;
    expect(inputTime).toBeLessThan(50); // Input should be responsive

    // Measure save time
    const saveStart = Date.now();
    await page.click('[data-testid="save-settings"]');
    await page.waitForSelector('[data-testid="save-success"]');
    const saveTime = Date.now() - saveStart;
    expect(saveTime).toBeLessThan(1000); // Save should complete within 1 second
  });

  test('dashboard is responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Measure initial mobile load
    const startTime = Date.now();
    await page.waitForSelector('[data-testid="dashboard-content"]');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(2000);

    // Check that charts are properly sized
    const chart = await page.$('[data-testid="performance-chart"]');
    const chartBounds = await chart?.boundingBox();
    expect(chartBounds?.width).toBeLessThanOrEqual(375);

    // Verify mobile menu functionality
    await page.click('[data-testid="mobile-menu-button"]');
    const menuOpenTime = Date.now();
    await page.waitForSelector('[data-testid="mobile-menu"].visible');
    const menuTime = Date.now() - menuOpenTime;
    expect(menuTime).toBeLessThan(100);
  });
}); 