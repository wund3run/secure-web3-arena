
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function Tutorials() {
  return (
    <StandardLayout
      title="Tutorials | Hawkly"
      description="Learn Web3 security best practices"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Security Tutorials</h1>
        <p className="text-muted-foreground">
          Learn Web3 security best practices and methodologies coming soon...
        </p>
      </div>
    </StandardLayout>
  );
}
