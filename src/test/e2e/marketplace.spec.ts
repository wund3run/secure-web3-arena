
import { test, expect } from '@playwright/test';

test.describe('Marketplace', () => {
  test('should display services grid', async ({ page }) => {
    await page.goto('/marketplace');
    
    await expect(page.locator('[data-testid="services-grid"]')).toBeVisible();
  });

  test('should filter services by category', async ({ page }) => {
    await page.goto('/marketplace');
    
    // Click on a category filter
    await page.click('text=Smart Contract');
    
    // Verify URL includes filter parameter
    await expect(page).toHaveURL(/category=smart-contract/);
  });

  test('should search for services', async ({ page }) => {
    await page.goto('/marketplace');
    
    await page.fill('[placeholder="Search services..."]', 'audit');
    await page.press('[placeholder="Search services..."]', 'Enter');
    
    await expect(page).toHaveURL(/search=audit/);
  });
});
