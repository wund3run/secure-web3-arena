
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ProductionNavbar } from './production-navbar';
import { EnhancedFooter } from '@/components/home/enhanced-footer';
import { SupportButtonEnhanced } from '@/components/ui/support-button-enhanced';
import { AdaptiveInterface } from '@/components/adaptive-interface/AdaptiveInterface';
import { ComprehensiveErrorBoundary } from '@/components/error/comprehensive-error-boundary';

interface ProductionLayoutProps {
  children?: React.ReactNode;
  variant?: 'default' | 'minimal' | 'dashboard';
  showFooter?: boolean;
  showSupport?: boolean;
}

export function ProductionLayout({ 
  children, 
  variant = 'default',
  showFooter = true,
  showSupport = true 
}: ProductionLayoutProps) {
  return (
    <ComprehensiveErrorBoundary>
      <div className="min-h-screen flex flex-col bg-background">
        <ProductionNavbar />
        
        <main className="flex-1">
          <AdaptiveInterface variant={variant === 'dashboard' ? 'dashboard-only' : 'full'}>
            {children || <Outlet />}
          </AdaptiveInterface>
        </main>
        
        {showFooter && (
          <React.Suspense fallback={<div className="h-20" />}>
            <EnhancedFooter />
          </React.Suspense>
        )}
        
        {showSupport && (
          <React.Suspense fallback={null}>
            <SupportButtonEnhanced />
          </React.Suspense>
        )}
      </div>
    </ComprehensiveErrorBoundary>
  );
}
