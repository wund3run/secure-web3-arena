
import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    
    await expect(page).toHaveTitle(/Hawkly/);
    await expect(page.locator('h1')).toContainText('Hawkly');
  });

  test('should navigate to marketplace', async ({ page }) => {
    await page.goto('/');
    
    await page.click('text=Marketplace');
    await expect(page).toHaveURL('/marketplace');
    await expect(page.locator('h1')).toContainText('Marketplace');
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.locator('[data-testid="hero-section"]')).toBeVisible();
  });
});
