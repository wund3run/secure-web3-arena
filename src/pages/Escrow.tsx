
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { EscrowManager } from '@/components/escrow/EscrowManager';

const Escrow = () => {
  return (
    <StandardLayout
      title="Escrow Management"
      description="Secure escrow services for audit payments"
    >
      <EscrowManager />
    </StandardLayout>
  );
};

export default Escrow;
