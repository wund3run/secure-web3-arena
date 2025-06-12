
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function Index() {
  return (
    <StandardLayout
      title="Hawkly | Web3 Security Marketplace"
      description="Connect with verified Web3 security experts for comprehensive smart contract audits and security services."
    >
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to Hawkly</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Your Web3 Security Marketplace
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">Security Audits</h3>
              <p className="text-muted-foreground">
                Comprehensive smart contract security audits by verified experts
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">Expert Network</h3>
              <p className="text-muted-foreground">
                Connect with top-tier Web3 security professionals
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border">
              <h3 className="text-lg font-semibold mb-2">Secure Marketplace</h3>
              <p className="text-muted-foreground">
                Trusted platform for security services and audit management
              </p>
            </div>
          </div>
        </div>
      </div>
    </StandardLayout>
  );
}
