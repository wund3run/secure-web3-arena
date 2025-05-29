
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function Home() {
  return (
    <StandardLayout title="Home - Hawkly" description="Welcome to Hawkly">
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Welcome to Hawkly</h1>
        <p className="text-muted-foreground mt-2">
          Your Web3 security marketplace platform
        </p>
      </div>
    </StandardLayout>
  );
}
