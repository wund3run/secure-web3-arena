
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function SecurityAudits() {
  return (
    <StandardLayout
      title="Security Audits | Hawkly"
      description="Browse and request professional Web3 security audits"
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Security Audits</h1>
        <p className="text-muted-foreground">
          Professional Web3 security audit services coming soon...
        </p>
      </div>
    </StandardLayout>
  );
}
