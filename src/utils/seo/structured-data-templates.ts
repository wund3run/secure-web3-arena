
export const createServiceStructuredData = (serviceName: string, description: string, price?: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": serviceName,
  "description": description,
  "provider": {
    "@type": "Organization",
    "name": "Hawkly",
    "url": "https://hawkly.app",
    "logo": "https://hawkly.app/hawkly-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png"
  },
  "serviceType": "Web3 Security Service",
  "areaServed": "Worldwide",
  ...(price && {
    "offers": {
      "@type": "Offer",
      "price": price,
      "priceCurrency": "USD"
    }
  })
});

export const createOrganizationStructuredData = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Hawkly",
  "alternateName": "Hawkly Security Platform",
  "description": "Leading Web3 security marketplace connecting projects with verified security experts",
  "url": "https://hawkly.app",
  "logo": "https://hawkly.app/hawkly-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png",
  "foundingDate": "2023",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-HAWKLY",
    "contactType": "customer service",
    "email": "hello@hawkly.com"
  },
  "sameAs": [
    "https://twitter.com/hawkly_security",
    "https://github.com/hawkly",
    "https://discord.gg/hawkly",
    "https://linkedin.com/company/hawkly"
  ]
});

export const createFAQStructuredData = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});
