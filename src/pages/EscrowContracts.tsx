
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function EscrowContracts() {
  return (
    <StandardLayout title="Escrow Contracts - Hawkly" description="Manage escrow contracts">
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Escrow Contracts</h1>
        <p className="text-muted-foreground mt-2">
          Manage your escrow contracts
        </p>
      </div>
    </StandardLayout>
  );
}
