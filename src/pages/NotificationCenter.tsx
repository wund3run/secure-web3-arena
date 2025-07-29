
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { NotificationCenter as NotificationCenterComponent } from '@/components/notifications/NotificationCenter';

const NotificationCenter = () => {
  return (
    <StandardLayout
      title="Notification Center | Hawkly"
      description="Manage your notifications and preferences"
    >
      <NotificationCenterComponent />
    </StandardLayout>
  );
};

export default NotificationCenter;
