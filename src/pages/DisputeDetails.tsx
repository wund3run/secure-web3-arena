
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function DisputeDetails() {
  return (
    <StandardLayout title="Dispute Details - Hawkly" description="View dispute details">
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Dispute Details</h1>
        <p className="text-muted-foreground mt-2">
          View detailed information about this dispute
        </p>
      </div>
    </StandardLayout>
  );
}
