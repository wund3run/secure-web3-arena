import { test, expect } from '@playwright/test';

test.describe('Form Performance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/forms');
  });

  test('form components load efficiently', async ({ page }) => {
    const startTime = Date.now();
    
    // Wait for all form elements
    await Promise.all([
      page.waitForSelector('input[type="text"]'),
      page.waitForSelector('select'),
      page.waitForSelector('textarea'),
      page.waitForSelector('button[type="submit"]')
    ]);
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(1000); // Forms should load within 1 second
  });

  test('input validation is responsive', async ({ page }) => {
    const emailInput = await page.getByLabel('Email');
    
    // Measure validation time
    const startTime = Date.now();
    await emailInput.type('invalid-email');
    await emailInput.blur();
    await page.waitForSelector('.error-message');
    const validationTime = Date.now() - startTime;
    expect(validationTime).toBeLessThan(100); // Validation should be near-instant

    // Test valid input
    await emailInput.fill('valid@example.com');
    await emailInput.blur();
    const successIndicator = await page.waitForSelector('.success-indicator');
    expect(successIndicator).toBeTruthy();
  });

  test('form submission is non-blocking', async ({ page }) => {
    // Fill form fields
    await page.fill('[data-testid="name-input"]', 'Test User');
    await page.fill('[data-testid="email-input"]', 'test@example.com');
    await page.fill('[data-testid="message-input"]', 'Test message');

    // Start performance measurement
    await page.evaluate(() => {
      window.performance.mark('submit-start');
    });

    // Submit form
    await page.click('button[type="submit"]');
    
    // Verify UI remains responsive during submission
    const inputEnabled = await page.isEnabled('[data-testid="name-input"]');
    expect(inputEnabled).toBe(true);

    // Wait for submission to complete
    await page.waitForSelector('.success-message');
    
    // Measure total time
    const metrics = await page.evaluate(() => {
      window.performance.mark('submit-end');
      const measure = window.performance.measure('submit-time', 'submit-start', 'submit-end');
      return measure.duration;
    });
    
    expect(metrics).toBeLessThan(2000); // Submission should complete within 2 seconds
  });

  test('form controls are responsive', async ({ page }) => {
    // Test select dropdown
    const selectStart = Date.now();
    await page.click('select');
    await page.waitForSelector('option');
    const selectTime = Date.now() - selectStart;
    expect(selectTime).toBeLessThan(100);

    // Test checkbox
    const checkboxStart = Date.now();
    await page.click('[type="checkbox"]');
    const checkbox = await page.isChecked('[type="checkbox"]');
    const checkboxTime = Date.now() - checkboxStart;
    expect(checkboxTime).toBeLessThan(50);
    expect(checkbox).toBe(true);

    // Test radio buttons
    const radioStart = Date.now();
    await page.click('[type="radio"]');
    const radio = await page.isChecked('[type="radio"]');
    const radioTime = Date.now() - radioStart;
    expect(radioTime).toBeLessThan(50);
    expect(radio).toBe(true);
  });

  test('form reset is immediate', async ({ page }) => {
    // Fill form
    await page.fill('[data-testid="name-input"]', 'Test User');
    await page.fill('[data-testid="email-input"]', 'test@example.com');

    // Measure reset time
    const startTime = Date.now();
    await page.click('[type="reset"]');
    
    // Check that fields are cleared
    const nameValue = await page.inputValue('[data-testid="name-input"]');
    const emailValue = await page.inputValue('[data-testid="email-input"]');
    
    const resetTime = Date.now() - startTime;
    expect(resetTime).toBeLessThan(50);
    expect(nameValue).toBe('');
    expect(emailValue).toBe('');
  });

  test('form validation handles rapid input', async ({ page }) => {
    const emailInput = await page.getByLabel('Email');
    
    // Type rapidly
    const startTime = Date.now();
    for (const char of 'test@example.com') {
      await emailInput.type(char, { delay: 10 });
    }
    
    // Wait for final validation
    await page.waitForSelector('.success-indicator');
    const validationTime = Date.now() - startTime;
    
    // Should use debouncing to prevent excessive validation
    expect(validationTime).toBeGreaterThan(100);
    expect(validationTime).toBeLessThan(500);
  });

  test('form handles large datasets efficiently', async ({ page }) => {
    // Test large select dropdown
    const select = await page.getByRole('combobox');
    
    // Measure time to open dropdown with many options
    const startTime = Date.now();
    await select.click();
    await page.waitForSelector('option');
    const loadTime = Date.now() - startTime;
    
    // Count options
    const optionCount = await page.$$eval('option', options => options.length);
    
    expect(loadTime).toBeLessThan(200);
    expect(optionCount).toBeGreaterThan(100);
  });
}); 