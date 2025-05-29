
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';

export default function EscrowContractDetails() {
  return (
    <StandardLayout title="Escrow Contract Details - Hawkly" description="View escrow contract details">
      <div className="container py-8">
        <h1 className="text-3xl font-bold">Escrow Contract Details</h1>
        <p className="text-muted-foreground mt-2">
          View detailed information about this escrow contract
        </p>
      </div>
    </StandardLayout>
  );
}
