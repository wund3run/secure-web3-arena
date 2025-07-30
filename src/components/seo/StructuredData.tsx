import React from 'react';
import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'Organization' | 'Service' | 'Article' | 'WebPage' | 'FAQPage';
  data: Record<string, unknown>;
}

export function StructuredData({ type, data }: StructuredDataProps) {
  const baseData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  } as Record<string, unknown>;

  // Add common organization data for all types
  if (type !== 'Organization') {
    baseData.provider = {
      "@type": "Organization",
      "name": "Hawkly",
      "url": "https://hawkly.app",
      "logo": "https://hawkly.app/hawkly-logo.svg"
    };
  }

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(baseData)}
      </script>
    </Helmet>
  );
}

// Pre-configured structured data for common pages
export const organizationData = {
  "name": "Hawkly",
  "alternateName": "Hawkly Security",
  "description": "Leading Web3 security platform providing expert audits and security services",
  "url": "https://hawkly.app",
  "logo": "https://hawkly.app/hawkly-logo.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-HAWKLY",
    "contactType": "customer service",
    "email": "join@hawkly.com"
  },
  "sameAs": [
    "https://github.com/hawkly",
    "https://discord.gg/D63cfVxa",
    "https://x.com/hawkly_world",
    "https://www.linkedin.com/company/hawkly-world/about/"
  ],
  "foundingDate": "2023",
  "founders": [
    {
      "@type": "Person",
      "name": "Sarah Chen"
    },
    {
      "@type": "Person",
      "name": "Alex Rodriguez"
    }
  ]
};

export const serviceData = {
  "name": "Web3 Security Audit Services",
  "description": "Comprehensive smart contract and Web3 security auditing services",
  "serviceType": "Security Audit",
  "areaServed": "Worldwide",
  "offers": [
    {
      "@type": "Offer",
      "name": "Basic Security Audit",
      "price": "2999",
      "priceCurrency": "USD",
      "description": "Essential security audit for small smart contracts"
    },
    {
      "@type": "Offer",
      "name": "Professional Security Audit", 
      "price": "7999",
      "priceCurrency": "USD",
      "description": "Comprehensive security review for production applications"
    }
  ]
};
