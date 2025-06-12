
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function Marketplace() {
  return (
    <StandardLayout
      title="Marketplace | Hawkly"
      description="Browse security services and expert providers"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Security Marketplace</h1>
        <p className="text-muted-foreground">
          Browse security services and expert providers coming soon...
        </p>
      </div>
    </StandardLayout>
  );
}
