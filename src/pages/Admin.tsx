
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function Admin() {
  return (
    <StandardLayout title="Admin - Hawkly" description="Admin dashboard">
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Platform administration and management
        </p>
      </div>
    </StandardLayout>
  );
}
