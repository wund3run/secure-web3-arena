
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AuditRequest = () => {
  return (
    <>
      <Helmet>
        <title>Request Audit | Hawkly</title>
        <meta name="description" content="Request a security audit for your project" />
      </Helmet>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Request Audit</CardTitle>
            <CardDescription>Submit your project for security auditing</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Audit request form will be implemented here.</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AuditRequest;
