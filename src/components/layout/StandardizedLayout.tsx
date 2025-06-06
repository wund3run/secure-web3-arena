
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useAuth } from '@/contexts/auth';
import { ProductionNavbar } from './production-navbar';
import { SimplifiedNavbar } from './simplified-navbar';
import { Footer } from './footer';
import { EnhancedBreadcrumbTrail } from './navigation/enhanced-breadcrumb-trail';
import { OnboardingManager } from '@/components/onboarding/OnboardingManager';
import { ContextualHelp } from '@/components/help/ContextualHelp';
import { toast } from 'sonner';

interface StandardizedLayoutProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  children: React.ReactNode;
  className?: string;
  showFooter?: boolean;
  showBreadcrumbs?: boolean;
  helpItems?: Array<{
    title: string;
    description: string;
    type: 'tip' | 'guide' | 'video' | 'faq';
    content?: string;
    links?: Array<{ text: string; url: string; }>;
  }>;
  pageType?: 'landing' | 'dashboard' | 'marketplace' | 'content';
}

export function StandardizedLayout({ 
  title, 
  description, 
  keywords = [],
  ogImage,
  children, 
  className = '',
  showFooter = true,
  showBreadcrumbs = true,
  helpItems = [],
  pageType = 'content'
}: StandardizedLayoutProps) {
  const { user } = useAuth();

  // SEO structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "publisher": {
      "@type": "Organization",
      "name": "Hawkly",
      "logo": "https://hawkly.dev/logo.png"
    }
  };

  // Page-specific structured data
  if (pageType === 'marketplace') {
    structuredData["@type"] = "ItemList";
    structuredData["itemListElement"] = [];
  }

  return (
    <>
      <Helmet>
        <title>{title} | Hawkly - Web3 Security Marketplace</title>
        <meta name="description" content={description} />
        {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta property="og:title" content={`${title} | Hawkly`} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage || '/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png'} />
        <meta property="og:site_name" content="Hawkly" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
        <meta property="twitter:title" content={`${title} | Hawkly`} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={ogImage || '/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png'} />
        
        {/* Additional SEO */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Hawkly Team" />
        <link rel="canonical" href={typeof window !== 'undefined' ? window.location.href : ''} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        
        {/* Performance hints */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        {user ? <ProductionNavbar /> : <SimplifiedNavbar />}
        
        {showBreadcrumbs && user && <EnhancedBreadcrumbTrail />}
        
        <main className={`flex-grow relative ${className}`} role="main">
          {/* Contextual Help */}
          {helpItems.length > 0 && (
            <div className="fixed top-20 right-4 z-50">
              <ContextualHelp 
                context={title}
                helpItems={helpItems}
              />
            </div>
          )}
          
          {/* Skip to content link for accessibility */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 transition-all"
          >
            Skip to main content
          </a>
          
          <div id="main-content" tabIndex={-1}>
            {children}
          </div>
        </main>
        
        {showFooter && <Footer />}
        
        <OnboardingManager />
      </div>
    </>
  );
}
