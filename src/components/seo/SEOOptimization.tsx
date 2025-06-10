
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOOptimizationProps {
  title: string;
  description: string;
  type?: 'website' | 'article' | 'profile' | 'service';
  imageUrl?: string;
  canonicalUrl?: string;
  structuredData?: object;
}

export function SEOOptimization({
  title,
  description,
  type = 'website',
  imageUrl,
  canonicalUrl,
  structuredData
}: SEOOptimizationProps) {
  const siteUrl = 'https://hawkly.com';
  const fullImageUrl = imageUrl && (imageUrl.startsWith('http') ? imageUrl : `${siteUrl}${imageUrl}`);
  const fullCanonicalUrl = canonicalUrl && (canonicalUrl.startsWith('http') ? canonicalUrl : `${siteUrl}${canonicalUrl}`);
  
  return (
    <Helmet>
      {/* Basic SEO */}
      <meta name="robots" content="index, follow" />
      {canonicalUrl && <link rel="canonical" href={fullCanonicalUrl} />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Hawkly" />
      {fullImageUrl && <meta property="og:image" content={fullImageUrl} />}
      {fullCanonicalUrl && <meta property="og:url" content={fullCanonicalUrl} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {fullImageUrl && <meta name="twitter:image" content={fullImageUrl} />}
      
      {/* Structured data for SEO */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
}
