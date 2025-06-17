
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { UnifiedNavbar } from './unified-navbar';
import { Footer } from './footer';

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
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <UnifiedNavbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
