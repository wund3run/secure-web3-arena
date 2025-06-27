

import { lazy } from 'react';
import React from 'react';

// Lazy load heavy components to improve initial bundle size
export const LazyComponents = {
  // Dashboard components
  AuditorDashboard: lazy(() => import('@/components/dashboard/enhanced/EnhancedAuditorDashboard')),
  ProjectOwnerDashboard: lazy(() => import('@/components/dashboard/enhanced/EnhancedProjectOwnerDashboard')),
  AdminDashboard: lazy(() => import('@/components/admin/AdminDashboard')),
  
  // Analytics components
  AnalyticsDashboard: lazy(() => import('@/components/analytics/EnhancedAnalyticsDashboard')),
  ComprehensiveAnalytics: lazy(() => import('@/components/analytics/ComprehensiveAnalyticsDashboard')),
  
  // AI components
  AIMatchingInterface: lazy(() => import('@/components/ai-matching/AIMatchingInterface')),
  IntelligentRecommendations: lazy(() => import('@/components/ai-recommendations/IntelligentRecommendationEngine')),
  
  // Workspace components
  AuditWorkspace: lazy(() => import('@/components/workspace/AuditWorkspace')),
  
  // Chat components
  RealtimeChat: lazy(() => import('@/components/chat/RealtimeChat')),
  ProjectChatRoom: lazy(() => import('@/components/chat/ProjectChatRoom'))
};

// Component loading wrapper with error boundary
export function withSuspense<T extends Record<string, any>>(
  Component: React.LazyExoticComponent<React.ComponentType<T>>,
  fallback?: React.ReactNode
) {
  return function WrappedComponent(props: T) {
    return (
      <React.Suspense 
        fallback={
          fallback || (
            <div className="flex items-center justify-center p-8">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )
        }
      >
        <Component {...props} />
      </React.Suspense>
    );
  };
}

// Preload components based on user role
export const preloadComponents = {
  auditor: () => {
    LazyComponents.AuditorDashboard.preload?.();
    LazyComponents.AuditWorkspace.preload?.();
  },
  
  project_owner: () => {
    LazyComponents.ProjectOwnerDashboard.preload?.();
    LazyComponents.AIMatchingInterface.preload?.();
  },
  
  admin: () => {
    LazyComponents.AdminDashboard.preload?.();
    LazyComponents.AnalyticsDashboard.preload?.();
  }
};

// Dynamic import utility
export async function dynamicImport<T>(
  importFn: () => Promise<{ default: T }>
): Promise<T> {
  try {
    const module = await importFn();
    return module.default;
  } catch (error) {
    console.error('Dynamic import failed:', error);
    throw error;
  }
}

