import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';
import { ProductionNavbar } from './production-navbar';
import { EnhancedFooter } from '@/components/home/enhanced-footer';
import { SupportButtonEnhanced } from '@/components/ui/support-button-enhanced';
import { AdaptiveInterface } from '@/components/adaptive-interface/AdaptiveInterface';
import { ComprehensiveErrorBoundary } from '@/components/error/comprehensive-error-boundary';
import { AppContainer } from './AppContainer';

interface ProductionLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export function ProductionLayout({ 
  children, 
  title = "Hawkly | Web3 Security Marketplace",
  description = "Connect with verified Web3 security experts for smart contract audits"
}: ProductionLayoutProps) {
  return (
    <ComprehensiveErrorBoundary>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="min-h-screen flex flex-col bg-background">
        <ProductionNavbar />
        <main className="flex-1">
          <AppContainer>
            <AdaptiveInterface>
              {children || <Outlet />}
            </AdaptiveInterface>
          </AppContainer>
        </main>
        <EnhancedFooter />
        <SupportButtonEnhanced />
      </div>
    </ComprehensiveErrorBoundary>
  );
}
