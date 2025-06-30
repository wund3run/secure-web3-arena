
import React from 'react';
import { EnhancedPageMeta } from '@/components/seo/EnhancedPageMeta';

interface StandardizedPageLayoutProps {
  title: string;
  description: string;
  keywords?: string[];
  showBreadcrumbs?: boolean;
  children: React.ReactNode;
  structuredData?: object;
  className?: string;
}

export function StandardizedPageLayout({
  title,
  description,
  keywords = [],
  showBreadcrumbs = true,
  children,
  structuredData,
  className = ""
}: StandardizedPageLayoutProps) {
  return (
    <div className={`min-h-screen bg-background ${className}`}>
      <EnhancedPageMeta
        title={title}
        description={description}
        keywords={keywords}
        structuredData={structuredData}
      />
      
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
