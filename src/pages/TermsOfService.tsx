
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function TermsOfService() {
  return (
    <StandardLayout title="Terms of Service - Hawkly" description="Terms of Service">
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p className="text-muted-foreground mt-2">
          Please read our terms of service carefully
        </p>
      </div>
    </StandardLayout>
  );
}
