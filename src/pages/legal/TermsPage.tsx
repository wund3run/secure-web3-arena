import React from 'react';
import { EnhancedPageTemplate } from '@/components/templates/EnhancedPageTemplate';

export default function TermsPage() {
  return (
    <EnhancedPageTemplate
      title="Terms of Service"
      description="Please read these terms carefully before using our platform"
    >
      <div className="prose max-w-none">
        <p>Our terms of service will be displayed here.</p>
      </div>
    </EnhancedPageTemplate>
  );
}
