import { test, expect } from '@playwright/test';

test.describe('Layout Performance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('layout components load quickly', async ({ page }) => {
    const startTime = Date.now();
    
    // Wait for key layout components
    await Promise.all([
      page.waitForSelector('header'),
      page.waitForSelector('nav'),
      page.waitForSelector('main'),
      page.waitForSelector('footer')
    ]);
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(1000); // Layout should load within 1 second
  });

  test('layout is responsive across breakpoints', async ({ page }) => {
    // Test mobile layout
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForSelector('[data-testid="mobile-menu-button"]');
    
    // Measure mobile menu interaction time
    const mobileStartTime = Date.now();
    await page.click('[data-testid="mobile-menu-button"]');
    await page.waitForSelector('[data-testid="mobile-menu"].visible');
    const mobileMenuTime = Date.now() - mobileStartTime;
    expect(mobileMenuTime).toBeLessThan(100);

    // Test tablet layout
    await page.setViewportSize({ width: 768, height: 1024 });
    const tabletNav = await page.isVisible('[data-testid="tablet-nav"]');
    expect(tabletNav).toBe(true);

    // Test desktop layout
    await page.setViewportSize({ width: 1280, height: 800 });
    const desktopNav = await page.isVisible('[data-testid="desktop-nav"]');
    expect(desktopNav).toBe(true);
  });

  test('sidebar transitions smoothly', async ({ page }) => {
    // Set desktop viewport
    await page.setViewportSize({ width: 1280, height: 800 });
    
    // Toggle sidebar
    const startTime = Date.now();
    await page.click('[data-testid="toggle-sidebar"]');
    await page.waitForSelector('[data-testid="sidebar"].collapsed');
    const toggleTime = Date.now() - startTime;
    expect(toggleTime).toBeLessThan(100);

    // Check for smooth animation
    const sidebar = await page.$('[data-testid="sidebar"]');
    const animation = await sidebar?.evaluate(el => 
      window.getComputedStyle(el).getPropertyValue('transition')
    );
    expect(animation).toContain('transform');
  });

  test('header components are efficient', async ({ page }) => {
    // Test search component
    const searchInput = await page.getByRole('searchbox');
    const startTime = Date.now();
    await searchInput.type('test');
    await page.waitForSelector('.search-suggestions');
    const searchTime = Date.now() - startTime;
    expect(searchTime).toBeLessThan(200);

    // Test notification dropdown
    const notificationStart = Date.now();
    await page.click('[data-testid="notifications"]');
    await page.waitForSelector('[data-testid="notification-dropdown"]');
    const notificationTime = Date.now() - notificationStart;
    expect(notificationTime).toBeLessThan(100);
  });

  test('footer loads lazily', async ({ page }) => {
    // Scroll to bottom
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    
    // Measure footer load time
    const startTime = Date.now();
    await page.waitForSelector('footer');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(500);

    // Check that footer links are loaded
    const linkCount = await page.$$eval('footer a', links => links.length);
    expect(linkCount).toBeGreaterThan(0);
  });

  test('theme switching is performant', async ({ page }) => {
    // Find theme toggle
    const themeToggle = await page.getByRole('button', { name: /toggle theme/i });
    
    // Measure theme switch time
    const startTime = Date.now();
    await themeToggle.click();
    
    // Wait for theme change to complete
    await page.waitForFunction(() => {
      const html = document.documentElement;
      return html.classList.contains('dark') || html.dataset.theme === 'dark';
    });
    
    const switchTime = Date.now() - startTime;
    expect(switchTime).toBeLessThan(50); // Theme switch should be near-instant
  });

  test('layout handles dynamic content updates', async ({ page }) => {
    // Add content dynamically
    await page.evaluate(() => {
      const main = document.querySelector('main');
      if (main) {
        for (let i = 0; i < 100; i++) {
          const div = document.createElement('div');
          div.textContent = `Dynamic content ${i}`;
          main.appendChild(div);
        }
      }
    });

    // Measure layout recalculation time
    const startTime = Date.now();
    await page.waitForFunction(() => {
      const main = document.querySelector('main');
      return main?.children.length === 100;
    });
    const updateTime = Date.now() - startTime;
    expect(updateTime).toBeLessThan(100); // Layout updates should be fast
  });
}); 