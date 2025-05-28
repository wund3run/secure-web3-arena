
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Navbar } from './navbar';
import { Footer } from './footer';

interface StandardLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export function StandardLayout({ title, description, children, className = '' }: StandardLayoutProps) {
  return (
    <>
      <Helmet>
        <title>{title} | Hawkly</title>
        <meta name="description" content={description} />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className={`flex-grow ${className}`}>
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}
