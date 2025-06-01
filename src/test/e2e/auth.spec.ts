
import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('should show sign in form', async ({ page }) => {
    await page.goto('/auth');
    
    await expect(page.locator('form')).toBeVisible();
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/auth');
    
    await page.fill('input[type="email"]', 'invalid-email');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Invalid email')).toBeVisible();
  });

  test('should toggle between sign in and sign up', async ({ page }) => {
    await page.goto('/auth');
    
    await page.click('text=Sign up');
    await expect(page.locator('text=Create Account')).toBeVisible();
    
    await page.click('text=Sign in');
    await expect(page.locator('text=Welcome Back')).toBeVisible();
  });
});
