
import React, { useState } from 'react';
import { EscrowProvider } from '@/contexts/EscrowContext';
import { EscrowOverview } from './EscrowOverview';
import { CreateEscrowDialog } from './CreateEscrowDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export function EscrowManager() {
  const [activeTab, setActiveTab] = useState('contracts');
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <EscrowProvider>
      <div className="container mx-auto py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Escrow Management</h1>
            <p className="text-muted-foreground">
              Secure payments for audit services
            </p>
          </div>
          <Button onClick={() => setShowCreateDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Contract
          </Button>
        </div>

        <EscrowOverview
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onCreateNew={() => setShowCreateDialog(true)}
        />

        <CreateEscrowDialog
          open={showCreateDialog}
          onOpenChange={setShowCreateDialog}
        />
      </div>
    </EscrowProvider>
  );
}
