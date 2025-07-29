import { test, expect } from '@playwright/test';

test.describe('Navigation Performance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('navigation menu loads quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.waitForSelector('nav');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(1000); // Navigation should load within 1 second
  });

  test('dropdown menus open smoothly', async ({ page }) => {
    const dropdown = await page.getByRole('button', { name: 'Security' });
    
    // Measure time to open dropdown
    const startTime = Date.now();
    await dropdown.hover();
    await page.waitForSelector('.dropdown-content');
    const openTime = Date.now() - startTime;
    expect(openTime).toBeLessThan(100); // Dropdown should open within 100ms
    
    // Check for smooth animation
    const dropdownContent = await page.$('.dropdown-content');
    const animation = await dropdownContent?.evaluate(el => 
      window.getComputedStyle(el).getPropertyValue('transition')
    );
    expect(animation).toContain('transform');
  });

  test('mobile menu toggle is responsive', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    const menuButton = await page.getByRole('button', { name: 'Toggle menu' });
    
    // Measure time to open menu
    const startTime = Date.now();
    await menuButton.click();
    await page.waitForSelector('.mobile-menu-open');
    const openTime = Date.now() - startTime;
    expect(openTime).toBeLessThan(150); // Menu should open within 150ms
    
    // Check for smooth animation
    const menu = await page.$('.mobile-menu');
    const animation = await menu?.evaluate(el => 
      window.getComputedStyle(el).getPropertyValue('transition')
    );
    expect(animation).toContain('transform');
  });

  test('navigation is accessible', async ({ page }) => {
    // Test keyboard navigation
    await page.keyboard.press('Tab');
    const firstLink = await page.evaluate(() => 
      document.activeElement?.tagName === 'A'
    );
    expect(firstLink).toBe(true);
    
    // Test ARIA attributes
    const nav = await page.$('nav');
    const ariaLabel = await nav?.getAttribute('aria-label');
    expect(ariaLabel).toBeTruthy();
    
    // Test focus indicators
    const focusStyles = await page.evaluate(() => {
      const link = document.querySelector('nav a') as HTMLAnchorElement;
      if (!link) return null;
      link.focus();
      const styles = window.getComputedStyle(link);
      return {
        outline: styles.outline,
        boxShadow: styles.boxShadow
      };
    });
    expect(focusStyles?.outline || focusStyles?.boxShadow).toBeTruthy();
  });
}); 