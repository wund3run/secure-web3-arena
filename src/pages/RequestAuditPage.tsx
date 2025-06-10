
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCheck } from 'lucide-react';

const RequestAuditPage = () => {
  return (
    <StandardLayout
      title="Request Audit | Hawkly"
      description="Request a security audit for your project"
    >
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileCheck className="h-5 w-5" />
              Request Security Audit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Audit request form coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default RequestAuditPage;
