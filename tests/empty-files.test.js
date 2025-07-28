// Test file for empty files detection
import { expect, test, beforeAll, afterAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import EmptyFileDetector from '../scripts/find-empty-files.js';

const testDir = '/tmp/empty-files-test';

beforeAll(async () => {
  // Create test directory structure
  await fs.promises.mkdir(testDir, { recursive: true });
  await fs.promises.mkdir(path.join(testDir, 'src'), { recursive: true });
  await fs.promises.mkdir(path.join(testDir, 'docs'), { recursive: true });
  
  // Create some empty files
  await fs.promises.writeFile(path.join(testDir, 'empty.md'), '');
  await fs.promises.writeFile(path.join(testDir, 'empty.ts'), '');
  await fs.promises.writeFile(path.join(testDir, 'src', 'empty-component.tsx'), '');
  
  // Create some non-empty files
  await fs.promises.writeFile(path.join(testDir, 'content.md'), '# Test\nContent here');
  await fs.promises.writeFile(path.join(testDir, 'src', 'component.tsx'), 'export const Test = () => <div>Test</div>;');
});

afterAll(async () => {
  // Clean up test directory
  await fs.promises.rm(testDir, { recursive: true, force: true });
});

test('EmptyFileDetector identifies empty files correctly', async () => {
  const detector = new EmptyFileDetector(testDir);
  const report = await detector.scan();
  
  expect(report.summary.emptyFiles).toBe(3);
  expect(report.emptyFiles).toHaveLength(3);
  
  const emptyFilePaths = report.emptyFiles.map(f => f.path);
  expect(emptyFilePaths).toContain('empty.md');
  expect(emptyFilePaths).toContain('empty.ts');
  expect(emptyFilePaths).toContain('src/empty-component.tsx');
});

test('EmptyFileDetector categorizes files correctly', async () => {
  const detector = new EmptyFileDetector(testDir);
  const report = await detector.scan();
  
  expect(report.categorized['Documentation']).toBeDefined();
  expect(report.categorized['JavaScript/TypeScript']).toBeDefined();
  
  expect(report.categorized['Documentation']).toHaveLength(1);
  expect(report.categorized['JavaScript/TypeScript']).toHaveLength(2);
});

test('EmptyFileDetector excludes non-empty files', async () => {
  const detector = new EmptyFileDetector(testDir);
  const report = await detector.scan();
  
  const allFiles = report.emptyFiles.map(f => f.path);
  expect(allFiles).not.toContain('content.md');
  expect(allFiles).not.toContain('src/component.tsx');
});

test('EmptyFileDetector generates recommendations', async () => {
  const detector = new EmptyFileDetector(testDir);
  const report = await detector.scan();
  
  expect(report.recommendations).toBeDefined();
  expect(Array.isArray(report.recommendations)).toBe(true);
});