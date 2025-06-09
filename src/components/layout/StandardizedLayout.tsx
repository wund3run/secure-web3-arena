
import React from "react";
import { Helmet } from "react-helmet-async";
import { UnifiedNavbar } from "./unified-navbar";
import { EnhancedBreadcrumbs } from "./enhanced-breadcrumbs";
import { EnhancedFooter } from "@/components/home/enhanced-footer";

interface StandardizedLayoutProps {
  children: React.ReactNode;
  title: string;
  description: string;
  keywords?: string;
  showBreadcrumbs?: boolean;
  showSimplifiedNavigation?: boolean;
  className?: string;
}

export function StandardizedLayout({
  children,
  title,
  description,
  keywords,
  showBreadcrumbs = true,
  showSimplifiedNavigation = false,
  className = ""
}: StandardizedLayoutProps) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Helmet>
      
      <div className={`min-h-screen bg-background flex flex-col ${className}`}>
        <UnifiedNavbar />
        {showBreadcrumbs && <EnhancedBreadcrumbs />}
        <div className="flex-1">
          {children}
        </div>
        <React.Suspense fallback={<div className="h-20" />}>
          <EnhancedFooter />
        </React.Suspense>
      </div>
    </>
  );
}
