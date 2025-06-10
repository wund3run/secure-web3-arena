
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOOptimizationProps {
  title?: string;
  description?: string;
  keywords?: string;
  imageUrl?: string;
  type?: string;
  url?: string;
}

export function SEOOptimization({
  title = "Hawkly | Leading Web3 Security Marketplace",
  description = "Connect with verified Web3 security experts for smart contract audits. Fast, secure, affordable blockchain security solutions.",
  keywords = "web3 security, smart contract audit, blockchain security, defi security, nft audit",
  imageUrl = "/lovable-uploads/fd4d9ea7-6cf1-4fe8-9327-9c7822369207.png",
  type = "website",
  url = "https://hawkly.app"
}: SEOOptimizationProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={url} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      
      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
