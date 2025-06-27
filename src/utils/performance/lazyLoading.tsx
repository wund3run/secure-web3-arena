
import { lazy } from 'react';
import React from 'react';

// Lazy load heavy components to improve initial bundle size
export const LazyComponents = {
  // Dashboard components - using named exports
  AuditorDashboard: lazy(() => 
    import('@/components/dashboard/enhanced/EnhancedAuditorDashboard').then(module => ({
      default: module.EnhancedAuditorDashboard
    }))
  ),
  ProjectOwnerDashboard: lazy(() => 
    import('@/components/dashboard/enhanced/EnhancedProjectOwnerDashboard').then(module => ({
      default: module.EnhancedProjectOwnerDashboard
    }))
  ),
  AdminDashboard: lazy(() => 
    import('@/components/admin/AdminDashboard').then(module => ({
      default: module.AdminDashboard
    }))
  ),
  
  // Analytics components
  AnalyticsDashboard: lazy(() => 
    import('@/components/analytics/EnhancedAnalyticsDashboard').then(module => ({
      default: module.EnhancedAnalyticsDashboard
    }))
  ),
  ComprehensiveAnalytics: lazy(() => 
    import('@/components/analytics/ComprehensiveAnalyticsDashboard').then(module => ({
      default: module.ComprehensiveAnalyticsDashboard
    }))
  ),
  
  // AI components
  AIMatchingInterface: lazy(() => 
    import('@/components/ai-matching/AIMatchingInterface').then(module => ({
      default: module.AIMatchingInterface
    }))
  ),
  IntelligentRecommendations: lazy(() => 
    import('@/components/ai-recommendations/IntelligentRecommendationEngine').then(module => ({
      default: module.IntelligentRecommendationEngine
    }))
  ),
  
  // Workspace components
  AuditWorkspace: lazy(() => 
    import('@/components/workspace/AuditWorkspace').then(module => ({
      default: module.AuditWorkspace
    }))
  ),
  
  // Chat components
  RealtimeChat: lazy(() => 
    import('@/components/chat/RealtimeChat').then(module => ({
      default: module.RealtimeChat
    }))
  ),
  ProjectChatRoom: lazy(() => 
    import('@/components/chat/ProjectChatRoom').then(module => ({
      default: module.ProjectChatRoom
    }))
  )
};

// Simplified component loading wrapper with error boundary
export function withSuspense(
  Component: React.LazyExoticComponent<React.ComponentType<any>>,
  fallback?: React.ReactNode
) {
  return function WrappedComponent(props: any) {
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

// Simplified preload functionality (manual component loading)
export const preloadComponents = {
  auditor: () => {
    // Trigger the import to preload the component
    import('@/components/dashboard/enhanced/EnhancedAuditorDashboard');
    import('@/components/workspace/AuditWorkspace');
  },
  
  project_owner: () => {
    import('@/components/dashboard/enhanced/EnhancedProjectOwnerDashboard');
    import('@/components/ai-matching/AIMatchingInterface');
  },
  
  admin: () => {
    import('@/components/admin/AdminDashboard');
    import('@/components/analytics/EnhancedAnalyticsDashboard');
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
