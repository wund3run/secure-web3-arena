
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
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
    cssMinify: 'esbuild'
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: [],
    force: false // Only force when needed
  },
  assetsInclude: ['**/*.svg'], // Ensure SVGs are properly handled
  css: {
    devSourcemap: mode === 'development'
  }
}));
