
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { DeliveryTracker } from '@/components/marketplace/service-delivery/DeliveryTracker';
import { useParams } from 'react-router-dom';

const DeliveryTracking = () => {
  const { auditId } = useParams();

  return (
    <StandardLayout
      title="Delivery Tracking"
      description="Track the progress of your security audit"
    >
      <DeliveryTracker auditRequestId={auditId} />
    </StandardLayout>
  );
};

export default DeliveryTracking;
