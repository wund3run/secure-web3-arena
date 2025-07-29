import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
  ],
  define: {
    'import.meta.env.VITE_SUPABASE_URL': JSON.stringify('https://divymuaksqdgjsrlptct.supabase.co'),
    'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRpdnltdWFrc3FkZ2pzcmxwdGN0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMTM3MTksImV4cCI6MjA2MDg4OTcxOX0.sI8pfnK_7aCXAFCnoCVLFKCPgiX7OZedHUqFqmuIarU')
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
    host: "::",
    hmr: {
      overlay: false, // Disable error overlay for better UX
    }
  },
  build: {
    sourcemap: mode === 'development',
    target: 'esnext', // Use latest JS features for better performance
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          'ui-components': [
            '@radix-ui/react-progress',
            '@radix-ui/react-slider',
            '@radix-ui/react-tooltip'
          ],
          'form-components': [
            '@hookform/resolvers',
            'react-hook-form',
            'zod'
          ],
          'charts': ['recharts'],
          'auth': ['@supabase/supabase-js']
        }
      }
    },
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild', // Faster minification
    cssMinify: 'esbuild',
    assetsInlineLimit: 4096, // Inline small assets
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: [],
    force: false // Only force when needed
  },
  assetsInclude: ['**/*.svg'], // Ensure SVGs are properly handled
  css: {
    devSourcemap: mode === 'development'
  },
  esbuild: {
    target: 'esnext',
    format: 'esm',
    platform: 'browser',
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
    // Allow type checking but continue build on error
    tsconfigRaw: {
      compilerOptions: {
        skipLibCheck: true, 
        jsx: 'preserve',
        jsxImportSource: 'react'
      }
    }
  }
}));
