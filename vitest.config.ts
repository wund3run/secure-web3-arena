import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/test-setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/test/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/types/*'
      ]
    },
    include: ['src/tests/**/*.{test,spec}.{ts,tsx}'],
    exclude: [
      'e2e/**/*', // Exclude Playwright E2E tests at project root
      'src/tests/e2e/**/*', // Exclude if any e2e tests are in src/tests/e2e
      'src/tests/performance/**/*', // Exclude old performance dir if any files remain
    ],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
