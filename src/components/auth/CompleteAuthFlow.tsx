import React from 'react';
import { EnhancedAuthFlow } from './enhanced-auth-flow';
import { AppContainer } from '@/components/layout/AppContainer';

export function CompleteAuthFlow() {
  return (
    <AppContainer maxWidth="max-w-md" padding="py-8 px-6" glass elevation>
      <EnhancedAuthFlow />
    </AppContainer>
  );
}
