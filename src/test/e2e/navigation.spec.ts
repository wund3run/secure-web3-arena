
import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to marketplace', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=Marketplace');
    
    await expect(page).toHaveURL('/marketplace');
    await expect(page.locator('h1')).toContainText('Marketplace');
  });

  test('should display logo and navigation links', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('text=Hawkly')).toBeVisible();
    await expect(page.locator('a[href="/marketplace"]')).toBeVisible();
    await expect(page.locator('a[href="/how-it-works"]')).toBeVisible();
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Mobile menu should be accessible
    await expect(page.locator('button[aria-label="Menu"]')).toBeVisible();
  });
});
