
import React from 'react';
import { EscrowProvider } from '@/contexts/EscrowContext';
import { EscrowManager } from '@/components/escrow/EscrowManager';
import { Helmet } from 'react-helmet-async';

const Escrow = () => {
  return (
    <>
      <Helmet>
        <title>Escrow System | Hawkly Security</title>
      </Helmet>
      <EscrowProvider>
        <EscrowManager />
      </EscrowProvider>
    </>
  );
};

export default Escrow;
