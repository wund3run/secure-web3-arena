import React, { useState } from 'react';
import DisputeList from '@/components/disputes/DisputeList';
import RaiseDisputeModal from '@/components/disputes/RaiseDisputeModal';
import { useAuth } from '@/contexts/auth';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';

const DisputesPage: React.FC = () => {
  const { user } = useAuth();
  // TODO: Replace with real project selection logic
  const selectedProjectId = '1'; // Replace with real selected project ID
  const [showModal, setShowModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDisputeRaised = () => {
    setShowModal(false);
    setRefreshKey((k) => k + 1); // Triggers DisputeList refresh
  };

  return (
    <div className="min-h-screen bg-dark-900 text-white">
      <Helmet>
        <title>Disputes | Hawkly</title>
      </Helmet>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-accent-cyan">Disputes</h1>
          <Button onClick={() => setShowModal(true)} variant="default">Raise Dispute</Button>
        </div>
        <DisputeList key={refreshKey} projectId={selectedProjectId} onViewDispute={() => {}} />
        {showModal && (
          <RaiseDisputeModal
            projectId={selectedProjectId}
            raisedById={user?.id || 'user-123'}
            againstId={'auditor-456'} // TODO: Replace with real auditor ID
            onClose={handleDisputeRaised}
          />
        )}
      </div>
    </div>
  );
};

export default DisputesPage; 