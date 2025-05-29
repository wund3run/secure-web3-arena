
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function EditService() {
  return (
    <StandardLayout title="Edit Service - Hawkly" description="Edit service details">
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Edit Service</h1>
        <p className="text-muted-foreground mt-2">
          Edit your service details
        </p>
      </div>
    </StandardLayout>
  );
}
