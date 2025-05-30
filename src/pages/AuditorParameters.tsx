
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AuditorParameters = () => {
  return (
    <>
      <Helmet>
        <title>Auditor Parameters | Hawkly</title>
        <meta name="description" content="Configure your auditor parameters and preferences" />
      </Helmet>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Auditor Parameters</CardTitle>
            <CardDescription>Configure your auditing preferences and parameters</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Auditor parameters configuration will be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AuditorParameters;
