
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function PrivacyPolicy() {
  return (
    <StandardLayout title="Privacy Policy - Hawkly" description="Privacy Policy">
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Privacy Policy</h1>
        <p className="text-muted-foreground mt-2">
          Learn about how we protect your privacy
        </p>
      </div>
    </StandardLayout>
  );
}
