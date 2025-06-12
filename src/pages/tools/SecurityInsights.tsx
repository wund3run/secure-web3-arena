
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function SecurityInsights() {
  return (
    <StandardLayout
      title="Security Insights | Hawkly"
      description="Advanced security analytics and insights"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Security Insights</h1>
        <p className="text-muted-foreground">
          Advanced security analytics and insights coming soon...
        </p>
      </div>
    </StandardLayout>
  );
}
