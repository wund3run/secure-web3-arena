import { test, expect } from '@playwright/test';

test.describe('Search Performance', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('search input responds quickly', async ({ page }) => {
    const searchInput = await page.getByRole('searchbox');
    
    // Measure input response time
    const startTime = Date.now();
    await searchInput.type('test query');
    const typeTime = Date.now() - startTime;
    expect(typeTime).toBeLessThan(100); // Input should be responsive within 100ms
  });

  test('search suggestions appear promptly', async ({ page }) => {
    const searchInput = await page.getByRole('searchbox');
    
    // Type search query
    await searchInput.type('test');
    
    // Measure time for suggestions to appear
    const startTime = Date.now();
    await page.waitForSelector('.search-suggestions');
    const suggestionTime = Date.now() - startTime;
    expect(suggestionTime).toBeLessThan(200); // Suggestions should appear within 200ms
    
    // Check that suggestions are properly debounced
    const requestCount = await page.evaluate(() => {
      return (window as any).__TEST_SEARCH_REQUEST_COUNT__ || 0;
    });
    expect(requestCount).toBeLessThan(3); // Should have debounced multiple keystrokes
  });

  test('search results load efficiently', async ({ page }) => {
    const searchInput = await page.getByRole('searchbox');
    
    // Submit search
    await searchInput.type('test');
    await searchInput.press('Enter');
    
    // Measure time to load results
    const startTime = Date.now();
    await page.waitForSelector('.search-results');
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(1000); // Results should load within 1 second
    
    // Check that results are paginated
    const resultCount = await page.evaluate(() => {
      return document.querySelectorAll('.search-result').length;
    });
    expect(resultCount).toBeLessThanOrEqual(20); // Should show reasonable number of results per page
  });

  test('search filters apply quickly', async ({ page }) => {
    // Navigate to search results
    await page.goto('/search?q=test');
    
    // Wait for initial results
    await page.waitForSelector('.search-results');
    
    // Measure filter application time
    const startTime = Date.now();
    await page.click('[data-testid="filter-button"]');
    await page.click('[data-testid="date-filter"]');
    await page.waitForSelector('.search-results.filtered');
    const filterTime = Date.now() - startTime;
    expect(filterTime).toBeLessThan(300); // Filters should apply within 300ms
  });

  test('search is keyboard accessible', async ({ page }) => {
    const searchInput = await page.getByRole('searchbox');
    
    // Focus search with keyboard
    await page.keyboard.press('Tab');
    const focused = await page.evaluate(() => 
      document.activeElement?.getAttribute('role') === 'searchbox'
    );
    expect(focused).toBe(true);
    
    // Type and navigate suggestions with keyboard
    await searchInput.type('test');
    await page.keyboard.press('ArrowDown');
    const suggestionFocused = await page.evaluate(() => 
      document.activeElement?.classList.contains('search-suggestion')
    );
    expect(suggestionFocused).toBe(true);
  });
}); 