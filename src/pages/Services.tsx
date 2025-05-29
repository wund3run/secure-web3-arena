
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function Services() {
  return (
    <StandardLayout title="Services - Hawkly" description="Browse security services">
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Security Services</h1>
        <p className="text-muted-foreground mt-2">
          Browse available security services
        </p>
      </div>
    </StandardLayout>
  );
}
