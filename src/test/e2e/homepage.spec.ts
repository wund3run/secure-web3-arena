import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('should display navigation', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('a[href="/marketplace"]')).toBeVisible();
  });

  test('should have working links', async ({ page }) => {
    await page.goto('/');
    await page.click('a[href="/marketplace"]');
    await expect(page).toHaveURL(/marketplace/);
  });

  test('should display hero section', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.hero, header')).toBeVisible();
  });

  test('should display footer', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
  });
});
