
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { AuditorOnboardingWizard } from '@/components/auditor/AuditorOnboardingWizard';

export default function AuditorOnboarding() {
  return (
    <>
      <Helmet>
        <title>Become an Auditor | Hawkly</title>
        <meta name="description" content="Join Hawkly as a security auditor and help secure Web3 projects" />
      </Helmet>

      <div className="min-h-screen bg-background py-8">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Become a Verified Auditor</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join our network of expert security auditors and help secure the Web3 ecosystem. 
              Complete your profile to start receiving high-quality audit opportunities.
            </p>
          </div>
          
          <AuditorOnboardingWizard />
        </div>
      </div>
    </>
  );
}
