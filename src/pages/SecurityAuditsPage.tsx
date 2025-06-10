
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

const SecurityAuditsPage = () => {
  return (
    <StandardLayout
      title="Security Audits | Hawkly"
      description="Browse and manage security audits"
    >
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Audits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Security audits dashboard coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default SecurityAuditsPage;
