
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UnifiedNavbar } from './unified-navbar';
import { EnhancedBreadcrumbs } from './enhanced-breadcrumbs';
import { Toaster } from 'sonner';

interface StandardizedLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
  showBreadcrumbs?: boolean;
  className?: string;
}

export function StandardizedLayout({
  children,
  title = "Hawkly | Web3 Security Marketplace",
  description = "Connect with verified Web3 security experts for smart contract audits.",
  keywords = "web3 security, smart contract audit, blockchain security",
  showBreadcrumbs = true,
  className = ""
}: StandardizedLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-background ${className}`}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#9c88ff" />
      </Helmet>

      <UnifiedNavbar />
      
      {showBreadcrumbs && <EnhancedBreadcrumbs />}
      
      <main className="flex-1">
        {children}
      </main>

      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--card-foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  );
}
