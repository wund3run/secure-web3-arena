import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { AppContainer } from '../layout/AppContainer';

interface ContentPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function ContentPage({ title, description, children, className = '' }: ContentPageProps) {
  return (
    <>
      <Helmet>
        <title>{title} | Hawkly Web3 Security Marketplace</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className={`flex-grow ${className}`}>
          <AppContainer maxWidth="max-w-6xl" padding="py-12" elevation>
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {children}
            </div>
          </AppContainer>
        </main>
        <Footer />
      </div>
    </>
  );
}
