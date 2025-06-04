
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
          // Vendor chunks for better caching
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['react-router-dom'],
          
          // UI component chunks
          'ui-components': [
            '@radix-ui/react-progress',
            '@radix-ui/react-slider', 
            '@radix-ui/react-tooltip',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu'
          ],
          
          // Form handling chunk
          'form-components': [
            '@hookform/resolvers',
            'react-hook-form',
            'zod'
          ],
          
          // Charts and visualization
          'charts': ['recharts'],
          
          // Authentication and database
          'auth': ['@supabase/supabase-js']
        },
        
        // Advanced chunking strategy
        chunkFileNames: (chunkInfo) => {
          if (chunkInfo.isDynamicEntry) {
            return 'chunks/dynamic/[name]-[hash].js';
          }
          return 'chunks/[name]-[hash].js';
        },
        
        entryFileNames: 'entries/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.').pop();
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType || '')) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (/woff2?|eot|ttf|otf/i.test(extType || '')) {
            return 'assets/fonts/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    },
    
    // Enhanced build settings for performance
    chunkSizeWarningLimit: 1000,
    minify: 'esbuild', // Faster minification
    cssMinify: 'esbuild',
    assetsInlineLimit: 4096, // Inline small assets
    
    // Enable tree-shaking
    treeshake: {
      moduleSideEffects: false,
      propertyReadSideEffects: false,
      unknownGlobalSideEffects: false
    }
  },
  
  optimizeDeps: {
    include: [
      'react', 
      'react-dom', 
      'react-router-dom',
      '@supabase/supabase-js',
      'recharts'
    ],
    exclude: [
      // Exclude large dependencies that should be loaded on demand
    ],
    force: false // Only force when needed
  },
  
  assetsInclude: ['**/*.svg'], // Ensure SVGs are properly handled
  
  css: {
    devSourcemap: mode === 'development',
    postcss: {
      plugins: mode === 'production' ? [
        require('cssnano')({
          preset: 'default',
        })
      ] : []
    }
  },
  
  esbuild: {
    target: 'esnext',
    format: 'esm',
    platform: 'browser',
    treeShaking: true,
    
    // Production optimizations
    ...(mode === 'production' && {
      drop: ['console', 'debugger'],
      minifyIdentifiers: true,
      minifySyntax: true,
      minifyWhitespace: true
    })
  }
}));
