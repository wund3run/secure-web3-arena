
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';

export default function AuditDetailsPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Helmet>
        <title>Audit Details | Hawkly</title>
        <meta name="description" content="View audit details and progress" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex flex-col">
        <Navbar />
        <main className="flex-grow container py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Audit Details
            </h1>
            <p className="text-xl text-muted-foreground">
              Audit ID: {id}
            </p>
          </div>
          
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Audit Information</h3>
            <p className="text-muted-foreground">
              Detailed audit information and progress tracking will be displayed here.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
