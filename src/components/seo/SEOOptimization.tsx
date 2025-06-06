
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOOptimizationProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article' | 'product';
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: object;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export function SEOOptimization({
  title,
  description,
  keywords = [],
  ogImage = '/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png',
  ogType = 'website',
  canonicalUrl,
  noIndex = false,
  structuredData,
  author = 'Hawkly Team',
  publishedTime,
  modifiedTime
}: SEOOptimizationProps) {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const canonical = canonicalUrl || currentUrl;
  
  const defaultStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": canonical,
    "publisher": {
      "@type": "Organization",
      "name": "Hawkly",
      "url": "https://hawkly.dev",
      "logo": {
        "@type": "ImageObject",
        "url": "https://hawkly.dev/logo.png"
      }
    },
    ...(publishedTime && { "datePublished": publishedTime }),
    ...(modifiedTime && { "dateModified": modifiedTime })
  };

  const finalStructuredData = structuredData || defaultStructuredData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title} | Hawkly - Web3 Security Marketplace</title>
      <meta name="description" content={description} />
      {keywords.length > 0 && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="author" content={author} />
      
      {/* Robots */}
      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      <meta name="googlebot" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:alt" content={`${title} - Hawkly`} />
      <meta property="og:site_name" content="Hawkly" />
      <meta property="og:locale" content="en_US" />
      
      {/* Article specific */}
      {ogType === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {ogType === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {ogType === 'article' && (
        <meta property="article:author" content={author} />
      )}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={`${title} - Hawkly`} />
      <meta name="twitter:site" content="@hawkly_dev" />
      <meta name="twitter:creator" content="@hawkly_dev" />
      
      {/* Additional SEO */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(finalStructuredData)}
      </script>
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//cdn.jsdelivr.net" />
      <link rel="dns-prefetch" href="//unpkg.com" />
    </Helmet>
  );
}

// Pre-configured SEO components for common page types
export function LandingPageSEO({ title, description }: { title: string; description: string }) {
  return (
    <SEOOptimization
      title={title}
      description={description}
      keywords={['web3 security', 'smart contract audit', 'blockchain security', 'cryptocurrency security']}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Hawkly",
        "url": "https://hawkly.dev",
        "description": description,
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://hawkly.dev/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      }}
    />
  );
}

export function MarketplaceSEO({ title, description }: { title: string; description: string }) {
  return (
    <SEOOptimization
      title={title}
      description={description}
      keywords={['security auditors', 'blockchain experts', 'smart contract review', 'web3 marketplace']}
      structuredData={{
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": title,
        "description": description,
        "url": "https://hawkly.dev/marketplace"
      }}
    />
  );
}

export function ArticleSEO({ 
  title, 
  description, 
  author, 
  publishedTime, 
  modifiedTime 
}: { 
  title: string; 
  description: string; 
  author?: string; 
  publishedTime?: string; 
  modifiedTime?: string; 
}) {
  return (
    <SEOOptimization
      title={title}
      description={description}
      ogType="article"
      author={author}
      publishedTime={publishedTime}
      modifiedTime={modifiedTime}
      keywords={['web3 security', 'blockchain', 'smart contracts', 'cybersecurity']}
    />
  );
}
