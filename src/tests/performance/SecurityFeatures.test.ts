import { test, expect } from '@playwright/test';

test.describe('Security Features Performance', () => {
  test.beforeEach(async ({ page }) => {
    // Login and navigate to security section
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    await page.click('[data-testid="security-tab"]');
  });

  test('authentication flow is responsive', async ({ page }) => {
    await page.goto('/login');

    // Measure login form submission time
    const startTime = Date.now();
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    await page.waitForURL('/dashboard');
    const loginTime = Date.now() - startTime;
    expect(loginTime).toBeLessThan(2000); // Login should complete within 2 seconds

    // Check that loading states are shown
    await page.goto('/login');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="password-input"]', 'password123');
    await page.click('[data-testid="login-button"]');
    const loadingState = await page.isVisible('[data-testid="loading-spinner"]');
    expect(loadingState).toBe(true);
  });

  test('wallet connection is efficient', async ({ page }) => {
    await page.waitForSelector('[data-testid="connect-wallet"]');

    // Measure wallet connection time
    const startTime = Date.now();
    await page.click('[data-testid="connect-wallet"]');
    await page.waitForSelector('[data-testid="wallet-connected"]');
    const connectionTime = Date.now() - startTime;
    expect(connectionTime).toBeLessThan(3000); // Wallet connection should complete within 3 seconds

    // Check for proper loading feedback
    const loadingIndicator = await page.isVisible('[data-testid="wallet-connecting"]');
    expect(loadingIndicator).toBe(true);
  });

  test('transaction signing is non-blocking', async ({ page }) => {
    // Connect wallet first
    await page.click('[data-testid="connect-wallet"]');
    await page.waitForSelector('[data-testid="wallet-connected"]');

    // Start performance measurement
    await page.evaluate(() => {
      window.performance.mark('sign-start');
    });

    // Initiate transaction signing
    await page.click('[data-testid="sign-transaction"]');
    
    // Verify UI remains responsive during signing
    const buttonEnabled = await page.isEnabled('[data-testid="other-action"]');
    expect(buttonEnabled).toBe(true);

    // Complete signing
    await page.waitForSelector('[data-testid="transaction-signed"]');
    
    // Measure total time
    const metrics = await page.evaluate(() => {
      window.performance.mark('sign-end');
      const measure = window.performance.measure('sign-time', 'sign-start', 'sign-end');
      return measure.duration;
    });
    
    expect(metrics).toBeLessThan(5000); // Signing should complete within 5 seconds
  });

  test('authorization checks are cached', async ({ page }) => {
    // Perform initial authorization check
    const startTime = Date.now();
    await page.click('[data-testid="protected-resource"]');
    await page.waitForSelector('[data-testid="resource-content"]');
    const initialCheckTime = Date.now() - startTime;

    // Perform second check (should be faster due to caching)
    const cacheStartTime = Date.now();
    await page.click('[data-testid="another-protected-resource"]');
    await page.waitForSelector('[data-testid="resource-content"]');
    const cachedCheckTime = Date.now() - cacheStartTime;

    expect(cachedCheckTime).toBeLessThan(initialCheckTime);
    expect(cachedCheckTime).toBeLessThan(100); // Cached checks should be near-instant
  });

  test('security settings updates are responsive', async ({ page }) => {
    await page.waitForSelector('[data-testid="security-settings"]');

    // Toggle 2FA
    const startTime = Date.now();
    await page.click('[data-testid="enable-2fa"]');
    await page.waitForSelector('[data-testid="2fa-qr-code"]');
    const toggleTime = Date.now() - startTime;
    expect(toggleTime).toBeLessThan(1000);

    // Enter 2FA code
    const verifyStartTime = Date.now();
    await page.fill('[data-testid="2fa-code"]', '123456');
    await page.click('[data-testid="verify-2fa"]');
    await page.waitForSelector('[data-testid="2fa-enabled"]');
    const verifyTime = Date.now() - verifyStartTime;
    expect(verifyTime).toBeLessThan(2000);
  });

  test('audit log loads efficiently', async ({ page }) => {
    await page.click('[data-testid="audit-log"]');

    // Measure initial load time
    const startTime = Date.now();
    await page.waitForSelector('[data-testid="audit-entry"]');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(2000);

    // Check pagination performance
    const initialCount = await page.$$eval('[data-testid="audit-entry"]', entries => entries.length);
    await page.click('[data-testid="load-more-logs"]');
    
    const loadMoreStart = Date.now();
    await page.waitForSelector(`[data-testid="audit-entry"]:nth-child(${initialCount + 1})`);
    const loadMoreTime = Date.now() - loadMoreStart;
    expect(loadMoreTime).toBeLessThan(1000);
  });
}); 