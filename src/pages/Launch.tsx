
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PreLaunchDashboard } from '@/components/launch/PreLaunchDashboard';

export default function Launch() {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Pre-Launch Dashboard - Hawkly</title>
        <meta name="description" content="Track progress towards production launch" />
      </Helmet>
      
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <PreLaunchDashboard />
      </div>
    </div>
  );
}
