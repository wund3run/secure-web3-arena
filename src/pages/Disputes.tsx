
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function Disputes() {
  return (
    <StandardLayout title="Disputes - Hawkly" description="Manage disputes">
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Disputes</h1>
        <p className="text-muted-foreground mt-2">
          Manage and resolve disputes
        </p>
      </div>
    </StandardLayout>
  );
}
