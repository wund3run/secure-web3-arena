
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function ContactUs() {
  return (
    <StandardLayout title="Contact Us - Hawkly" description="Contact Us">
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Contact Us</h1>
        <p className="text-muted-foreground mt-2">
          Get in touch with our team
        </p>
      </div>
    </StandardLayout>
  );
}
