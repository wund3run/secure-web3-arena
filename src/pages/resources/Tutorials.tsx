
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function TutorialsPage() {
  return (
    <StandardLayout
      title="Tutorials | Hawkly"
      description="Step-by-step Web3 security tutorials"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Security Tutorials</h1>
        <p className="text-muted-foreground">
          Step-by-step Web3 security tutorials coming soon...
        </p>
      </div>
    </StandardLayout>
  );
}
