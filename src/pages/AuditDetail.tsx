
import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const AuditDetail = () => {
  const { id } = useParams();

  return (
    <>
      <Helmet>
        <title>Audit Details | Hawkly</title>
        <meta name="description" content="View detailed audit information" />
      </Helmet>
      <div className="container mx-auto py-8">
        <Card>
          <CardHeader>
            <CardTitle>Audit Details</CardTitle>
            <CardDescription>Viewing audit #{id}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Audit details for audit ID: {id}</p>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AuditDetail;
