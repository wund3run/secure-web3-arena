
import React from 'react';
import { StandardLayout } from '@/components/layout/StandardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

const AuditsPage = () => {
  return (
    <StandardLayout
      title="Audits | Hawkly"
      description="View all audits and reports"
    >
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              All Audits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Audits overview coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </StandardLayout>
  );
};

export default AuditsPage;
