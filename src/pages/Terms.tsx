
import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Terms() {
  return (
    <>
      <Helmet>
        <title>Terms of Service | Hawkly</title>
        <meta name="description" content="Terms of Service and User Agreement for the Hawkly Web3 Security Marketplace" />
      </Helmet>
      
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate max-w-none">
          <h2>1. Introduction</h2>
          <p>
            These Terms of Service govern your use of the Hawkly platform. By accessing or using our service, you agree to be bound by these Terms.
          </p>
          
          <h2>2. Definitions</h2>
          <p>
            "Platform" refers to the Hawkly Web3 security marketplace.
            "User" refers to any individual or entity that accesses or uses the Platform.
            "Service Provider" refers to security auditors and firms offering services through our Platform.
          </p>
          
          <h2>3. User Obligations</h2>
          <p>
            Users agree to provide accurate information, maintain account security, and use the Platform in compliance with applicable laws and regulations.
          </p>
          
          <h2>4. Service Provider Terms</h2>
          <p>
            Service Providers must meet our verification requirements, deliver services as described, and maintain professional conduct throughout all engagements.
          </p>
          
          <h2>5. Dispute Resolution</h2>
          <p>
            Hawkly provides dispute resolution mechanisms for issues between Users and Service Providers. All parties agree to attempt resolution through our system before pursuing other remedies.
          </p>
        </div>
      </div>
    </>
  );
}
