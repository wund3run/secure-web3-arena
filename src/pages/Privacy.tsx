
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { GDPRCompliantPrivacy } from '@/components/legal/GDPRCompliantPrivacy';

export default function Privacy() {
  return (
    <StandardLayout
      title="Privacy Policy | Hawkly"
      description="GDPR and India compliant privacy policy for Hawkly's Web3 security platform"
    >
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <GDPRCompliantPrivacy />
      </div>
    </StandardLayout>
  );
}
