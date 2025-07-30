import React from 'react';
import { EnhancedPageTemplate } from '@/components/templates/EnhancedPageTemplate';

export default function SecurityPolicyPage() {
  return (
    <EnhancedPageTemplate
      title="Security Policy"
      description="Our commitment to maintaining the highest security standards"
    >
      <div className="prose max-w-none">
        <p>Our security policy details will be displayed here.</p>
      </div>
    </EnhancedPageTemplate>
  );
}
