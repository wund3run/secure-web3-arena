import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/auth';
import { ProductionNavbar } from './production-navbar';
import { SimplifiedNavbar } from './simplified-navbar';
import { Footer } from './footer';
import { EnhancedBreadcrumbTrail } from './navigation/enhanced-breadcrumb-trail';
import { OnboardingFlow } from '@/components/onboarding/OnboardingFlow';
import { QuickActionsFAB } from '@/components/ui/quick-actions-fab';
import { AppContainer } from './AppContainer';

interface EnhancedAuthAwareLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
  showBreadcrumbs?: boolean;
  showQuickActions?: boolean;
}

export function EnhancedAuthAwareLayout({ 
  title, 
  description, 
  children, 
  className = '',
  showFooter = true,
  showBreadcrumbs = true,
  showQuickActions = true
}: EnhancedAuthAwareLayoutProps) {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>{title} | Hawkly</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        {user ? <ProductionNavbar /> : <SimplifiedNavbar />}
        
        {showBreadcrumbs && <EnhancedBreadcrumbTrail />}
        
        <main className={`flex-grow ${className}`}>
          <AppContainer>
            {children}
          </AppContainer>
        </main>
        
        {showFooter && <Footer />}
        
        {/* Enhanced UX Components */}
        <OnboardingFlow />
        {showQuickActions && <QuickActionsFAB />}
      </div>
    </>
  );
}
