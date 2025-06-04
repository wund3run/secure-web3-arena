
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { UXEnhancementsDashboard } from '@/components/ux-enhancements/UXEnhancementsDashboard';

export default function UXEnhancements() {
  return (
    <>
      <Helmet>
        <title>UX Enhancements | Hawkly</title>
        <meta name="description" content="Manage accessibility, theming, internationalization, and real-time features for enhanced user experience." />
      </Helmet>

      <StandardLayout 
        title="UX Enhancements" 
        description="Advanced user experience features and customization options"
      >
        <UXEnhancementsDashboard />
      </StandardLayout>
    </>
  );
}
