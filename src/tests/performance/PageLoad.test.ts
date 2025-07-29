import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';
import { expect, test, describe } from 'vitest';

const launchChromeAndRunLighthouse = async (url: string, opts = {}, config = null) => {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  const options = { ...opts, port: chrome.port };
  const runnerResult = await lighthouse(url, options, config);
  await chrome.kill();
  return runnerResult.lhr;
};

describe('Page Load Performance', () => {
  test('Home page meets performance criteria', async () => {
    const result = await launchChromeAndRunLighthouse('http://localhost:8081');
    
    // Performance score should be at least 90
    expect(result.categories.performance.score).toBeGreaterThanOrEqual(0.9);
    
    // First Contentful Paint should be under 2s
    expect(result.audits['first-contentful-paint'].numericValue).toBeLessThan(2000);
    
    // Time to Interactive should be under 5s
    expect(result.audits['interactive'].numericValue).toBeLessThan(5000);
    
    // Cumulative Layout Shift should be under 0.1
    expect(result.audits['cumulative-layout-shift'].numericValue).toBeLessThan(0.1);
  });

  test('Search page meets performance criteria', async () => {
    const result = await launchChromeAndRunLighthouse('http://localhost:8081/search');
    
    expect(result.categories.performance.score).toBeGreaterThanOrEqual(0.9);
    expect(result.audits['first-contentful-paint'].numericValue).toBeLessThan(2000);
    expect(result.audits['interactive'].numericValue).toBeLessThan(5000);
    expect(result.audits['cumulative-layout-shift'].numericValue).toBeLessThan(0.1);
  });

  test('User dashboard meets performance criteria', async () => {
    const result = await launchChromeAndRunLighthouse('http://localhost:8081/dashboard');
    
    expect(result.categories.performance.score).toBeGreaterThanOrEqual(0.9);
    expect(result.audits['first-contentful-paint'].numericValue).toBeLessThan(2000);
    expect(result.audits['interactive'].numericValue).toBeLessThan(5000);
    expect(result.audits['cumulative-layout-shift'].numericValue).toBeLessThan(0.1);
  });
}); 