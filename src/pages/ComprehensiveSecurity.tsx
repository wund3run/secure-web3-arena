
import React from 'react';
import { ContentPage } from '@/components/content/content-page';
import { ComprehensiveSecurity } from '@/components/home/comprehensive-security';

export default function ComprehensiveSecurityPage() {
  return (
    <ContentPage
      title="Complete Security Coverage"
      description="End-to-end security solutions for every layer of your Web3 application"
      className="px-4 md:px-6"
    >
      <ComprehensiveSecurity />
    </ContentPage>
  );
}
