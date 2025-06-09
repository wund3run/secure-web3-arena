
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical?: string;
  ogImage?: string;
  structuredData?: object;
}

const pageData: Record<string, SEOData> = {
  '/': {
    title: 'Hawkly | Leading Web3 Security Marketplace - Smart Contract Audits',
    description: 'Connect with verified Web3 security experts for comprehensive smart contract audits. AI-powered matching, real-time collaboration, and industry-leading security standards.',
    keywords: ['web3 security', 'smart contract audit', 'blockchain security', 'defi audit', 'ethereum audit', 'solana audit'],
    ogImage: '/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png',
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Hawkly",
      "description": "Leading Web3 Security Marketplace",
      "url": "https://hawkly.com",
      "logo": "/lovable-uploads/6286d686-7daf-4eb4-8d7b-51a3de242644.png",
      "sameAs": ["https://twitter.com/hawkly", "https://github.com/hawkly"]
    }
  },
  '/marketplace': {
    title: 'Security Expert Marketplace | Hawkly - Find Web3 Auditors',
    description: 'Browse and connect with verified Web3 security experts. Compare services, read reviews, and find the perfect auditor for your smart contract project.',
    keywords: ['security experts', 'web3 auditors', 'smart contract experts', 'blockchain auditors', 'defi security'],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Security Expert Marketplace",
      "provider": { "@type": "Organization", "name": "Hawkly" }
    }
  },
  '/security-audits': {
    title: 'Smart Contract Security Audits | Hawkly - Professional Web3 Security',
    description: 'Professional smart contract security audits for Ethereum, Solana, and other blockchains. Comprehensive vulnerability assessment and security recommendations.',
    keywords: ['smart contract audit', 'security audit', 'ethereum audit', 'solana audit', 'defi security audit'],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Smart Contract Security Audits",
      "description": "Professional security auditing services for smart contracts",
      "provider": { "@type": "Organization", "name": "Hawkly" }
    }
  },
  '/request-audit': {
    title: 'Request Security Audit | Hawkly - Get Your Smart Contract Audited',
    description: 'Submit your smart contract for professional security audit. AI-powered expert matching, competitive pricing, and fast turnaround times.',
    keywords: ['request audit', 'smart contract audit request', 'security audit request', 'web3 audit'],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Request Security Audit",
      "description": "Submit your project for professional security audit"
    }
  },
  '/web3-security': {
    title: 'Web3 Security Best Practices | Hawkly - Smart Contract Security Guide',
    description: 'Learn Web3 security best practices, common vulnerabilities, and how to secure your smart contracts. Comprehensive security guidelines and resources.',
    keywords: ['web3 security', 'smart contract security', 'blockchain security', 'defi security', 'security best practices'],
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Web3 Security Best Practices",
      "description": "Comprehensive guide to Web3 and smart contract security"
    }
  }
};

export function SEOEnhancer() {
  const location = useLocation();
  const currentPath = location.pathname;
  const seoData = pageData[currentPath] || pageData['/'];

  return (
    <Helmet>
      <title>{seoData.title}</title>
      <meta name="description" content={seoData.description} />
      <meta name="keywords" content={seoData.keywords.join(', ')} />
      
      {/* Open Graph */}
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://hawkly.com${currentPath}`} />
      {seoData.ogImage && <meta property="og:image" content={seoData.ogImage} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      {seoData.ogImage && <meta name="twitter:image" content={seoData.ogImage} />}
      
      {/* Canonical URL */}
      <link rel="canonical" href={`https://hawkly.com${currentPath}`} />
      
      {/* Structured Data */}
      {seoData.structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(seoData.structuredData)}
        </script>
      )}
      
      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Hawkly" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Performance hints */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
}
