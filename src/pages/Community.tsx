
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function Community() {
  return (
    <StandardLayout
      title="Community | Hawkly"
      description="Connect with the Web3 security community"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Security Community</h1>
        <p className="text-muted-foreground">
          Connect with Web3 security experts and enthusiasts coming soon...
        </p>
      </div>
    </StandardLayout>
  );
}
