
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { SkipToContent } from '@/components/layout/SkipToContent';

interface ContentPageProps {
  title: string;
  description: string;
  children: React.ReactNode;
  wide?: boolean;
}

export function ContentPage({ 
  title, 
  description, 
  children,
  wide = false
}: ContentPageProps) {
  return (
    <>
      <Helmet>
        <title>{title} | Hawkly</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="min-h-screen bg-background flex flex-col">
        <SkipToContent targetId="main-content" />
        <Navbar />
        <div className="flex-grow py-8 md:py-12">
          <main 
            id="main-content" 
            tabIndex={-1}
            className={`container px-4 md:px-6 ${wide ? '' : 'max-w-4xl'} mx-auto`}
          >
            {children}
          </main>
        </div>
        <Footer />
      </div>
    </>
  );
}
