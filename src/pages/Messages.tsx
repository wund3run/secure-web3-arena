
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { RealtimeChat } from '@/components/chat/RealtimeChat';

const Messages = () => {
  return (
    <StandardLayout
      title="Messages"
      description="Communicate with auditors and project owners"
    >
      <RealtimeChat />
    </StandardLayout>
  );
};

export default Messages;
