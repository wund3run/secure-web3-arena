
// Optimized exports for better tree shaking
export { LazySection } from './LazySection';
export { FastImage } from './FastImage';
export { OptimizedImage } from './OptimizedImage';

// Lazy load the performance monitor only when needed
export const PerformanceMonitor = React.lazy(() => 
  import('./PerformanceMonitor').then(module => ({
    default: module.PerformanceMonitor
  }))
);

import React from 'react';
