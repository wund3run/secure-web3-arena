
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/auth';
import { ProductionNavbar } from './production-navbar';
import { SimplifiedNavbar } from './simplified-navbar';
import { Footer } from './footer';

interface AuthAwareLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
}

export function AuthAwareLayout({ 
  title, 
  description, 
  children, 
  className = '',
  showFooter = true 
}: AuthAwareLayoutProps) {
  const { user } = useAuth();

  return (
    <>
      <Helmet>
        <title>{title} | Hawkly</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        {user ? <ProductionNavbar /> : <SimplifiedNavbar />}
        <main className={`flex-grow ${className}`}>
          {children}
        </main>
        {showFooter && <Footer />}
      </div>
    </>
  );
}
