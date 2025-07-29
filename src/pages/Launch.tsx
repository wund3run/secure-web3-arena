import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PreLaunchDashboard } from '@/components/launch/PreLaunchDashboard';
import { AppContainer } from '@/components/layout/AppContainer';

export default function Launch() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Pre-Launch Dashboard - Hawkly</title>
        <meta name="description" content="Track progress towards production launch" />
      </Helmet>
      
      <AppContainer maxWidth="max-w-6xl" padding="py-8 px-4" elevation>
        <PreLaunchDashboard />
      </AppContainer>
    </div>
  );
}
