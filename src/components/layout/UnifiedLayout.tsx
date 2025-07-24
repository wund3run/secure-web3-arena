import React from 'react';
import { Outlet } from 'react-router-dom';
import { UnifiedNavigation } from './UnifiedNavigation';
import { Footer } from './footer';
import { ThemeProvider } from '../theme/ThemeProvider';
import { AppContainer } from './AppContainer';

interface UnifiedLayoutProps {
  children?: React.ReactNode;
  showFooter?: boolean;
}

export function UnifiedLayout({ children, showFooter = true }: UnifiedLayoutProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="hawkly-ui-theme">
      <div className="min-h-screen flex flex-col bg-background">
        <UnifiedNavigation />
        
        <main className="flex-1">
          <AppContainer>
            {children || <Outlet />}
          </AppContainer>
        </main>
        
        {showFooter && <Footer />}
      </div>
    </ThemeProvider>
  );
} 