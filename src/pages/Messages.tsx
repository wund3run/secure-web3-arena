
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

const Messages = () => {
  return (
    <StandardLayout
      title="Messages"
      description="Communicate with auditors and project owners"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Messages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Real-time messaging system coming soon. Connect with auditors and project owners directly.
          </p>
        </CardContent>
      </Card>
    </StandardLayout>
  );
};

export default Messages;
