import { test, expect } from '@playwright/test';

test.describe('Marketplace', () => {
  test('should load marketplace', async ({ page }) => {
    await page.goto('/marketplace');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display services', async ({ page }) => {
    await page.goto('/marketplace');
    // Add more specific test cases as needed
  });
});
