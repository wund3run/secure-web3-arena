
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface EnhancedPageMetaProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'service' | 'profile';
  noIndex?: boolean;
  structuredData?: object;
  breadcrumbs?: Array<{ name: string; url: string }>;
}

export function EnhancedPageMeta({ 
  title, 
  description, 
  keywords = [], 
  image, 
  url, 
  type = 'website',
  noIndex = false,
  structuredData,
  breadcrumbs = []
}: EnhancedPageMetaProps) {
  const fullTitle = title.includes('Hawkly') ? title : `${title} | Hawkly - Web3 Security Platform`;
  const defaultImage = '/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png';
  const imageUrl = image || defaultImage;
  const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  // Enhanced keywords for Web3 security
  const enhancedKeywords = [
    ...keywords,
    'web3 security',
    'smart contract audit',
    'blockchain security',
    'defi security',
    'cryptocurrency audit',
    'hawkly'
  ];

  // Create breadcrumb structured data
  const breadcrumbStructuredData = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  } : null;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={enhancedKeywords.join(', ')} />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />}
      
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Enhanced Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${title} - Hawkly Web3 Security`} />
      <meta property="og:site_name" content="Hawkly" />
      <meta property="og:locale" content="en_US" />
      
      {/* Enhanced Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@hawkly_security" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={`${title} - Hawkly`} />
      
      {/* Additional SEO */}
      <meta name="author" content="Hawkly" />
      <meta name="theme-color" content="#2563eb" />
      <meta name="application-name" content="Hawkly" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      {/* Breadcrumb Structured Data */}
      {breadcrumbStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
      )}
    </Helmet>
  );
}
