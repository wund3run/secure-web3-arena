
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function AboutUs() {
  return (
    <StandardLayout title="About Us - Hawkly" description="About Us">
      <div className="container py-8">
        <h1 className="text-3xl font-bold">About Us</h1>
        <p className="text-muted-foreground mt-2">
          Learn more about Hawkly and our mission
        </p>
      </div>
    </StandardLayout>
  );
}
